import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateImageDto {
    @ApiProperty({
        required: false,
        description: 'note of the image',
        example: 'information',
    })
    @IsString()
    note?: string = '';
}
