import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateItemFlashsaleDto {
    @ApiProperty({
        type: 'int',
        required: true,
        description: 'number sale ',
        example: '50',
        minimum: 0,
        maximum: 100,
    })
    @IsNotEmpty({ message: 'sale number is not empty' })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Max(100)
    sale: number;

    @ApiProperty({
        required: true,
        description: 'quantity of items sale',
        example: '100',
        type: 'int',
        minimum: 0,
    })
    @IsNotEmpty({ message: 'quantity item sale number is not empty' })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;

    @ApiProperty({
        type: 'int',
        required: true,
        description: 'id item sale',
        example: '1',
    })
    @IsNotEmpty({ message: 'Id item sale is not empty' })
    @IsNumber()
    @Type(() => Number)
    itemId: number;
}
