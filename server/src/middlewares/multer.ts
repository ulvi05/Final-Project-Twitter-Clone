import { Request } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "public/images");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
