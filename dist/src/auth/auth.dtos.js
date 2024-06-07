"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserDto = void 0;
// generate token payload from user credentials
function AuthUserDto(model) {
    return {
        user_id: model._id,
        email: model.email,
        firstName: model.firstName,
        lastName: model.lastName,
        role: model.role,
    };
}
exports.AuthUserDto = AuthUserDto;
//# sourceMappingURL=auth.dtos.js.map