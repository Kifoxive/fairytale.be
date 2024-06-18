"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeReservationStatus = exports.postReservation = exports.getAllReservations = void 0;
const reservation_dtos_1 = require("./reservation.dtos");
const reservation_interface_1 = require("./reservation.interface");
const reservation_model_1 = __importDefault(require("./reservation.model"));
// import { postCreateValidation } from "../validators/validations.js";
// import { checkAuth, handleValidationErrors } from "../middlewares/index.js";
async function getAllReservations(req, res) {
    try {
        const limit = req.query.limit || 40;
        const offset = req.query.offset || 0;
        reservation_model_1.default.find()
            .skip(limit * offset)
            .limit(limit)
            .exec((err, doc) => {
            const reservations = doc.map((elem) => (0, reservation_dtos_1.ReservationDto)(elem));
            res.json({ data: reservations, totalCount: reservations.length });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get reservations",
        });
    }
}
exports.getAllReservations = getAllReservations;
async function postReservation(req, res, next) {
    try {
        const newReservation = req.body.data;
        const doc = new reservation_model_1.default(newReservation);
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
        return res.json({ data: (0, reservation_dtos_1.ReservationDto)(reservation) });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to create reservation",
        });
    }
}
exports.postReservation = postReservation;
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
async function changeReservationStatus(req, res) {
    try {
        const { reservation_id, status } = req.body.data;
        const reservation = await reservation_model_1.default.updateOne({
            _id: reservation_id,
        }, {
            status: reservation_interface_1.RESERVATION_STATUS[status],
        });
        res.json({ data: reservation });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to approve the reservation",
        });
    }
}
exports.changeReservationStatus = changeReservationStatus;
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
//# sourceMappingURL=reservation.controller.js.map