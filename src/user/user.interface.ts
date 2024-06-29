import { Language, phoneRegex } from "src/utils/enum";
import { z } from "zod";

export enum AUTH_ROLE {
  admin = "admin",
  guest = "guest",
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
