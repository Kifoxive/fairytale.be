"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.refresh = exports.loginUser = exports.registerUser = void 0;
const services_1 = require("../services");
const user_model_1 = __importDefault(require("../user/user.model"));
const exceptions_1 = require("../exceptions");
const user_dtos_1 = require("../user/user.dtos");
async function registerUser(req, res, next) {
    try {
        const { email, password, firstName, lastName } = req.body.data;
        const userData = await (0, services_1.registrationService)({
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
    }
    catch (err) {
        next(err);
    }
}
exports.registerUser = registerUser;
async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body.data;
        const { refreshToken, ...authUserData } = await (0, services_1.loginService)({
            email,
            password,
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.json(authUserData);
    }
    catch (err) {
        next(err);
    }
}
exports.loginUser = loginUser;
async function refresh(req, res, next) {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        const { refreshToken, ...authUserData } = await (0, services_1.refreshTokenService)(oldRefreshToken);
        res.cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.json(authUserData);
    }
    catch (e) {
        next(e);
    }
}
exports.refresh = refresh;
async function getMe(req, res, next) {
    try {
        const user = await user_model_1.default.findById(req.headers.authorization);
        if (!user) {
            next(exceptions_1.ApiError.NotFound("The user not found"));
        }
        const userDto = (0, user_dtos_1.UserDto)(user);
        res.json(userDto);
    }
    catch (err) {
        next(err);
    }
}
exports.getMe = getMe;
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
//   async logout(req, res, next) {
//     try {
//       const { refreshToken } = req.cookies;
//       await userService.logout(refreshToken);
//       res.clearCookie("refreshToken");
//       return res.sendStatus(200);
//     } catch (e) {
//       next(e);
//     }
//   }
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
//# sourceMappingURL=auth.controller.js.map