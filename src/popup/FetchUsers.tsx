/** @format */

import * as React from 'react';
import { Button, Pagination, Spin, Typography } from 'antd';
import { PAGE_SIZE } from './constants';
import { FetchUsersProps } from './interface';
import { fetchFollowerUsers } from './request';
import UnFollowUser from './UnFollowUser';
import './FetchUsers.scss';

const { Text } = Typography;

export default function FetchUsers({
    page,
    handlePage,
    userStatus,
    users,
    handleUsers,
    isSubmit,
    handleFollowerUsers,
}: FetchUsersProps) {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [totalNum, setTotalNum] = React.useState<number>(0);
    const [errorMsg, setErrorMsg] = React.useState<string>('');

    // 筛选出关注了我，但我未关注的用户
    const unFollowUsers = React.useMemo(
        () => (users ? users.filter((user) => !user.isFollowedByMe) : []),
        [users],
    );

    React.useEffect(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function fetchData() {
            if (!userStatus) return;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [total, followUsers, error] = await fetchFollowerUsers(
                userStatus.userSlug,
                page - 1,
                PAGE_SIZE,
            );

            setTotalNum(total);
            handleUsers(followUsers);
            setErrorMsg(error);
            setLoading(false);
        }
        setLoading(true);
        fetchData();
    }, [userStatus, page, handleUsers]);

    return loading ? (
        <Spin />
    ) : (
        <div className="fetchUsersContainer">
            {unFollowUsers.length > 0 ? (
                <>
                    <div className="unFollowUsersContainer">
                        {unFollowUsers.map((user) => (
                            <UnFollowUser key={`${user.userSlug}`} user={user} />
                        ))}
                    </div>
                    <div className="action">
                        <Button onClick={handleFollowerUsers} loading={isSubmit}>
                            关注
                        </Button>
                    </div>
                </>
            ) : errorMsg ? (
                <Text type="danger">{errorMsg}</Text>
            ) : totalNum <= PAGE_SIZE ? (
                <Text type="success">所有用户均已关注</Text>
            ) : (
                <Text type="success">当前页用户均已关注</Text>
            )}
            <Pagination
                className="pagination"
                current={page}
                total={totalNum}
                pageSize={PAGE_SIZE}
                onChange={handlePage}
                size="small"
                showSizeChanger={false}
                simple
                hideOnSinglePage
                showQuickJumper
            />
        </div>
    );
}
