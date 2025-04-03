export interface User {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role_id: number,
}

export interface ResponseRegister {
    status: boolean,
    message: string,
    data: {
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        role_id: number,
    },
    accessToken: string,
    refreshToken: string,
}