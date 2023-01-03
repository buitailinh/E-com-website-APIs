import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Module({
  // controllers: [PaymentController],
  imports: [ConfigModule],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
