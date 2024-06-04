import { NextFunction, Request, Response } from "express";
import {
  PostReservationRequest,
  PostReservationResponse,
} from "./reservation.interface";
import ReservationModel from "./reservation.model";

// import { postCreateValidation } from "../validators/validations.js";
// import { checkAuth, handleValidationErrors } from "../middlewares/index.js";

export async function postReservation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const newReservation = req.body.data as PostReservationRequest;
    const doc = new ReservationModel(newReservation);
    const reservation = await doc.save();
    // increment users products count
    // await ReservationModel.updateOne(
    //   {
    //     _id: userId,
    //   },
    //   {
    //     $inc: {
    //       postsCount: 1,
    //     },
    //   }
    // );

    return res.json(reservation);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to create reservation",
    });
  }
}

//   async getAll(req, res) {
//     try {
//       const page = req.query.page || 0;
//       const postsPerPage = 10;
//       await ReservationModel.find()
//         .sort({ createdAt: -1 })
//         .skip(page * postsPerPage)
//         .limit(postsPerPage)
//         .populate("user")
//         .populate("selectedProducts")
//         .exec((err, doc) => {
//           const posts = doc.map((elem) => {
//             return new PostDto(elem);
//           });
//           res.json({ posts });
//         });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Failed to get posts",
//       });
//     }
//   }

//   async getMine(req, res) {
//     try {
//       const userId = req.userId;
//       await ReservationModel.find({ user: userId })
//         .sort({ createdAt: -1 })
//         .populate("user")
//         .populate("selectedProducts")
//         .exec((err, doc) => {
//           const posts = doc.map((elem) => {
//             return new PostDto(elem);
//           });
//           res.json({ posts });
//         });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "failed to get posts" });
//     }
//   }

//   async getOne(req, res) {
//     try {
//       const postId = req.params.id;
//       ReservationModel.findOneAndUpdate(
//         {
//           _id: postId,
//         },
//         {
//           $inc: {
//             viewsCount: 1,
//           },
//         },
//         {
//           returnDocument: "after",
//         }
//       )
//         .populate("user")
//         .populate("selectedProducts")
//         .exec((err, doc) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).json({
//               message: "Failed to get the post",
//             });
//           }

//           if (!doc) {
//             return res.status(404).json({
//               message: "The post did not found",
//             });
//           }
//           const postDto = new PostDto(doc);
//           res.json(postDto);
//         });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Failed to get the post",
//       });
//     }
//   }

//   async update(req, res) {
//     try {
//       const postId = req.params.id;
//       await ReservationModel.updateOne(
//         {
//           _id: postId,
//         },
//         {
//           title: req.body.title,
//           text: req.body.text,
//           imageUrl: req.body.imageUrl,
//           tags: req.body.tags,
//           user: req.userId,
//           selectedProducts: req.body.selectedProducts,
//         }
//       );
//       res.json({ postId });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Failed to update the post",
//       });
//     }
//   }

//   async remove(req, res) {
//     try {
//       const postId = req.params.id;
//       const userId = req.userId;

//       ReservationModel.findOneAndDelete(
//         {
//           _id: postId,
//         },
//         (err, doc) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).json({
//               message: "Failed to delete the post ",
//             });
//           }
//           if (!doc) {
//             return res.status(404).json({
//               message: "The post did not found",
//             });
//           }
//           res.json({ success: true });
//         }
//       );

//       // decrement users products count
//       await UserModel.updateOne(
//         {
//           _id: userId,
//         },
//         {
//           $inc: {
//             postsCount: -1,
//           },
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Failed to remove the post",
//       });
//     }
//   }
