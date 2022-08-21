import { PartialType } from '@nestjs/swagger';
import { CreateItemFlashsaleDto } from './create-item_flashsale.dto';

export class UpdateItemFlashsaleDto extends PartialType(CreateItemFlashsaleDto) {}
