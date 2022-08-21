import { voucherProvider } from './voucher.provider';
import { VoucherRepository } from './voucher.repository';
import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VoucherController],
  providers: [VoucherService, VoucherRepository, ...voucherProvider],
  exports: [VoucherService, VoucherRepository],
})
export class VoucherModule { }
