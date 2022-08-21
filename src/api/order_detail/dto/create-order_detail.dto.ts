import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderDetailDto {

    @ApiProperty({
        required: true,
        description: 'Quatity of item the order',
        example: '5',
        type: 'int',
    })
    @IsNotEmpty({ message: 'Please imput is a quantity' })
    @IsNumber()
    @Type(() => Number)
    @Min(0, { message: 'quantity must be greater than 0' })
    quantity?: number;

    @ApiProperty({
        required: true,
        description: 'Id item item the order',
        example: '5',
        type: 'int',
    })
    @IsNotEmpty({ message: 'Please imput a id item' })
    @IsNumber()
    @Type(() => Number)
    itemId?: number;
}
