import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { AppObject } from 'src/share/common/app.object';
import { PatternLib } from 'src/share/utils/pattern.lib';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    @ApiProperty({ required: false, description: 'input a fullname ' })
    fullname?: string;

    @ApiProperty({ required: false, description: 'input a phone number' })
    @IsNotEmpty({ message: "phone number is not empty" })
    @Matches(PatternLib.phone, { message: 'Invalid phone number format' })
    phone: string;

    @ApiProperty({ required: false, description: 'input a address' })
    @IsNotEmpty({ message: "address is not empty" })
    address: string;

    @ApiProperty({ required: false, description: 'input a address', type: 'datetime' })
    // @Transform(brithday => moment(brithday).format('DD/MM/YY'))
    @Type(() => Date)
    @IsDate()
    brithday: Date = new Date();

    @ApiProperty({
        required: false,
        description: 'file image avatar user ',
        // example: 'a.jpg',
        type: 'string',
        format: 'binary',
    })
    file?: string;
}
