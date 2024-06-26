"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
function UserDto(model) {
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
exports.UserDto = UserDto;
//# sourceMappingURL=user.dtos.js.map