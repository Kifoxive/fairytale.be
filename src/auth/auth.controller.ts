import express, { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";
import {
  loginService,
  registrationService,
  refreshTokenService,
  logoutService,
} from "../services";

import UserModel from "../user/user.model";
import { ApiError } from "../exceptions";
import { UserDto } from "../user/user.dtos";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, firstName, lastName } = req.body.data;
    const userData = await registrationService({
      email,
      password,
      firstName,
      lastName,
    });

    const { refreshToken, ...data } = userData;
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body.data;
    const { refreshToken, ...authUserData } = await loginService({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(authUserData);
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const oldRefreshToken: string | undefined = req.cookies.refreshToken;

    const { refreshToken, ...authUserData } = await refreshTokenService(
      oldRefreshToken
    );
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(authUserData);
  } catch (e) {
    next(e);
  }
}

export async function getMe(
  req: Request<{ headers: { authorization: string; userId: string } }>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await UserModel.findById(req.headers.authorization);
    if (!user) {
      next(ApiError.NotFound("The user not found"));
    }

    const userDto = UserDto(user);
    res.json(userDto);
  } catch (err) {
    next(err);
  }
}

//   async updateProfile(req, res, next) {
//     const userId = req.userId;
//     try {
//       const { fullName, email, aboutMe, avatarUrl } = req.body;

//       const user = await UserModel.findByIdAndUpdate(
//         userId,
//         {
//           fullName,
//           email,
//           aboutMe,
//           avatarUrl,
//         },
//         {
//           returnOriginal: false,
//         }
//       );

//       await user.save();
//       const { passwordHash, ...userData } = user._doc;

//       res.json({ ...userData });
//     } catch (err) {
//       next(err);
//     }
//   }

//   async changePassword(req, res, next) {
//     const user = await UserModel.findById(req.userId);

//     const { password, newPassword1, newPassword2 } = req.body;
//     if (newPassword1 !== newPassword2) {
//       return next(ApiError.BadRequest("Passwords are not equal"));
//     }

//     const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
//     if (!isValidPass) {
//       return next(ApiError.UnauthorizedError("Bad old password"));
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(newPassword2, salt);

//     user.passwordHash = hash;
//     await user.save();

//     res.json({ message: "Success" });
//     try {
//     } catch (err) {
//       next(err);
//     }
//   }

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.cookies;
    await logoutService(refreshToken);
    res.clearCookie("refreshToken");

    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

//   async activate(req, res, next) {
//     try {
//       const activationLink = req.params.link;
//       await userService.activate(activationLink);
//       return res.redirect(302, process.env.CLIENT_URL);
//     } catch (e) {
//       next(e);
//     }
//   }
// }

// const routerController = new AuthController();
// const router = express.Router();

// router.post(
//   "/register",
//   registerValidation,
//   handleValidationErrors,
//   routerController.register
// );
// router.post(
//   "/login",
//   loginValidation,
//   handleValidationErrors,
//   routerController.login
// );
// router.get("/me", checkAuth, routerController.getMe);
// router.patch(
//   "/update",
//   checkAuth,
//   registerValidation,
//   handleValidationErrors,
//   routerController.updateProfile
// );
// router.patch(
//   "/change-password",
//   checkAuth,
//   registerValidation,
//   handleValidationErrors,
//   routerController.changePassword
// );
// router.get("/refresh", routerController.refresh);
// router.post("/logout", checkAuth, routerController.logout);
// router.get("/activate/:linkId", routerController.activate);

// export default router;
