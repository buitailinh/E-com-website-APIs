import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { AppObject } from 'src/share/common/app.object';
import { PatternLib } from 'src/share/utils/pattern.lib';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    @ApiProperty({ required: false, description: 'input a fullname ' })
    @IsNotEmpty({ message: "Fullname is not empty" })
    @Matches(PatternLib.name, { message: 'Invalid  fullname format' })
    @IsString()
    @MinLength(2, {
        message: ' fullname must be should 2',
    })
    fullname: string;

    @ApiProperty({ required: false, description: 'input a ' })
    @IsEnum(AppObject.USER_MODULE.ROLE)
    role: string = AppObject.USER_MODULE.ROLE.CLIENT;

    @ApiProperty({ required: false, description: 'input a phone number' })
    @IsNotEmpty({ message: "phone number is not empty" })
    @Matches(PatternLib.phone, { message: 'Invalid phone number format' })
    phone: string;

    @ApiProperty({ required: false, description: 'input a address' })
    @IsNotEmpty({ message: "address is not empty" })
    address: string;

    @ApiProperty({ required: false, description: 'input a address' })
    // @Transform(brithday => moment(brithday).format('DD/MM/YY'))
    @Type(() => Date)
    @IsDate()
    brithday: Date = new Date('12/12/2001');

    @ApiProperty({ required: false, description: 'input a file picture' })
    avatar: string = null;
}
