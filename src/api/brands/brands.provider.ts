import { Brand } from './entities/brand.entity';
import { Connection } from 'typeorm';
import { BRAND_CONST } from './brands.constant';
export const brandProvider = [
    {
        provode: BRAND_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(Brand),
        inject: ['DATABASE_CONNECTION'],
    }
]