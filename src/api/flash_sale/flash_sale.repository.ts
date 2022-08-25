import { FLASH_SALE_CONST } from './flash_sale.constant'
import { FlashSale } from './entities/flash_sale.entity';
import { TypeOrmRepository } from './../../share/database/typeorm.repository';
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';

@Injectable()
export class FlashSaleRepository extends TypeOrmRepository<FlashSale>{
    constructor(
        @Inject(FLASH_SALE_CONST.MODEL_PROVIDER)
        flash_sale: Repository<FlashSale>,
    ) {
        super(flash_sale);
    }
}