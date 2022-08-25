import { CATEGORY_CONST } from './category.constant';
import { TypeOrmRepository } from './../../share/database/typeorm.repository';
import { Inject, Injectable } from "@nestjs/common";
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoryRepository extends TypeOrmRepository<Category>{
    constructor(
        @Inject(CATEGORY_CONST.MODEL_PROVIDDER)
        category: Repository<Category>,
    ) {
        super(category)
    }
}