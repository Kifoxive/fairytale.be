"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropImageService = exports.uploadFileService = void 0;
const storage_1 = require("firebase/storage");
const app_1 = require("firebase/app");
const sharp_1 = __importDefault(require("sharp"));
(0, app_1.initializeApp)({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});
const storage = (0, storage_1.getStorage)();
// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: "fairytale-66fcd.firebaseapp.com",
//     projectId: "fairytale-66fcd",
//     storageBucket: "fairytale-66fcd.appspot.com",
//     messagingSenderId: "1038987670534",
//     appId: "1:1038987670534:web:26ed6859cf3450c97d3f87",
//     measurementId: "G-5NSYM6T3ZV",
//   };
async function uploadFileService(
//   file: UploadedFile,
file, directory) {
    const storageRef = (0, storage_1.ref)(storage, directory);
    //   const metadata = {
    //     contentType: file.mimetype,
    //   };
    //   const snapshot = await uploadBytesResumable(storageRef, file.data, metadata);
    const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, file);
    return await (0, storage_1.getDownloadURL)(snapshot.ref);
}
exports.uploadFileService = uploadFileService;
async function cropImageService(file) {
    return await (0, sharp_1.default)(file.data)
        // .extract({ width: 530, height: 300, left: 0, top: 0 })
        .resize(400, 300, { fit: "cover", position: "centre" })
        .toBuffer();
}
exports.cropImageService = cropImageService;
//# sourceMappingURL=file-service.js.map