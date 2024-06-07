import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
      // required: true,
      // default: AUTH_ROLE["guest"],
      default: "guest",
    },
    avatarUrl: String,
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
