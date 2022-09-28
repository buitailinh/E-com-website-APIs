import { BRAND_CONST } from './brands.constant';
import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "src/share/database/typeorm.repository";
import { Brand } from "./entities/brand.entity";
import { Repository } from 'typeorm';

@Injectable()
export class brandRepository extends TypeOrmRepository<Brand>{
    constructor(
        @Inject(BRAND_CONST.MODEL_PROVIDER)
        brand: Repository<Brand>,
    ) {
        super(brand)
    }
}