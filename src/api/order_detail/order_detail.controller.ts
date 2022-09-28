import { Roles } from '../../share/decorator/roles.decorator';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { JwtAuthGuard } from '../../share/auth/guards/jwt-auth.guard';
import { OrderDetail } from './entities/order_detail.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderService } from '../order/order.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppObject } from './../../share/common/app.object';
import { ExportDataService } from './exportData.service';

@ApiTags('Order detail')
@ApiBearerAuth()
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService,
    private readonly exportDataService: ExportDataService,
  ) { }

  // @Post(':id')
  // async create(@Body() createOrderDetailDto: CreateOrderDetailDto, @Param('id') id: string) {
  //   const order = await this.orderService.findOne(+id);
  //   return this.orderDetailService.create(createOrderDetailDto, order);
  // }

  @ApiOkResponse({
    type: OrderDetail,
    description: 'List port',
  })
  @ApiQuery({})
  @Get('exportgoogle')
  getGGS2(@Query() query) {
    return this.exportDataService.exportData(query);
  }

  @ApiOkResponse({
    type: OrderDetail,
    description: 'List port',
  })
  @ApiQuery({})
  @Get('top10')
  getGGS3() {
    return this.exportDataService.exportData2();
  }

  @ApiOkResponse({
    type: OrderDetail,
    description: 'List order details',
  })
  @ApiQuery({})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @Get()
  findAll(@Query() query) {
    return this.orderDetailService.findAll(query);
  }

  @ApiOkResponse({
    type: OrderDetail,
    description: 'information about order details',
  })
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
  //   return this.orderDetailService.update(+id, updateOrderDetailDto);
  // }

  @ApiOkResponse({
    description: 'Delete a order detail successfully',
  })
  @ApiBadRequestResponse({
    description: 'Order detail cannot delete. Try again!',
  })
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailService.remove(+id);
  }
}
