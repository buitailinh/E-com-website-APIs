import { UsersModule } from './../users/users.module';
import { AuthModule } from './../../share/auth/auth.module';
import { voucherProvider } from './voucher.provider';
import { VoucherRepository } from './voucher.repository';
import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [VoucherController],
  providers: [VoucherService, VoucherRepository, ...voucherProvider],
  exports: [VoucherService, VoucherRepository],
})
export class VoucherModule { }
