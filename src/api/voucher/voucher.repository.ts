import { Voucher } from './entities/voucher.entity';
import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "src/share/database/typeorm.repository";
import { VOUCHER_CONST } from './voucher.constant';
import { Repository } from 'typeorm';

@Injectable()
export class VoucherRepository extends TypeOrmRepository<Voucher>{
    constructor(
        @Inject(VOUCHER_CONST.MODEL_PROVIDER)
        voucher: Repository<Voucher>,
    ) {
        super(voucher);
    }
}