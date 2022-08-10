import { IsNotEmpty, IsNumber, IsString, Length, Max, Min, MinLength, validate } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { ITEM_CONST } from '../items.constant';
import { Image } from 'src/api/images/entities/image.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
@Entity({ name: ITEM_CONST.MODEL_NAME })
export class Item extends BaseEntity {
    @Column({ length: 255, unique: true, })
    @IsString()
    nameItem: string;

    @Column({ length: 255, unique: true, })
    @IsString()
    barcode: string;

    @Column()
    @IsNumber()
    priceIM: number;

    @Column()
    @IsNumber()
    priceEX: number;

    @Column({ nullable: true, })
    imageMain?: string;

    @Column({ length: 255, nullable: true })
    information?: string;

    @Column({ default: 0 })
    @IsNumber()
    sale?: number;

    @Column({ default: 0 })
    @IsNumber()
    sluong?: number;

    @Column({ default: 0 })
    @IsNumber()
    sluongBan?: number;

    @OneToMany(() => Image, (image) => image.item, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    images: Image[];

}
