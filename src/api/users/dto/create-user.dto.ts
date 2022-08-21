import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches, MinLength } from "class-validator";
import moment from "moment";
import { AppObject } from "src/share/common/app.object";
import { PatternLib } from "src/share/utils/pattern.lib";

export class CreateUserDto {
    @ApiProperty({ type: 'string', required: true, description: ' email address', example: 'example@example.com' })
    @IsNotEmpty({ message: "Email iss not empty" })
    @IsEmail({ message: 'Invalid email format' })
    @Matches(PatternLib.email, {
        message: 'Invalid email format'
    })
    email: string;

    @ApiProperty({ type: 'string', required: true, description: 'your fullname ', example: 'example' })
    @IsNotEmpty({ message: "Fullname is not empty" })
    @Matches(PatternLib.name, { message: 'Invalid  fullname format' })
    @IsString()
    @MinLength(2, {
        message: ' fullname must be should 2',
    })
    fullname?: string;

    @ApiProperty({ required: true, description: 'account password', type: 'string', example: 'password' })
    @IsNotEmpty({ message: "Password is not empty" })
    @Matches(PatternLib.password, { message: 'Invalid password format' })
    @Length(8, 30, { message: 'Min lenght must be 8' })
    @IsString()
    password: string;

    @ApiProperty({ enum: AppObject.USER_MODULE.ROLE, default: AppObject.USER_MODULE.ROLE.CLIENT, description: 'role ' })
    @IsEnum(AppObject.USER_MODULE.ROLE)
    @IsString()
    role: string = AppObject.USER_MODULE.ROLE.CLIENT;

    @ApiProperty({ required: true, description: ' phone number', type: 'string', example: '0123456789' })
    @IsNotEmpty({ message: "phone number is not empty" })
    @Matches(PatternLib.phone, { message: 'Invalid phone number format' })
    phone: string;

    @ApiProperty({ required: false, description: 'input a address', type: 'string', example: '123 Main St' })
    @IsNotEmpty({ message: "address is not empty" })
    address: string;

    @ApiProperty({ required: false, description: 'input a address', type: 'date', example: '2015-10-20' })
    // @Type(() => Date)
    // @Transform(brithday => moment(brithday).format('DD/MM/YY'))
    @Type(() => Date)
    @IsDate()
    brithday?: Date = new Date();

    @ApiProperty({ required: false, description: 'input a file picture', type: 'string', example: 'image.png' })
    avatar?: string = null;
}
