import { USER_CONST } from './users.constant';
import { TypeOrmRepository } from './../../share/database/typeorm.repository';
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends TypeOrmRepository<User>{
    constructor(
        @Inject(USER_CONST.MODEL_PROVIDER)
        user: Repository<User>,
    ) {
        super(user);
    }
}