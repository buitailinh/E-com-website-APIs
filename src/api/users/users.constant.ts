import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";
import { swaggerSchemaExample } from "src/share/utils/swagger_schema";

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

export const USER_SWAGGER_RESPONSE = {
    USER_OK: swaggerSchemaExample({
        data: {
            message: 'Success',
        },
        statusCode: 200,
    },
        'success',
    ),

    CREATE_REQUEST: swaggerSchemaExample({
        data: {
            message: 'create user success',
            // type: User
        },
        statusCode: 201,
    },
        'create user success',
    ),

    UPDATE_REQUEST: swaggerSchemaExample({
        data: {
            message: 'Update user success',
            type: UpdateUserDto
        },
        statusCode: 201,
        // type: User,
    },
        'Update user success',
    ),
    BAD_REQUEST_EXCEPTION: swaggerSchemaExample({

        message: 'bad exception',
        code: 'sys00001',
        statusCode: 400,
    },
        'bad request exception',
    ),
    USER_FAIL: swaggerSchemaExample({

        message: 'User not found, disabled or locked',
        code: 'sys00001',
        statusCode: 404,
    },
        'user not found',
    ),

    UNAUTHORIZED_EXCEPTION: swaggerSchemaExample({

        message: 'Unauthorized',
        code: 'sys00001',
        statusCode: 401,
    },
        'Unauthorized exception, you need to login again',
    ),
    INTERNAL_SERVER_EXCEPTION: swaggerSchemaExample(
        {
            message: 'internal server error',
            code: 'sys00001',
            statusCode: 500,
        },
        'internal server error',
    ),



}