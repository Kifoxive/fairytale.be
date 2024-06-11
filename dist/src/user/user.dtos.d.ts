import { AUTH_ROLE } from "./user.interface";
export interface IUser {
    user_id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    role: AUTH_ROLE;
    avatarUrl: string | null;
    isActivated: boolean;
    createdAt: number;
    updatedAt: number;
}
export declare function UserDto(model: any): IUser;
