import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from 'class-validator';
import { AppObject } from '../../../share/common/app.object';

export class StatusDto {
    @ApiProperty({
        required: true,
        enum: AppObject.ORDER.STATUS,
        default: AppObject.ORDER.STATUS.WFC,
        description: 'order'
    })
    @IsEnum(AppObject.ORDER.STATUS)
    @IsString()
    status?: string;
}