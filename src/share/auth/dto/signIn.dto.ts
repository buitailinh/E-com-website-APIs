import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { PatternLib } from "src/share/utils/pattern.lib";

export class SignDto {
    @ApiProperty({ type: 'string', required: true, description: ' email address' })
    @IsNotEmpty({ message: "Email iss not empty" })
    @IsEmail({ message: 'Invalid email format' })
    @Matches(PatternLib.email, {
        message: 'Invalid email format'
    })
    email: string;

    @ApiProperty({ required: true, description: ' password' })
    @IsNotEmpty({ message: "Password is not empty" })
    @Matches(PatternLib.password, { message: 'Invalid password format' })
    @Length(8, 30, { message: 'Min lenght must be 8' })
    @IsString()
    password: string;
}