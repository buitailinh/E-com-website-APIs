import { BaseEntity } from './../../../share/database/BaseEntity';
import { USER_CONST } from './../users.constant';
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { Exclude, Transform, Type } from 'class-transformer';
import { AppObject } from 'src/share/common/app.object';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import moment from 'moment';
import { IsDate } from 'class-validator';
@Entity({ name: USER_CONST.MODEL_NAME })
export class User extends BaseEntity {
    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255, default: null })
    fullname: string;

    @Exclude()
    @Column({ length: 255, select: true })
    password: string;

    // @BeforeInsert()
    // @BeforeUpdate()
    // async hashpassword() {
    //     if (this.password) {
    //         const salt = await bcrypt.genSalt();
    //         try {
    //             this.password = await bcrypt.hash(this.password, salt);
    //         } catch (error) {
    //             throw new InternalServerErrorException(error);
    //         }
    //     }
    // }

    @Column({ type: 'enum', enum: AppObject.USER_MODULE.ROLE, default: AppObject.USER_MODULE.ROLE.CLIENT })
    role: string;

    @Column({ default: null })
    phone?: string;

    @Column({ length: 255 })
    address?: string;

    @Column({ default: null })
    brithday: Date;

    @Column({ default: null })
    avatar: string;

}
