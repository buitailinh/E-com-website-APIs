import { ITEM_CONST } from './items.constant';
import { Connection } from 'typeorm';
import { Item } from './entities/item.entity';

export const itemProvider = [
    {
        provide: ITEM_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(Item),
        inject: ['DATABASE_CONNECTION'],
    },
];
