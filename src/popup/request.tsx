import { GraphqlOptions } from './interface';

const BASE_URL = 'https://leetcode-cn.com';
const GRAPHQL_URL = `${BASE_URL}/graphql/`;
const GRAPHQL_NOTY_URL = `${BASE_URL}/graphql/noty`;
const UNKNOWN_ERROR = '未知错误';

export function listenerFunction(action: string, callback: (res: string) => void): void {
    chrome?.tabs?.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs: Array<chrome.tabs.Tab>) => {
            if (tabs.length === 0) {
                return;
            }
            const { id: tabId } = tabs[0];
            if (!tabId) {
                return;
            }
            chrome.tabs.sendMessage(
                tabId,
                {
                    from: 'popup',
                    action,
                },
                (res) => {
                    if (window.chrome.runtime.lastError && !res) return;
                    if (callback) callback(res);
                },
            );
        },
    );
}

function getGraphqlHeaders(definitionName: string, operationName: string): Record<string, string> {
    return {
        'content-type': 'application/json',
        'x-definition-name': definitionName,
        'x-operation-name': operationName,
    };
}

function getGraphqlOptions(): GraphqlOptions {
    return {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    };
}

async function request(url: string, headers: Record<string, string>, body: Record<string, any>) {
    const options = getGraphqlOptions();
    const response = await fetch(url, {
        headers,
        ...options,
        body: JSON.stringify(body),
    });
    if (response.status !== 200) {
        throw new Error(`错误码: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function fetchUserStatus(userSlug: string) {
    const definitionName = 'userProfilePublicProfile';
    const operationName = 'userPublicProfile';
    const headers = getGraphqlHeaders(definitionName, operationName);
    const body = {
        operationName,
        variables: { userSlug },
        query: 'query userPublicProfile($userSlug: String!) {\n  userProfilePublicProfile(userSlug: $userSlug) {\n    profile {\n      userSlug\n      realName\n      userAvatar\n      __typename\n    }\n    __typename\n  }\n}\n',
    };

    const errorUser = {
        userSlug,
        userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/default_avatar.png',
        isFollowedByMe: false,
        notExist: true,
        error: UNKNOWN_ERROR,
    };

    try {
        const data = await request(GRAPHQL_URL, headers, body);
        if (!data || !data.data || !data.data.userProfilePublicProfile) {
            errorUser.error = '用户不存在';
            return errorUser;
        }
        const {
            data: {
                userProfilePublicProfile: { profile: userStatus },
            },
        } = data;
        userStatus.notExist = false;
        userStatus.error = '';
        return userStatus;
    } catch (error) {
        console.log('fetchUserStatus error:', error);
        errorUser.error = error instanceof Error ? error.message : UNKNOWN_ERROR;
        return errorUser;
    }
}

export async function fetchMe() {
    const definitionName = 'userStatus';
    const operationName = 'globalData';
    const headers = getGraphqlHeaders(definitionName, operationName);
    const body = {
        operationName,
        variables: {},
        query: 'query globalData {\n  userStatus {\n    isSignedIn\n    username\n    realName\n    userSlug\n    __typename\n  }\n}',
    };
    try {
        const data = await request(GRAPHQL_URL, headers, body);
        const {
            data: { userStatus },
        } = data;
        return ['', userStatus];
    } catch (error) {
        console.log('fetchMe error:', error);
        return [error instanceof Error ? error.message : UNKNOWN_ERROR, {}];
    }
}

export async function fetchFollowerUsers(userSlug: string, pageNumber = 0, resultPerPage = 15) {
    const definitionName = 'followers';
    const operationName = 'followerUsers';
    const headers = getGraphqlHeaders(definitionName, operationName);
    const body = {
        operationName,
        variables: {
            userSlug,
            pageNumber,
            resultPerPage,
        },
        query: 'query followerUsers($userSlug: String!, $pageNumber: Int, $resultPerPage: Int) {\n  followers(userSlug: $userSlug, pageNumber: $pageNumber, resultPerPage: $resultPerPage) {\n    allNum\n    users {\n      realName\n      userAvatar\n      userSlug\n      isFollowedByMe\n      __typename\n    }\n    __typename\n  }\n}\n',
    };
    try {
        const data = await request(GRAPHQL_NOTY_URL, headers, body);
        const {
            data: {
                followers: { allNum, users },
            },
        } = data;
        return [allNum, users, ''];
    } catch (error) {
        console.log('fetchFollowerUsers error:', error);
        return [0, [], error instanceof Error ? error.message : UNKNOWN_ERROR];
    }
}

export async function followUser(userSlug: string) {
    const definitionName = 'followUser';
    const operationName = 'followUser';
    const body = {
        operationName: 'followUser',
        variables: { userSlug },
        query: 'mutation followUser($userSlug: String!) {\n  followUser(userSlug: $userSlug) {\n    ok\n    error\n    __typename\n  }\n}\n',
    };
    const headers = {
        ...getGraphqlHeaders(definitionName, operationName),
        // 由 background js 实现替换
        'x-referrer': `https://leetcode-cn.com/u/${userSlug}/`,
    };
    try {
        const data = await request(GRAPHQL_URL, headers, body);
        const {
            data: {
                followUser: { ok, error },
            },
        } = data;
        return [ok, error];
    } catch (error) {
        console.log('followUser error:', error);
        return [false, error instanceof Error ? error.message : UNKNOWN_ERROR];
    }
}
