/// <reference types="node" />
import { UploadedFile } from "express-fileupload";
export declare function uploadFileService(file: Buffer, directory: string): Promise<string>;
export declare function cropImageService(file: UploadedFile): Promise<Buffer>;
