import { IMAGE_CONST } from './images.constant';
import { TypeOrmRepository } from './../../share/database/typeorm.repository';
import { Inject, Injectable } from "@nestjs/common";
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ImageRepository extends TypeOrmRepository<Image>{
    constructor(
        @Inject(IMAGE_CONST.MODEL_PROVIDER)
        image: Repository<Image>,
    ) {
        super(image);
    }
}