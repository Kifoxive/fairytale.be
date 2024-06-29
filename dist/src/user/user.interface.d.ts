import { Language } from "src/utils/enum";
export declare enum AUTH_ROLE {
    admin = "admin",
    guest = "guest"
}
export interface IUser {
    user_id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    role: AUTH_ROLE;
    avatarUrl: string | null;
    isActivated: boolean;
    language: Language;
    createdAt: number;
    updatedAt: number;
}
