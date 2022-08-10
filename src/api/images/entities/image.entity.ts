import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
import { IMAGE_CONST } from './../images.constant';
import { Column, Entity, ManyToOne } from "typeorm";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: IMAGE_CONST.MODEL_NAME })
export class Image extends BaseEntity {
    @Column()
    @IsNotEmpty({
        message: 'Image is not empty',
    })
    @IsString()
    image: string;

    @Column({ length: 255, default: null })
    @IsString()
    note?: string;

    @ManyToOne(() => Item, (item) => item.images)
    item: Item;
}
