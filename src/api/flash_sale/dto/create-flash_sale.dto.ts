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
        example: '1'
    })
    @IsNotEmpty({ message: 'Id item is not empty', })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;

    @ApiProperty({ type: 'int' })
    @IsNotEmpty({ message: 'sale number' })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Max(100)
    sale: number;
}

export class CreateFlashSaleDto {

    @ApiProperty({
        required: true,
        type: 'string',
        description: 'name sale ',
        example: 'name sale'
    })
    @IsNotEmpty({ message: 'Name flash is not empty', })
    @IsString()
    @MinLength(2)
    nameSale: string;

    @ApiProperty({
        required: true,
        type: 'string',
        description: 'Time start sale',
        example: '2022/02/02 15:00:00'
    })
    @IsNotEmpty({ message: 'Time start flash is not empty', })
    @IsDate()
    @Type(() => Date)
    timeStart?: Date;

    @ApiProperty({
        required: true,
        type: 'string',
        description: 'Time end sale',
        example: '2022/02/02 15:00:00'
    })
    @IsNotEmpty({ message: 'Time end flash is not empty', })
    @IsDate()
    @Type(() => Date)
    timeEnd?: Date;

    @ApiProperty({
        required: false,
        type: 'string',
        description: 'description of the flash sale',
        example: 'description of the flash sale'
    })
    @IsString()
    @ApiProperty({ type: 'string' })
    description?: string = '';

    @ApiProperty({
        required: true,
        type: 'array',
        description: 'Array of item flash sale',
        example: '[itemId: 1,quantity: 1, sale:1]'
    })
    @IsArray()
    @ApiProperty({ type: [Item_FlashSale] })
    itemFlashSale: Item_FlashSale[];
}
