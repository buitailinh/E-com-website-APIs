import { ITEM_FLASHSALE_CONST } from './item_flashsale.constant';
import { ItemFlashsale } from './entities/item_flashsale.entity';
import { Connection } from 'typeorm';

export const item_flashsaleProvider = [
    {
        provide: ITEM_FLASHSALE_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(ItemFlashsale),
        inject: ['DATABASE_CONNECTION'],
    }
]
