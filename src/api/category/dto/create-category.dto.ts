import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsBoolean,
    IsBooleanString,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateCategoryDto {

    @ApiProperty({
        required: true,
        description: 'Name category ',
        example: 'name category',
        type: 'string',
        minimum: 4,
    })
    @IsNotEmpty({ message: 'Name category is not empty', })
    @IsString()
    @MinLength(4, { message: 'name category is min lengh 4' })
    nameCategory: string;


    @ApiProperty({
        required: false,
        description: 'file image category ',
        // example: 'a.jpg',
        type: 'string',
        format: 'binary',
    })
    file?: string;


    @ApiProperty({
        required: false,
        description: 'active category: active/inactive ',
        example: 'true',
        type: 'boolean',
    })
    @IsBoolean()
    @Type(() => Boolean)
    active?: boolean = true;
}



