import { PartialType } from '@nestjs/swagger';
import { CreateSendmailDto } from './create-sendmail.dto';

export class UpdateSendmailDto extends PartialType(CreateSendmailDto) {}
