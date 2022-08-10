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
    })
    @IsNotEmpty({ message: "Name item not empty" })
    @IsString()
    @MinLength(3, { message: 'Name item length must be greater than 3' })
    nameItem: string;

    @ApiProperty({
        required: true,
        description: 'barcode just the only one',
        example: 'name item',
    })
    @IsNotEmpty({ message: "Barcode item not empty" })
    @IsString()
    @Length(8)
    barcode: string;


    @ApiProperty({
        required: true,
        description: 'Price imput',
        example: '10.000',
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0, { message: ' price must be greater than 0' })
    priceIM: number;


    @ApiProperty({
        required: true,
        description: 'Price export',
        example: '15.000',
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0, { message: ' price must be greater than 0' })
    priceEX: number;


    @ApiProperty({
        required: false,
        description: 'file image of product',
        example: 'name item',
    })
    imageMain?: string;

    @ApiProperty({
        required: false,
        description: 'information of product',
        example: 'name item',
    })
    information?: string;


    @ApiProperty({
        required: false,
        description: 'sale of product',
        example: '10',
    })
    @Min(0, { message: ' price sale must be greater than 0%' })
    @Max(100, { message: ' price sale must be less than 100%' })
    @Type(() => Number)
    sale?: number;


    @ApiProperty({
        required: true,
        description: 'Number of product',
        example: '10',
    })
    @Type(() => Number)
    @IsNumber()
    @Min(0, { message: 'Number product must be greater than 0' })
    sluong: number;


    @ApiProperty({
        required: false,
        description: 'number of product',
        example: '12',
    })
    @Type(() => Number)
    @Min(0, { message: 'Number product must be greater than 0' })
    sluongBan: number;

}
