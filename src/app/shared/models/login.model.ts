export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    password: string,
    id: number,
    authorities: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface Login {
    email: string;
    password: string;
}