import { HttpException, HttpStatus } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

export const CATEGORY_CONST = {
    MODEL_NAME: 'category',
    MODEL_PROVIDDER: 'CATEGORY_MODEL',
}

export const multerConfig = {
    dest: process.env.UPLOAD_LOCATION + '/Category',
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
            console.log(file);
            cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
    }),
};