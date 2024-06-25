import { UploadedFile } from "express-fileupload";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import sharp, { OutputInfo } from "sharp";

initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

const storage = getStorage();

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: "fairytale-66fcd.firebaseapp.com",
//     projectId: "fairytale-66fcd",
//     storageBucket: "fairytale-66fcd.appspot.com",
//     messagingSenderId: "1038987670534",
//     appId: "1:1038987670534:web:26ed6859cf3450c97d3f87",
//     measurementId: "G-5NSYM6T3ZV",
//   };

export async function uploadFileService(
  //   file: UploadedFile,
  file: Buffer,
  directory: string
): Promise<string> {
  const storageRef = ref(storage, directory);

  //   const metadata = {
  //     contentType: file.mimetype,
  //   };

  //   const snapshot = await uploadBytesResumable(storageRef, file.data, metadata);
  const snapshot = await uploadBytesResumable(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

export async function cropImageService(file: UploadedFile) {
  return await sharp(file.data)
    // .extract({ width: 530, height: 300, left: 0, top: 0 })
    .resize(500, 375, { fit: "cover", position: "centre" })
    .toBuffer();
}
