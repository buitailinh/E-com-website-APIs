import { Connection } from 'typeorm';
import { IMAGE_CONST } from './images.constant';
import { Image } from './entities/image.entity'
export const imageProvider = [
    {
        provide: IMAGE_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(Image),
        inject: ['DATABASE_CONNECTION'],
    }
]