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

export function UserDto(model: any): IUser {
  return {
    user_id: model._id,
    email: model.email,
    firstName: model.firstName,
    lastName: model.lastName,
    role: model.role,
    avatarUrl: model.avatarUrl,
    isActivated: model.isActivated,
    createdAt: new Date(model.createdAt).getTime(),
    updatedAt: new Date(model.updatedAt).getTime(),
  };
}
