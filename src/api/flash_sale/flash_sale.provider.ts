import { Inject } from '@nestjs/common';
import { Connection } from "typeorm";
import { FlashSale } from "./entities/flash_sale.entity";
import { FLASH_SALE_CONST } from "./flash_sale.constant";

export const flashSaleProvider = [
    {
        provide: FLASH_SALE_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(FlashSale),
        inject: ["DATABASE_CONNECTION"],
    }
]