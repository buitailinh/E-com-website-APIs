import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlphanumeric, IsBoolean, IsDate, IsNotEmpty, IsNumber, Max, Min, MinLength } from "class-validator";

export class CreateVoucherDto {

    @ApiProperty({ required: true, description: 'name voucher apply item' })
    @IsNotEmpty({ message: 'name voucher is not empty' })
    @MinLength(4)
    nameVoucher: string;

    @ApiProperty({ required: true, description: 'Code voucher apply item' })
    @IsNotEmpty({ message: 'code voucher is not empty' })
    @IsAlphanumeric()
    @MinLength(4)
    codeVoucher: string;

    @ApiProperty({ type: 'number' })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Max(100)
    sale?: number;

    @ApiProperty({ required: true, description: 'amount voucher' })
    @IsNotEmpty({ message: 'amount vourch is not empty' })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    quantity: number = 0;

    @Type(() => Boolean)
    @IsBoolean()
    status: boolean = true;

    @IsNotEmpty({
        message: 'Time start flash is not empty',
    })
    @IsDate()
    @Type(() => Date)
    timeStart: Date;


    @IsNotEmpty({
        message: 'Time start flash is not empty',
    })
    @IsDate()
    @Type(() => Date)
    timeEnd: Date;

}
