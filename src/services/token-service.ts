import jwt from "jsonwebtoken";
import { ITokenPayload } from "src/auth/auth.dtos";
import TokenModel from "../auth/auth.model";
import { IUser } from "../user/user.interface";

export function generateTokens(payload: ITokenPayload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
    // expiresIn: "10s",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
}

export function validateAccessToken(token: string) {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as IUser;
    return userData;
  } catch (e) {
    return null;
  }
}

export function validateRefreshToken(token: string) {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as IUser;
    return userData;
  } catch (e) {
    return null;
  }
}

export async function saveToken(userId: string, refreshToken: string) {
  const tokenData = await TokenModel.findOne({ userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = TokenModel.create({ user: userId, refreshToken });
  return token;
}

export async function removeToken(refreshToken: string) {
  const tokenData = await TokenModel.deleteOne({ refreshToken });
  return tokenData;
}

export async function findToken(refreshToken: string) {
  const tokenData = await TokenModel.findOne({ refreshToken });
  return tokenData;
}
