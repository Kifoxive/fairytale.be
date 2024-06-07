"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenService = exports.loginService = exports.registrationService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const user_model_1 = __importDefault(require("../user/user.model"));
const user_dtos_1 = require("../user/user.dtos");
const auth_dtos_1 = require("../auth/auth.dtos");
const token_service_1 = require("./token-service");
const exceptions_1 = require("../exceptions");
const auth_model_1 = __importDefault(require("../auth/auth.model"));
async function registrationService({ email, password, firstName, lastName, }) {
    const candidate = await user_model_1.default.findOne({ email });
    if (candidate) {
        throw exceptions_1.ApiError.BadRequest(`The user with email ${email} already exist`);
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const passwordHash = await bcrypt_1.default.hash(password, salt);
    const activationLink = (0, uuid_1.v4)();
    const user = await user_model_1.default.create({
        email,
        passwordHash,
        firstName,
        lastName,
        activationLink,
        // avatarUrl,
    });
    const userAuthDto = (0, auth_dtos_1.AuthUserDto)(user); // email, fullName, id;
    // await mailService(
    //   email,
    //   `${process.env.API_URL}/auth/activate/${activationLink}`
    // );
    const tokens = (0, token_service_1.generateTokens)(userAuthDto);
    await (0, token_service_1.saveToken)(userAuthDto.user_id, tokens.refreshToken);
    return { ...tokens, user: userAuthDto };
}
exports.registrationService = registrationService;
async function loginService({ email, password }) {
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw exceptions_1.ApiError.BadRequest(`Bad login or password`);
    }
    const isPassEquals = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isPassEquals) {
        throw exceptions_1.ApiError.BadRequest(`Bad login or password`);
    }
    const userDto = (0, user_dtos_1.UserDto)(user); // id, email, isActivated
    const userAuthDto = (0, auth_dtos_1.AuthUserDto)(user);
    const tokens = (0, token_service_1.generateTokens)({ ...userAuthDto });
    await (0, token_service_1.saveToken)(userDto.user_id, tokens.refreshToken);
    return { ...tokens, user: userDto };
}
exports.loginService = loginService;
// async logout(refreshToken) {
//   await tokenService.removeToken(refreshToken);
// }
async function refreshTokenService(refreshToken) {
    if (!refreshToken) {
        throw exceptions_1.ApiError.UnauthorizedError();
    }
    const userData = (0, token_service_1.validateRefreshToken)(refreshToken);
    const tokenFromDb = await auth_model_1.default.findOne({ refreshToken });
    if (!userData || !tokenFromDb) {
        throw exceptions_1.ApiError.UnauthorizedError();
    }
    const user = await user_model_1.default.findById(userData?.user_id);
    const authUserDto = (0, auth_dtos_1.AuthUserDto)(user); // id, email, isActivated
    const userDto = (0, user_dtos_1.UserDto)(user);
    const tokens = (0, token_service_1.generateTokens)({ ...authUserDto });
    await (0, token_service_1.saveToken)(authUserDto.user_id, tokens.refreshToken);
    return { ...tokens, user: userDto };
}
exports.refreshTokenService = refreshTokenService;
// async getAllUsers() {
//   const users = await UserModel.find();
//   return users;
// }
// }
// export default new UserService();
// function mailService(to, link) {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       service: process.env.SMTP_SERVICE,
//       port: process.env.SMTP_PORT,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//       tls: { rejectUnauthorized: false },
//     });
//     const mail_configs = {
//       from: process.env.SMTP_USER,
//       to,
//       subject: `Activation on the ${process.env.API_URL}`,
//       text: "Activation",
//       html: `
//           <div>
//             <h1>Follow the link for activation</h1>
//             <a href="${link}">${link}</a>
//           </div>
//         `,
//     };
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(mail_configs, (error, info) => {
//         if (error) {
//           console.log(error);
//           return reject({ message: "An error has occured" });
//         }
//         return resolve({ message: "Email sent succesfully" });
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }
//# sourceMappingURL=user-service.js.map