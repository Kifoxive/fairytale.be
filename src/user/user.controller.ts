import express, { Request, Response } from "express";
import { validateAccessToken } from "../services";
import UserModel from "./user.model";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await UserModel.find()
      .select(["fullName", "avatarUrl", "_id"])
      .exec();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
}

export async function getEmailAvailability(
  req: Request<{ headers: { authorization?: string } }>,
  res: Response
) {
  try {
    const authorizationHeader = req.headers.authorization as string | undefined;
    const accessToken = authorizationHeader?.replace(/Bearer\s?/, "");
    const userData = validateAccessToken(accessToken);

    UserModel.findOne({ email: req.query.email }).exec((error, doc) => {
      if (error || (userData && doc?._id.toString() === userData.user_id)) {
        return res.json({ isAvailable: true });
      }

      res.status(401).json({ isAvailable: false });
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to check email" });
  }
}

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
