import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import moment from "moment";
import { AppObject } from "src/share/common/app.object";
import { PatternLib } from "src/share/utils/pattern.lib";

export class CreateUserDto {
    @ApiProperty({ required: true, description: 'input a email address' })
    @IsNotEmpty({ message: "Email iss not empty" })
    @IsEmail({ message: 'Invalid email format' })
    @Matches(PatternLib.email, {
        message: 'Invalid email format'
    })
    email: string;

    @ApiProperty({ required: true, description: 'input a fullname ' })
    @IsNotEmpty({ message: "Fullname is not empty" })
    @Matches(PatternLib.name, { message: 'Invalid  fullname format' })
    @IsString()
    @MinLength(2, {
        message: ' fullname must be should 2',
    })
    fullname: string;

    @ApiProperty({ required: true, description: 'input a password' })
    @IsNotEmpty({ message: "Password is not empty" })
    @Matches(PatternLib.password, { message: 'Invalid password format' })
    @MinLength(8, { message: 'Min lenght must be 8' })
    @IsString()
    password: string;

    // @ApiProperty({ required: false, description: 'input a ' })
    @IsEnum(AppObject.USER_MODULE.ROLE)
    role: string = AppObject.USER_MODULE.ROLE.CLIENT;

    @ApiProperty({ required: true, description: 'input a phone number' })
    @IsNotEmpty({ message: "phone number is not empty" })
    @Matches(PatternLib.phone, { message: 'Invalid phone number format' })
    phone: string;

    @ApiProperty({ required: false, description: 'input a address' })
    @IsNotEmpty({ message: "address is not empty" })
    address: string;

    @ApiProperty({ required: false, description: 'input a address' })
    // @Type(() => Date)
    // @Transform(brithday => moment(brithday).format('DD/MM/YY'))
    @Type(() => Date)
    @IsDate()
    brithday: Date = new Date('12/12/2001');

    @ApiProperty({ required: false, description: 'input a file picture' })
    avatar?: string = null;
}
