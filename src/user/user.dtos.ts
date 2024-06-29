import { IUser } from "./user.interface";

export function UserDto(model: any): IUser {
  return {
    user_id: model._id,
    email: model.email,
    firstName: model.firstName,
    lastName: model.lastName,
    role: model.role,
    avatarUrl: model.avatarUrl,
    isActivated: model.isActivated,
    language: model.language,
    createdAt: new Date(model.createdAt).getTime(),
    updatedAt: new Date(model.updatedAt).getTime(),
  };
}
