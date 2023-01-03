import { ItemFlashsale } from './../../item_flashsale/entities/item_flashsale.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
    MinLength,
} from 'class-validator';

export class Item_FlashSale {

    @ApiProperty({
        required: true,
        type: 'int',
        description: 'id item',
        example: '1'
    })
    @IsNotEmpty({ message: 'Id item is not empty', })
    @Type(() => Number)
    @IsNumber()
    itemId: number;

    @ApiProperty({
        required: true,
        type: 'int',
        description: 'quantity of item',
        example: '1',
        minimum: 0,
    })
    @IsNotEmpty({ message: 'Id item is not empty', })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;

    @ApiProperty({
        type: 'int',
        required: true,
        description: 'sale of item',
        example: '1',
        minimum: 0,
        maximum: 100,
    })
    @IsNotEmpty({ message: 'sale number' })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Max(100)
    sale: number;
}

export class addItem_FlashSaleDto {

    @ApiProperty({
        required: true,
        type: [Item_FlashSale],
        // name: 'itemFlashsale',
        description: 'Array of item flash sale',
        // example: '[{"itemId": 1,"quantity": 1, "sale":1}]'
    })
    @IsArray()
    itemFlashSale?: Item_FlashSale[];
}
