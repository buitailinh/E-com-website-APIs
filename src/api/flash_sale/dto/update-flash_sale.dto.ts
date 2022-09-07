import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateFlashSaleDto } from './create-flash_sale.dto';

export class UpdateFlashSaleDto {

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
}
