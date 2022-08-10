import { Item } from './entities/item.entity';
import { ITEM_CONST } from './items.constant';
import { TypeOrmRepository } from '../../share/database/typeorm.repository';
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';


@Injectable()
export class ItemRepository extends TypeOrmRepository<Item>{
    constructor(
        @Inject(ITEM_CONST.MODEL_PROVIDER)
        itemEntity: Repository<Item>,
    ) {

        super(itemEntity)
    }
}