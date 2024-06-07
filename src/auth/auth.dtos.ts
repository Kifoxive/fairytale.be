import { AUTH_ROLE } from "src/user/user.interface";

// here is a payload of token

export interface ITokenPayload {
  user_id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: AUTH_ROLE;
}

// generate token payload from user credentials
export function AuthUserDto(model: any): ITokenPayload {
  return {
    user_id: model._id,
    email: model.email,
    firstName: model.firstName,
    lastName: model.lastName,
    role: model.role,
  };
}
