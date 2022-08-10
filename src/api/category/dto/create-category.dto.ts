import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ToBoolean } from "src/share/common/app.const";

export class CreateCategoryDto {
    @IsNotEmpty({
        message: 'Name category is not empty',
    })
    @ApiProperty({
        required: true,
        description: 'Name category is not empty',
        example: 'name category',
    })
    @IsString()
    @MinLength(4, { message: 'name category is min lengh 4' })
    nameCategory: string;

    @ApiProperty({
        required: false,
        description: 'file image category ',
        example: 'a.jpg',
    })
    file?: string;


    @ApiProperty({
        required: false,
        description: 'active category: active/inactive ',
        example: 'true',
    })
    @Type(() => Boolean)
    // @IsBoolean()
    active?: boolean;


}
