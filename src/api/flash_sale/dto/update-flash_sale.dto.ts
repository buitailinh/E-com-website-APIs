import { PartialType } from '@nestjs/swagger';
import { CreateFlashSaleDto } from './create-flash_sale.dto';

export class UpdateFlashSaleDto extends PartialType(CreateFlashSaleDto) {}
