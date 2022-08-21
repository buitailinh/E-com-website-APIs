import { Voucher } from './../../voucher/entities/voucher.entity';
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class Item_OrderDetail {

    @ApiProperty({
        required: true,
        description: 'Id item ',
        example: '1',
        type: 'int',
    })
    @IsNotEmpty({ message: 'ID item is not empty', })
    @IsNumber()
    @Type(() => Number)
    itemId: number;

    @ApiProperty({
        required: true,
        description: 'Quantity item order ',
        example: '2',
        type: 'int',
    })
    @IsNotEmpty({ message: 'Quantity item order is not empty', })
    @IsNumber()
    @Type(() => Number)
    quantity: number;

}

export class CreateOrderDto {
    @ApiProperty({
        required: false,
        description: 'Note item order ',
        example: 'Note item order',
        type: 'string',
    })
    @IsString()
    note?: string = '';

    @ApiProperty({
        required: false,
        description: 'Code voucher item order ',
        example: 'abcdc',
        type: 'string',
    })
    @IsString()
    codeVoucher?: string = '';

    @ApiProperty({
        required: false,
        description: 'order detail item order ',
        example: '[order_detail]',
        type: 'array',
    })
    @IsArray()
    order_Details?: Item_OrderDetail[];
}
