import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlphanumeric, IsBoolean, IsDate, IsNotEmpty, IsNumber, Max, Min, MinLength } from "class-validator";

export class CreateVoucherDto {

    @ApiProperty({ required: true, description: 'name voucher apply item', type: 'string', minimum: 4 })
    @IsNotEmpty({ message: 'name voucher is not empty' })
    @MinLength(4)
    nameVoucher: string;

    @ApiProperty({ required: true, description: 'Code voucher apply item', type: 'string', minLength: 4 })
    @IsNotEmpty({ message: 'code voucher is not empty' })
    @IsAlphanumeric()
    @MinLength(4)
    codeVoucher: string;

    @ApiProperty({ type: 'int', description: 'sale of items', minimum: 0, maximum: 100 })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Max(100)
    sale?: number;

    @ApiProperty({ required: true, description: 'quantity voucher', type: ' int', minimum: 0 })
    @IsNotEmpty({ message: 'quantity vourch is not empty' })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    quantity: number = 0;

    @ApiProperty({ required: false, description: 'start voucher', type: 'boolean', })
    @Type(() => Boolean)
    @IsBoolean()
    status: boolean = true;

    @ApiProperty({ required: true, description: 'Time start of Voucher', type: 'string', })
    @IsNotEmpty({ message: 'Time start flash is not empty', })
    @IsDate()
    @Type(() => Date)
    timeStart: Date;

    @ApiProperty({ required: true, description: 'Time end of Voucher', type: 'string', })
    @IsNotEmpty({ message: 'Time start flash is not empty', })
    @IsDate()
    @Type(() => Date)
    timeEnd: Date;

}
