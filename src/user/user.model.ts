import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "guest"],
      default: "guest",
    },
    avatarUrl: String,
    isActivated: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      enum: ["en", "ua", "cz"],
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);
export default UserModel;
