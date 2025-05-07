export interface LoginInputType {
    email: string;
    password: string;
}

export interface RegisterInputType { 
    email: string;
    password: string;
    username: string;
    confirmPassword: string; 
}

export interface AuthToken {
    accessToken: string;
    refreshToken?: string; 
}

