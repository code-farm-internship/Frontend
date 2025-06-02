export const enum Provider {
    email = 'email',
}

export interface IRegisterPayload {
    email: string;
    password: string;
    username: string;
    provider: Provider;
}

export interface ILoginPayload {
    usernameOrEmail: string;
    password: string;
}

export interface ILoginResponse {
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    avatar: string;
}

export interface IRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}
