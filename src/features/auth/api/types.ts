export type SignInArgs = {
    login: string;
    password: string;
}

export type SignInResponse = {
    auth: boolean,
    token: string,
}