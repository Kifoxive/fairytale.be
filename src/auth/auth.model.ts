import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const TokenModel = model("Token", TokenSchema);
export default TokenModel;
