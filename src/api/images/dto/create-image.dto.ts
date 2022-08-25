import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateImageDto {
    @ApiProperty({
        required: false,
        description: 'note of the image',
        example: 'information',
        type: 'string'
    })
    @IsString()
    note?: string = '';

    @ApiProperty({
        required: true,
        description: 'file image item ',
        // example: 'a.jpg',
        type: 'string',
        format: 'binary',
    })
    file?: string;

    // @ApiProperty({ type: 'number' })
    // @IsNumber()
    // itemId: number;
}
