import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, isNumber, IsNumber, IsNumberString, IsString, Length, Max, Min, MinLength } from "class-validator";
import { Double } from "typeorm";
import { isFloat32Array, isNumberObject } from "util/types";

export class CreateItemDto {

    @ApiProperty({
        required: true,
        description: 'Name item is not empty',
        example: 'name item',
        type: 'string',
        minLength: 3,
    })
    @IsNotEmpty({ message: "Name item not empty" })
    @IsString()
    @MinLength(3, { message: 'Name item length must be greater than 3' })
    nameItem: string;

    @ApiProperty({
        required: true,
        description: 'barcode just the only one',
        example: 'name item',
        type: 'string',
        minLength: 8,
    })
    @IsNotEmpty({ message: "Barcode item not empty" })
    @IsString()
    @Length(8)
    barcode: string;


    @ApiProperty({
        required: true,
        description: 'Price imput',
        example: '10.000',
        type: 'int',
        minimum: 0,
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0, { message: ' price must be greater than 0' })
    priceIM?: number;


    @ApiProperty({
        required: true,
        description: 'Price export',
        example: '15.000',
        type: 'int',
        minimum: 0
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0, { message: ' price must be greater than 0' })
    priceEX?: number;

    @ApiProperty({
        required: false,
        description: 'file image main item ',
        // example: 'a.jpg',
        type: 'string',
        format: 'binary',
    })
    file?: string;

    @ApiProperty({
        required: false,
        description: 'description of product',
        example: 'name item',
        type: 'string',
    })
    @IsString()
    description?: string = null;


    @ApiProperty({
        required: false,
        description: 'sale of product',
        example: '10',
        type: 'int',
        minimum: 0,
        maximum: 100,
    })
    @Min(0, { message: ' price sale must be greater than 0%' })
    @Max(100, { message: ' price sale must be less than 100%' })
    @IsNumber()
    @Type(() => Number)
    sale?: number = 0;


    @ApiProperty({
        required: true,
        description: 'Number of product',
        example: '10',
        type: 'int',
        minimum: 0
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0, { message: 'Number product must be greater than 0' })
    quantity?: number;


    @ApiProperty({
        required: true,
        description: 'number of product',
        example: '12',
        type: 'int',
    })
    @IsNotEmpty({ message: "Category item not empty" })
    @Type(() => Number)
    categoryId?: number;

}
