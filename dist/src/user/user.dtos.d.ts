export interface IUser {
    user_id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    avatarUrl: string | null;
    isActivated: boolean;
    createdAt: number;
    updatedAt: number;
}
export declare function UserDto(model: any): IUser;
