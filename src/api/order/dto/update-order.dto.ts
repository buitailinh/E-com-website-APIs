import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';


export class UpdateOrderDto {
    @IsString()
    @ApiProperty({ type: 'string' })
    fullname: string;

    @IsString()
    @ApiProperty({ type: 'string' })
    address: string;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty({ type: 'number' })
    phone: number;

    note?: string;
}
