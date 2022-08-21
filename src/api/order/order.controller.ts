import { Order } from './entities/order.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

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
  @Get()
  findAll(@Query() query) {
    return this.orderService.findAll(query);
  }

  @ApiOkResponse({
    type: Order,
    description: 'information User order'
  })
  @ApiParam({ name: 'id' })
  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    return this.orderService.getOrderByUser(user);
  }

  @ApiOkResponse({
    type: Order,
    description: 'information about order'
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOkResponse({
    type: Order,
    description: 'Create a new order successfully'
  })
  @ApiBadRequestResponse({
    description: 'Order cannot create. Try again!',
  })
  @ApiParam({ name: 'id' })
  @ApiBody({})
  @Post(':id')
  async create(@Body() createOrderDto: CreateOrderDto, @Param('id') id: number) {
    const user = await this.userService.findOne(id);
    return this.orderService.create(createOrderDto, user);
  }

  @ApiOkResponse({
    type: Order,
    description: 'Update a new order successfully'
  })
  @ApiBadRequestResponse({
    description: 'Order cannot update. Try again!',
  })
  @ApiParam({ name: 'id' })
  @ApiBody({})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOkResponse({
    description: 'delete a new order successfully'
  })
  @ApiBadRequestResponse({
    description: 'Order cannot delete. Try again!',
  })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
