// export interface LeetCodeVds {
//     accountId: string;
// }

export interface UserStatus {
    username: string;
    realName: string;
    userSlug: string;
    isSignedIn: boolean;
}

export interface FollowerUser {
    userSlug: string; // 昵称
    userAvatar: string; // 头像
    isFollowedByMe: boolean; // 是否关注了对方
    realName?: string; // 登录账号
    // 自定义字段
    notExist?: false; // 用户不存在
    error?: string; // 错误信息
}

export interface GraphqlOptions {
    method: 'POST';
    mode: 'cors';
    credentials: 'include';
}

export interface UserProps {
    errorMsg?: string;
    userStatus: UserStatus | undefined;
}

interface FollowerUsersProps {
    users: Array<FollowerUser>;
    handleUsers: (users: Array<FollowerUser>) => void;
    isSubmit: boolean;
    handleFollowerUsers: () => void;
}

export interface FetchUsersProps extends UserProps, FollowerUsersProps {
    page: number;
    handlePage: (value: number) => void;
}

export interface UnFollowUserProps {
    user: FollowerUser;
}

export interface InputUsersProps extends FollowerUsersProps {
    step: number;
    handleStep: (value: number) => void;
}

export interface FirstStepProps {
    users: Array<FollowerUser>;
    handleUsers: (users: Array<FollowerUser>) => void;
    handleNext: () => void;
}

export interface SecondStepProps {
    users: Array<FollowerUser>;
    handleFollowerUsers: () => void;
    isSubmit: boolean;
    handlePrev: () => void;
}
