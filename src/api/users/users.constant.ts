import { HttpException, HttpStatus } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

export const USER_CONST = {
    MODEL_NAME: 'user',
    MODEL_PROVIDER: 'USER_MODEL',
};

export const multerConfig = {
    dest: process.env.UPLOAD_LOCATION + '/Profile',
};

export const multerOptions = {

    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },

    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },

        filename: (req: any, file: any, cb: any) => {
            cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
    }),
};