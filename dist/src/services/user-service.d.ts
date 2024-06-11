interface IRegistrationService {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare function registrationService({ email, password, firstName, lastName, }: IRegistrationService): Promise<{
    user: import("../auth/auth.dtos").ITokenPayload;
    accessToken: string;
    refreshToken: string;
}>;
interface ILoginService {
    email: string;
    password: string;
}
export declare function loginService({ email, password }: ILoginService): Promise<{
    user: import("../user/user.dtos").IUser;
    accessToken: string;
    refreshToken: string;
}>;
export declare function logoutService(refreshToken: string): Promise<void>;
export declare function refreshTokenService(refreshToken: string): Promise<{
    user: import("../user/user.dtos").IUser;
    accessToken: string;
    refreshToken: string;
}>;
export {};
