import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { PatternLib } from "src/share/utils/pattern.lib";

export class ResetPasswordDto {
    @ApiProperty({ required: true, description: 'input a password' })
    @IsNotEmpty({ message: "Password is not empty" })
    @Matches(PatternLib.password, { message: 'Invalid password format' })
    @MinLength(8, { message: 'Min lenght must be 8' })
    @IsString()
    password: string;

    repassword: string;
}