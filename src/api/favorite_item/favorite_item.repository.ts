import { FAVORITEITEM_CONST } from './favorite_item.constant';
import { TypeOrmRepository } from './../../share/database/typeorm.repository';
import { Inject, Injectable } from "@nestjs/common";
import { FavoriteItem } from './entities/favorite_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteItemRepository extends TypeOrmRepository<FavoriteItem>{
    constructor(
        @Inject(FAVORITEITEM_CONST.MODEL_PROVIDER)
        favoriteItem: Repository<FavoriteItem>
    ) {
        super(favoriteItem)
    }
}