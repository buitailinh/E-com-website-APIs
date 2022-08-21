import { Connection } from 'typeorm';
import { Voucher } from './entities/voucher.entity';
import { VOUCHER_CONST } from './voucher.constant';
export const voucherProvider = [
    {
        provide: VOUCHER_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(Voucher),
        inject: ['DATABASE_CONNECTION'],
    }
]