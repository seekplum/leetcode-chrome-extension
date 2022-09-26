/** @format */

import { Typography } from 'antd';

import { UnFollowUserProps } from './interface';
import './UnFollowUser.scss';

const { Link } = Typography;

export default function UnFollowUser({ user }: UnFollowUserProps) {
    const { userSlug, userAvatar, realName, error, isFollowedByMe } = user;

    const className = error ? 'error' : isFollowedByMe ? 'success' : '';

    return (
        <Link
            className="unFollowUser"
            href={`https://leetcode.cn/u/${userSlug}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img className="userAvatar" src={userAvatar} alt="用户头像" />
            <div className="userInfo">
                <span className={`realName ${className}`}>{realName}</span>
                <span className={`userSlug ${className}`}>{userSlug}</span>
                <span className="error">{error}</span>
            </div>
        </Link>
    );
}
