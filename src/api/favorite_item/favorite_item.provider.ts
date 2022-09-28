import { FavoriteItem } from './entities/favorite_item.entity';

import { Connection } from "typeorm";
import { FAVORITEITEM_CONST } from "./favorite_item.constant";

export const favoriteItemProvider = [
    {
        provide: FAVORITEITEM_CONST.MODEL_PROVIDER,
        useProvider: (connection: Connection) => connection.getRepository(FavoriteItem),
        inject: ['DATABASE_CONNECTION'],
    }
]