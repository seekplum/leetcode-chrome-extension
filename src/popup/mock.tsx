import Mock from 'mockjs';

const mockFetch = require('mockjs-fetch'); // eslint-disable-line @typescript-eslint/no-var-requires

function getCharCodes(s: string): Array<number> {
    const charCodeArr = [];

    for (let i = 0; i < s.length; i += 1) {
        charCodeArr.push(s.charCodeAt(i));
    }

    return charCodeArr;
}

function loadConfig() {
    mockFetch(Mock);

    Mock.setup({ timeout: 400 });
    Mock.setup({ timeout: '200-400' });
}

function mockGraphql() {
    Mock.mock('https://leetcode.cn/graphql/', (params: any) => {
        const userSlugMatched = params.body.match(/"userSlug":"(\S+)"}/);
        if (params.headers['x-operation-name'] === 'globalData') {
            return {
                data: {
                    userStatus: {
                        isSignedIn: true,
                        username: 'seekplum',
                        realName: '1131909224@qq.com',
                        userSlug: 'seekplum',
                        __typename: 'MeNode',
                    },
                },
            };
        }
        if (params.headers['x-operation-name'] === 'followUser') {
            if (!userSlugMatched) return; // eslint-disable-line consistent-return
            const userSlug = userSlugMatched[1];

            return {
                data: {
                    followUser:
                        getCharCodes(userSlug)[0] % 2 === 0
                            ? {
                                  ok: true,
                                  error: undefined,
                              }
                            : {
                                  ok: false,
                                  error: `${userSlug} 测试关注失败`,
                              },
                },
            };
        }
        if (params.headers['x-operation-name'] === 'userPublicProfile') {
            if (!userSlugMatched) return; // eslint-disable-line consistent-return
            const userSlug = userSlugMatched[1];

            return {
                data: {
                    userProfilePublicProfile: {
                        profile: {
                            userSlug,
                            realName: `${userSlug}-realName`,

                            userAvatar:
                                'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                            __typename: 'UserProfileNode',
                        },
                        __typename: 'PublicProfileNode',
                    },
                },
            };
        }
        return {};
    });
}

