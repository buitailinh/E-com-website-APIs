import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateImageDto {
    @ApiProperty({
        required: false,
        description: 'note of the image',
        example: 'information',
    })
    @IsString()
    note?: string = '';

    // @ApiProperty({ type: 'number' })
    // @IsNumber()
    // itemId: number;
}
