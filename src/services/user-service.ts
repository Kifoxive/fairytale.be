import bcrypt from "bcrypt";
import { v4 } from "uuid";

import UserModel from "../user/user.model";
import { UserDto } from "../user/user.dtos";
import { AuthUserDto } from "../auth/auth.dtos";
import {
  generateTokens,
  removeToken,
  saveToken,
  validateRefreshToken,
} from "./token-service";
import { ApiError } from "../exceptions";
import TokenModel from "../auth/auth.model";
import { sendConfirmationEmailService } from "./email-service";

interface IRegistrationService {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function registrationService({
  email,
  password,
  firstName,
  lastName,
}: // avatarUrl,
IRegistrationService) {
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    throw ApiError.BadRequest(`The user with email ${email} already exist`);
  }
  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(password, salt);
  const activationLink = v4();
  const user = await UserModel.create({
    email,
    passwordHash,
    firstName,
    lastName,
    activationLink,
    // avatarUrl,
  });

  const userAuthDto = AuthUserDto(user); // email, fullName, id;

  // await sendConfirmationEmailService(
  //   email,
  //   `${process.env.FE_URL}/confirm/${activationLink}`
  // );

  const tokens = generateTokens(userAuthDto);
  await saveToken(userAuthDto.user_id, tokens.refreshToken);

  return { ...tokens, user: userAuthDto };
}

// async confirm(activationLink) {
//   const user = await UserModel.findOne({ activationLink });
//   if (!user) {
//     throw ApiError.BadRequest("Bad activation link");
//   }
//   user.isActivated = true;
//   await user.save();
// }

interface ILoginService {
  email: string;
  password: string;
}

export async function loginService({ email, password }: ILoginService) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest(`Bad login or password`);
  }
  const isPassEquals = await bcrypt.compare(password, user.passwordHash);
  if (!isPassEquals) {
    throw ApiError.BadRequest(`Bad login or password`);
  }

  const userDto = UserDto(user); // id, email, isActivated
  const userAuthDto = AuthUserDto(user);

  const tokens = generateTokens({ ...userAuthDto });

  await saveToken(userDto.user_id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}

export async function logoutService(refreshToken: string) {
  await removeToken(refreshToken);
}

export async function refreshTokenService(refreshToken: string) {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await TokenModel.findOne({ refreshToken });

  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const user = await UserModel.findById(userData?.user_id);
  const authUserDto = AuthUserDto(user); // id, email, isActivated
  const userDto = UserDto(user);

  const tokens = generateTokens({ ...authUserDto });
  await saveToken(authUserDto.user_id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}

export async function activateEmailService(activationLink: string) {
  const user = await UserModel.findOne({ activationLink });

  if (!user) {
    throw ApiError.BadRequest("Bad activation link");
  }
  user.isActivated = true;
  await user.save();
}
