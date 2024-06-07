import { AUTH_ROLE } from "src/user/user.interface";
export interface ITokenPayload {
    user_id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    role: AUTH_ROLE;
}
export declare function AuthUserDto(model: any): ITokenPayload;
