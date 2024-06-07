"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailAvailability = exports.getAllUsers = void 0;
const services_1 = require("../services");
const user_model_1 = __importDefault(require("./user.model"));
async function getAllUsers(req, res) {
    try {
        const users = await user_model_1.default.find()
            .select(["fullName", "avatarUrl", "_id"])
            .exec();
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get users" });
    }
}
exports.getAllUsers = getAllUsers;
async function getEmailAvailability(req, res) {
    try {
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader?.replace(/Bearer\s?/, "");
        const userData = (0, services_1.validateAccessToken)(accessToken);
        user_model_1.default.findOne({ email: req.query.email }).exec((error, doc) => {
            if (error || (userData && doc?._id.toString() === userData.user_id)) {
                return res.json({ isAvailable: true });
            }
            res.status(401).json({ isAvailable: false });
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to check email" });
    }
}
exports.getEmailAvailability = getEmailAvailability;
// async getOne(req, res) {
//   try {
//     const user = await UserModel.findById(req.params.id)
//       .select(["-passwordHash", "-__v"])
//       .exec();
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to get users" });
//   }
// }
// async getUsersPosts(req, res) {
//   const userId = req.params.id;
//   try {
//     await PostModel.find({ user: userId })
//       .sort({ createdAt: -1 })
//       .populate("user")
//       .populate("selectedProducts")
//       .exec((err, doc) => {
//         const posts = doc.map((elem) => {
//           return new PostDto(elem);
//         });
//         res.json({ posts });
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to get posts",
//     });
//   }
// }
// async getUsersProducts(req, res) {
//   const userId = req.params.id;
//   try {
//     const products = await ProductModel.find({ user: userId })
//       .populate("user")
//       .exec();
//     res.json({ products });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to get products",
//     });
//   }
// }
// async getUsersFriends(req, res) {
//   try {
//     const friends = await UserModel.findById(req.params.id)
//       .select("friends")
//       .exec();
//     res.json({ result: friends });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to get friends",
//     });
//   }
// }
// async findByName(req, res) {
//   const userName = req.query.name;
//   try {
//     const users = await UserModel.find({
//       fullName: { $regex: "^" + userName, $options: "i" },
//     })
//       .select(["fullName", "avatarUrl", "_id"])
//       .exec();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to find users" });
//   }
// }
//# sourceMappingURL=user.controller.js.map