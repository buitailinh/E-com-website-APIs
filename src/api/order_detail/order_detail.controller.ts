import { Roles } from 'src/share/decorator/roles.decorator';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/share/auth/guards/jwt-auth.guard';
import { OrderDetail } from './entities/order_detail.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderService } from '../order/order.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppObject } from 'src/share/common/app.object';

@ApiTags('Order detail')
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService,
    // private readonly orderService: OrderService,
  ) { }

  // @Post(':id')
  // async create(@Body() createOrderDetailDto: CreateOrderDetailDto, @Param('id') id: string) {
  //   const order = await this.orderService.findOne(+id);
  //   return this.orderDetailService.create(createOrderDetailDto, order);
  // }

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
