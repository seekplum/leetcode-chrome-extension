/** @format */

import * as React from 'react';
import { Spin, Tabs, Typography } from 'antd';

import { loadMockFetch } from './mock';
import { USER_FROM } from './constants';
import { FollowerUser, UserProps, UserStatus } from './interface';
import { fetchMe, followUser } from './request';
import FetchUsers from './FetchUsers';
import InputUsers from './InputUsers';

const { Link, Text } = Typography;

function Users({ errorMsg, userStatus }: UserProps) {
    const [step, setStep] = React.useState<number>(1);
    const [page, setPage] = React.useState<number>(1);
    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

    const [userFrom, setUserFrom] = React.useState<string>(USER_FROM.fetch);
    const [fetchUsers, setFetchUsers] = React.useState<Array<FollowerUser>>([]);
    const [inputUsers, setInputUsers] = React.useState<Array<FollowerUser>>([]);
    // const [vds, setVds] = React.useState<LeetCodeVds>(); // window.vds 变量
    // React.useEffect(() => {
    //     // 通过 dom 中从 window 中获取信息
    //     listenerFunction('vds', (res: string) => {
    //         setVds(JSON.parse(res));
    //     });
    // }, []);

    const handleFollowerOneUser = React.useCallback(
        async (isFetch: boolean, idx: number) => {
            const userList = isFetch ? [...fetchUsers] : [...inputUsers];
            const user = userList[idx];
            if (user.isFollowedByMe || user.notExist) return;
            const [ok, error] = await followUser(user.userSlug); // eslint-disable-line no-await-in-loop
            if (ok) {
                user.isFollowedByMe = true;
            } else {
                user.error = error;
            }
            if (isFetch) {
                setFetchUsers(userList);
            } else {
                setInputUsers(userList);
            }
        },
        [fetchUsers, inputUsers],
    );

    const handleFollowerUsers = React.useCallback(async () => {
        setIsSubmit(true);
        const isFetch = userFrom === USER_FROM.fetch;
        const users = isFetch ? fetchUsers : inputUsers;
        // eslint-disable-next-line no-restricted-syntax
        for (let i = 0; i < users.length; i += 1) {
            await handleFollowerOneUser(isFetch, i); // eslint-disable-line no-await-in-loop
        }
        setIsSubmit(false);
    }, [userFrom, fetchUsers, inputUsers, handleFollowerOneUser]);

    if (!userStatus || Object.keys(userStatus).length === 0 || errorMsg)
        return <Text type="danger">获取当前登录用户失败，请刷新重试 {errorMsg}</Text>;

    if (!userStatus.isSignedIn) {
        return (
            <Text>
                当前用户未登录，请
                <Link href="https://leetcode.cn/" target="_blank" rel="noopener noreferrer">
                    登录LeetCode账号
                </Link>
            </Text>
        );
    }

    return (
        <>
            <Text>
                当前LeetCode账号:{' '}
                <Link
                    href={`https://leetcode.cn/u/${userStatus.userSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {userStatus.userSlug}
                </Link>
            </Text>
            <Tabs onChange={setUserFrom} type="card" size="small">
                <Tabs.TabPane tab="未关注列表" key={USER_FROM.fetch}>
                    <FetchUsers
                        userStatus={userStatus}
                        page={page}
                        handlePage={setPage}
                        users={fetchUsers}
                        handleUsers={setFetchUsers}
                        isSubmit={isSubmit}
                        handleFollowerUsers={handleFollowerUsers}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="手动输入" key={USER_FROM.input}>
                    <InputUsers
                        step={step}
                        handleStep={setStep}
                        users={inputUsers}
                        handleUsers={setInputUsers}
                        isSubmit={isSubmit}
                        handleFollowerUsers={handleFollowerUsers}
                    />
                </Tabs.TabPane>
            </Tabs>
        </>
    );
}

function LeetCode() {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [errorMsg, setErrorMsg] = React.useState<string>('');
    const [userStatus, setUserStatus] = React.useState<UserStatus>();

    React.useEffect(() => {
        if (!loading) return;
        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function fetchData() {
            const [error, user] = await fetchMe();
            setErrorMsg(error);
            setUserStatus(user);
            setLoading(false);
        }
        fetchData();
    }, [loading]);

    return loading ? (
        <Spin tip="Loading...">加载数据中...</Spin>
    ) : (
        <Users errorMsg={errorMsg} userStatus={userStatus} />
    );
}

export default function batchConcerned(): React.ReactElement {
    if (
        process.env.NODE_ENV === 'development' &&
        ['127.0.0.1', 'localhost'].includes(window.location.hostname)
    ) {
        loadMockFetch();
    }
    return <LeetCode />;
}
