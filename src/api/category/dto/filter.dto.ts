import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Min } from "class-validator";

export class filterDto {
    @ApiProperty({ type: 'int', required: false, description: 'take', minimum: 1 })
    @Min(1)
    take?: number = +process.env.TAKE_PAGE;

    @ApiProperty({ type: 'int', required: false, description: 'page', minimum: 1 })
    @Min(1)
    page?: number = 1;

    @ApiProperty({ type: 'string', required: false, description: 'key work' })
    keywork?: string = "";

    @ApiProperty({ type: 'string', required: false, description: 'sort order' })
    order?: string;

    @ApiProperty({ type: 'boolean', required: false, description: 'active' })
    @Type(() => Boolean)
    active: boolean;
}