function mockGraphqlNoty() {
    Mock.mock('https://leetcode.cn/graphql/noty', (params: any) => {
        if (params.headers['x-operation-name'] === 'followerUsers') {
            const pageMatched = params.body.match(/"pageNumber":(\d+)/);
            const pageSizeMatched = params.body.match(/"resultPerPage":(\d+)/);
            if (!pageMatched || !pageSizeMatched) return;
            const page = Number.parseInt(pageMatched[1], 10) || 0;
            const pageSize = Number.parseInt(pageSizeMatched[1], 10) || 0;
            const result = {
                data: {
                    followers: {
                        allNum: 65,
                        users: [
                            {
                                realName: '秋木',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/wesley-4/avatar_1629345940.png',
                                userSlug: 'wesley-4',
                                isFollowedByMe: false,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '殊华',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/shu-hua-i/avatar_1629255698.png',
                                userSlug: 'shu-hua-i',
                                isFollowedByMe: false,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Blackn',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: 'blackn',
                                isFollowedByMe: false,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'qiuhh',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: 'qiuhh',
                                isFollowedByMe: false,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Dale',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/dale-57/avatar_1628776478.png',
                                userSlug: 'dale-57',
                                isFollowedByMe: false,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'autismbug',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/autismbug/avatar_1628868220.png',
                                userSlug: 'autismbug',
                                isFollowedByMe: false,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '自闭小程',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/orange_/avatar_1578016978.png',
                                userSlug: 'orange_',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'johnsontao',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/johnsontao/avatar_1629286715.png',
                                userSlug: 'johnsontao',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '醜人',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/chou-ren/avatar_1629272409.png',
                                userSlug: 'chou-ren',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'ZYZ2020',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: 'zyz2020-x',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Azeroth',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/azeroth-o/avatar_1600503035.png',
                                userSlug: 'azeroth-o',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'momo',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/momo-k4sv/avatar_1629253716.png',
                                userSlug: 'momo-k4sv',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'zys-zero',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/zyszero/avatar_1552826446.png',
                                userSlug: 'zyszero',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '轩辕御龙',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/w573719227/avatar_1629391127.png',
                                userSlug: 'w573719227',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '칭찬하다',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/cingcanhada/avatar_1533435475.png',
                                userSlug: 'handsome_zan',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Solming',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: 'solming-3',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '南有栗',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/hu-zhong-wu-jiu/avatar_1560258506.png',
                                userSlug: 'nan-you-li',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'lingchenjie',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: 'lingchenjie',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'style',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/stormgui/avatar_1624864855.png',
                                userSlug: 'stormgui',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'dalelufei',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/dalelufei/avatar_1613186995.png',
                                userSlug: 'dalelufei',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'baituzai',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/baituzai/avatar_1608186386.png',
                                userSlug: 'baituzai',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'HuayraImola',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/huayraimola/avatar_1604464727.png',
                                userSlug: 'huayraimola',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '纸上痕迹',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/android_cloud/avatar_1629206775.png',
                                userSlug: 'android_cloud',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Alpha',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/alpha-21/avatar_1557573412.png',
                                userSlug: 'alpha-21',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'DamonLu',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/damonlu-mr8w8gzps3/avatar_1537435215.png',
                                userSlug: 'damonlu',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'airxiao',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/airxiao-v/avatar_1629201390.png',
                                userSlug: 'airxiao-v',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'silentims',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/silentims/avatar_1629344008.png',
                                userSlug: 'silentims',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '十年一粟',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/snys101/avatar_1629188174.png',
                                userSlug: 'snys101',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'lianlian',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: 'lianlian-4',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'rixin',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/rixin/avatar_1572852604.png',
                                userSlug: 'rixin',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '张姓少年',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/zhang-xing-shao-nian/avatar_1628776087.png',
                                userSlug: 'zhang-xing-shao-nian',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '瞧见了STEVE',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/qiao-jian-liao-steve/avatar_1605182824.png',
                                userSlug: 'qiao-jian-liao-steve',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'renyddd',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/renyddd/avatar_1558874261.png',
                                userSlug: 'renyddd',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '平安健康',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/ecstatic-edison6kj/avatar_1629205163.png',
                                userSlug: 'ping-an-jian-kang-w',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '刘航',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/liu-hang-2/avatar_1568961228.png',
                                userSlug: 'liu-hang-2',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Ming',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/ming-xf/avatar_1628845839.png',
                                userSlug: 'ming-code',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '月野盈盈',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/yue-ye-ying-ying/avatar_1629216619.png',
                                userSlug: 'yue-ye-ying-ying',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '呆物',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/ai-wu-4/avatar_1629210447.png',
                                userSlug: 'ai-wu-4',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '阿韩',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/interesting-7ederbergdy3/avatar_1629213822.png',
                                userSlug: 'ahan666',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Fenice',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/fenice-2/avatar_1572344652.png',
                                userSlug: 'fenice_sss',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '东升',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/dong-sheng-x/avatar_1629197735.png',
                                userSlug: 'dong-sheng-x',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Leo',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/tangshy/avatar_1553612214.png',
                                userSlug: 'tangshy',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '孙若坤',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/sun-ruo-kun/avatar_1629208376.png',
                                userSlug: 'sun-ruo-kun',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '最后的莫西干人',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/zui-hou-de-mo-xi-gan-ren/avatar_1629213019.png',
                                userSlug: 'zui-hou-de-mo-xi-gan-ren',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'lemmon-rgb',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/lemmon-rgb/avatar_1614002732.png',
                                userSlug: 'lemmon-rgb',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },

                            {
                                realName: '7aughing Wingjoc',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: '7aughing-wingjoc',

                                isMutualFollowing: false,
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'lyqiang',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/lyqiang/avatar_1559143441.png',
                                userSlug: 'lyqiang',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'amberwest',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/amberwest/avatar_1629206586.png',
                                userSlug: 'amberwest',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'hellowmq',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/hellowmq/avatar_1558180162.png',
                                userSlug: 'hellowmq',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'D默',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/default_avatar.png',
                                userSlug: 'dmo-1',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'Henry',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/tututu-9hc7c7uekv/avatar_1588473541.png',
                                userSlug: 'henry_tu',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '小云同学',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/naughty-feistelp26/avatar_1629211338.png',
                                userSlug: 'naughty-feistelp26',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'steins',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/steins/avatar_1532392687.png',
                                userSlug: 'steins',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '雪不深',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/coderdu/avatar_1586747394.png',
                                userSlug: 'coderdu',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '梧桐花生',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/wu-tong-hua-sheng/avatar_1571032371.png',
                                userSlug: 'wu-tong-hua-sheng',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'castle',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/castlee/avatar_1628777669.png',
                                userSlug: 'castlee',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '🌄',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/hvVFzWlCYS/avatar_1629619347.png',
                                userSlug: 'hvVFzWlCYS',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'doubfay',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/doubfay/avatar_1603250541.png',
                                userSlug: 'doubfay',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '叫我姜同学',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/jiangcheng2016/avatar_1628772360.png',
                                userSlug: 'jiangcheng2016',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '蔓越煤',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/mei-qiu-guo-guo/avatar_1593133108.png',
                                userSlug: 'mei-qiu-guo-guo',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '解忧程序媛',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/9qPagHx2sD/avatar_1620630369.png',
                                userSlug: '9qPagHx2sD',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '🍓胡阿狸🍓',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/hu-a-li/avatar_1629206559.png',
                                userSlug: 'hu-a-li',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '年糕不加枣',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/a_wuguai/avatar_1584864268.png',
                                userSlug: 'a_wuguai',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: 'JustinLiu',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/teachat8/avatar_1629199171.png',
                                userSlug: 'teachat8',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                            {
                                realName: '红萝卜想要去看彩虹',
                                userAvatar:
                                    'https://assets.leetcode.cn/aliyun-lc-upload/users/hong-luo-bu-xiang-yao-qu-kan-cai-hong/avatar_1628775355.png',
                                userSlug: 'therainbowisgone',
                                isFollowedByMe: true,
                                __typename: 'FollowUserNode',
                            },
                        ],
                        __typename: 'FollowUsersNode',
                    },
                },
            };

            result.data.followers.users = result.data.followers.users.slice(
                page * pageSize,
                (page + 1) * pageSize,
            );
            return result; // eslint-disable-line consistent-return
        }
        return {}; // eslint-disable-line consistent-return
    });
}

// eslint-disable-next-line import/prefer-default-export
export function loadMockFetch(): boolean {
    loadConfig();
    mockGraphqlNoty();
    mockGraphql();
    return true;
}
