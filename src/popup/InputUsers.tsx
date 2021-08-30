/** @format */

import * as React from 'react';
import { Button, Input, Typography } from 'antd';
import { MAX_USER_SLUG } from './constants';
import { fetchUserStatus } from './request';
import { FirstStepProps, SecondStepProps, InputUsersProps } from './interface';
import UnFollowUser from './UnFollowUser';
import './InputUsers.scss';

const { Text } = Typography;

function parseSlugs(text: string): Array<string> {
    const tmpSlugs = text.split('\n');
    const result: Array<string> = [];
    tmpSlugs.forEach((n) => {
        if (n.trim() && n.trim().length > 0 && !result.includes(n.trim())) {
            result.push(n);
        }
    });
    return result;
}

function FirstStep({ users, handleUsers, handleNext }: FirstStepProps) {
    const [inSearch, setInSearch] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>('');
    const [userSlugText, setUserSlugText] = React.useState<string>(
        users
            ? users
                  .filter((user) => !user.isFollowedByMe)
                  .map((user) => user.userSlug)
                  .join('\n')
            : '',
    );
    const handleNextChange = React.useCallback(async () => {
        setInSearch(true);
        const slugs = parseSlugs(userSlugText);
        // 已经存在的用户
        const existsSlug: Array<string> = [];
        const existsUsers = users.filter((user) => {
            const r = slugs.includes(user.userSlug);
            if (r) {
                existsSlug.push(user.userSlug);
            }
            return r;
        });
        const unknownSlug = slugs.filter((slug) => !existsSlug.includes(slug));
        const promises = unknownSlug.map((slug) => fetchUserStatus(slug));
        const promisesUsers = await Promise.all(promises);
        handleUsers([...existsUsers, ...promisesUsers]);
        handleNext();
        setInSearch(false);
    }, [userSlugText, users, handleNext, handleUsers]);
    const handleTextChange = React.useCallback((e) => {
        const text = e.target.value;
        const slugs = parseSlugs(text);
        let msg = '';
        if (slugs.length > MAX_USER_SLUG) {
            msg = `一次输入的用户名不能超过${MAX_USER_SLUG}个`;
        } else if (slugs.length === 0) {
            msg = '至少要输入一个用户名';
        }
        setErrorMsg(msg);
        setUserSlugText(text);
    }, []);
    return (
        <div className="firstStep">
            <div className="inputContainer">
                <Input.TextArea
                    className={`inputUsers ${errorMsg ? 'error' : ''}`}
                    value={userSlugText}
                    onChange={handleTextChange}
                    placeholder="请输入要关注的用户列表"
                    rows={5}
                    disabled={inSearch}
                />
            </div>
            <div className="errorMsg">{errorMsg}</div>
            <div className="action">
                <Button
                    onClick={handleNextChange}
                    loading={inSearch}
                    disabled={!!errorMsg || !userSlugText || inSearch}
                >
                    下一步
                </Button>
            </div>
        </div>
    );
}

function SecondStep({ users, isSubmit, handleFollowerUsers, handlePrev }: SecondStepProps) {
    const unFollowUsers = React.useMemo(
        () => users.filter((user) => !user.isFollowedByMe),
        [users],
    );
    return (
        <div className="secondStep">
            <div className="unFollowUsersContainer">
                {unFollowUsers.length > 0 ? (
                    unFollowUsers.map((user) => (
                        <UnFollowUser key={`${user.userSlug}`} user={user} />
                    ))
                ) : (
                    <Text type="success">所有用户均已关注</Text>
                )}
            </div>
            <div className="action">
                <Button onClick={handlePrev} disabled={isSubmit}>
                    上一步
                </Button>
                <Button onClick={handleFollowerUsers} loading={isSubmit}>
                    关注
                </Button>
            </div>
        </div>
    );
}

export default function InputUsers({
    step,
    handleStep,
    users,
    handleUsers,
    isSubmit,
    handleFollowerUsers,
}: InputUsersProps) {
    return (
        <div className="inputUsersContainer">
            {step === 1 && (
                <FirstStep
                    users={users}
                    handleNext={() => handleStep(step + 1)}
                    handleUsers={handleUsers}
                />
            )}
            {step === 2 && (
                <SecondStep
                    users={users}
                    handlePrev={() => handleStep(step - 1)}
                    isSubmit={isSubmit}
                    handleFollowerUsers={handleFollowerUsers}
                />
            )}
        </div>
    );
}
