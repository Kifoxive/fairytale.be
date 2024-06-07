import mongoose from "mongoose";
declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    firstName: string;
    passwordHash: string;
    role: "admin" | "guest";
    isActivated: boolean;
    lastName?: string;
    avatarUrl?: string;
    phone?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    firstName: string;
    passwordHash: string;
    role: "admin" | "guest";
    isActivated: boolean;
    lastName?: string;
    avatarUrl?: string;
    phone?: string;
}>>;
export default UserModel;
