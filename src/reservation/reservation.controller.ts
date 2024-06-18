import { NextFunction, Request, Response } from "express";
import { IReservation, ReservationDto } from "./reservation.dtos";
import {
  PostReservationRequest,
  RESERVATION_STATUS,
} from "./reservation.interface";
import ReservationModel from "./reservation.model";

// import { postCreateValidation } from "../validators/validations.js";
// import { checkAuth, handleValidationErrors } from "../middlewares/index.js";

export async function getAllReservations(req: Request<any>, res: Response) {
  try {
    const limit = (req.query.limit as unknown as number) || 40;
    const offset = (req.query.offset as unknown as number) || 0;

    ReservationModel.find()
      .skip(limit * offset)
      .limit(limit)
      .exec((err, doc) => {
        const reservations = doc.map((elem) => ReservationDto(elem));
        res.json({ data: reservations, totalCount: reservations.length });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get reservations",
    });
  }
}

export async function postReservation(
  req: Request<any>,
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

    return res.json({ data: ReservationDto(reservation) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to create reservation",
    });
  }
}

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

export async function changeReservationStatus(
  req: Request<any>,
  res: Response
) {
  try {
    const { reservation_id, status } = req.body.data as {
      reservation_id: string;
      status: RESERVATION_STATUS;
    };
    const reservation = await ReservationModel.updateOne(
      {
        _id: reservation_id,
      },
      {
        status: RESERVATION_STATUS[status],
      }
    );
    res.json({ data: reservation });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to approve the reservation",
    });
  }
}

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
