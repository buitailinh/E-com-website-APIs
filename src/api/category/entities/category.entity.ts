import { BaseEntity } from './../../../share/database/BaseEntity';
import { CATEGORY_CONST } from './../category.constant';
import { Column, Entity } from "typeorm";

@Entity({ name: CATEGORY_CONST.MODEL_NAME })
export class Category extends BaseEntity {
    @Column({
        length: 255, unique: true,
    })
    nameCategory: string;

    @Column({ nullable: true, })
    image?: string;

    @Column({ default: true })
    active?: boolean;
}
