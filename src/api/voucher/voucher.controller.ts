import { Roles } from 'src/share/decorator/roles.decorator';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/share/auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Voucher } from './entities/voucher.entity';
import { AppObject } from 'src/share/common/app.object';
import { filterDto } from '../category/dto/filter.dto';

@ApiTags('Voucher')
@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) { }


  @ApiOkResponse({
    type: Voucher,
    description: 'List voucher'
  })
  @ApiQuery({
    required: false,
    type: filterDto,
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


  @ApiCreatedResponse({
    type: Voucher,
    description: 'Create a new Voucher successfully',
  })
  @ApiBadRequestResponse({
    description: 'Voucher cannot create. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
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
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(+id);
  }
}
