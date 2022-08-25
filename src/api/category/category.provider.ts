import { Category } from './entities/category.entity';
import { Connection } from 'typeorm';
import { CATEGORY_CONST } from './category.constant';
export const categoryProvider = [
    {
        provide: CATEGORY_CONST.MODEL_PROVIDDER,
        useFactory: (connection: Connection) => connection.getRepository(Category),
        inject: ['DATABASE_CONNECTION'],
    }
]