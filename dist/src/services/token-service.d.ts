/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ITokenPayload } from "src/auth/auth.dtos";
import { IUser } from "../user/user.dtos";
export declare function generateTokens(payload: ITokenPayload): {
    accessToken: string;
    refreshToken: string;
};
export declare function validateAccessToken(token: string): IUser;
export declare function validateRefreshToken(token: string): IUser;
export declare function saveToken(userId: string, refreshToken: string): Promise<import("mongoose").Document<unknown, any, {
    user: import("mongoose").Types.ObjectId;
    refreshToken: string;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    refreshToken: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export declare function removeToken(refreshToken: string): Promise<import("mongodb").DeleteResult>;
export declare function findToken(refreshToken: string): Promise<import("mongoose").Document<unknown, any, {
    user: import("mongoose").Types.ObjectId;
    refreshToken: string;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    refreshToken: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
