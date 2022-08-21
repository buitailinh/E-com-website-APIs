import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Voucher } from './entities/voucher.entity';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) { }


  @ApiOkResponse({
    type: Voucher,
    description: 'List voucher'
  })
  @Get()
  findAll(@Query() query) {
    return this.voucherService.findAll(query);
  }

  @ApiOkResponse({
    type: Voucher,
    description: 'information about Voucher'
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(+id);
  }


  @ApiOkResponse({
    type: Voucher,
    description: 'Create a new Voucher successfully',
  })
  @ApiBadRequestResponse({
    description: 'Voucher cannot create. Try again!',
  })
  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @ApiOkResponse({
    type: Voucher,
    description: 'Update voucher successfully',
  })
  @ApiBadRequestResponse({
    description: 'Voucher cannot update. Try again!',
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVourchDto: UpdateVoucherDto) {
    return this.voucherService.update(+id, updateVourchDto);
  }

  @ApiOkResponse({
    description: 'Delete a voucher successfully',
  })
  @ApiBadRequestResponse({
    description: 'Voucher cannot delete. Try again!',
  })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(+id);
  }
}
