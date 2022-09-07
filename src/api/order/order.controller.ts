import { StatusDto } from './dto/status-order.dto';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { JwtAuthGuard } from './../../share/auth/guards/jwt-auth.guard';
import { Roles } from './../../share/decorator/roles.decorator';
import { Order } from './entities/order.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppObject } from './../../share/common/app.object';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    private readonly userService: UsersService,
  ) { }

  @ApiOkResponse({
    type: Order,
    description: 'List order'
  })
  @ApiQuery({})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @Get()
  findAll(@Query() query) {
    return this.orderService.findAll(query);
  }

  @ApiOkResponse({
    type: Order,
    description: 'information User order'
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.CLIENT)
  @Get('user')
  async getUser(@Request() req) {
    const user = await this.userService.findOne(req.user.id);
    return this.orderService.getOrderByUser(user);
  }

  @ApiOkResponse({
    type: Order,
    description: 'information about order'
  })
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiCreatedResponse({
    type: Order,
    description: 'Create a new order successfully'
  })
  @ApiBadRequestResponse({
    description: 'Order cannot create. Try again!',
  })
  // @ApiParam({ name: 'id' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.CLIENT)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const user = await this.userService.findOne(req.user.id);
    return this.orderService.create(createOrderDto, user);
  }

  @ApiOkResponse({
    type: Order,
    description: 'Update a new order successfully'
  })
  @ApiBadRequestResponse({
    description: 'Order cannot update. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.CLIENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Request() req) {

    return this.orderService.update(+id, updateOrderDto, req.user);
  }

  @ApiOkResponse({
    type: Order,
    description: 'Update a new order successfully'
  })
  @ApiBadRequestResponse({
    description: 'Order cannot update. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body() status: StatusDto) {
    return this.orderService.updateStatus(+id, status.status);
  }


  @ApiOkResponse({
    description: 'delete a new order successfully'
  })
  @ApiBadRequestResponse({
    description: 'Order cannot delete. Try again!',
  })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
