import { PaymentService } from './../../share/payment/payment.service';
import { AppKey } from './../../share/common/app.key';
import { StatusDto } from './dto/status-order.dto';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { JwtAuthGuard } from './../../share/auth/guards/jwt-auth.guard';
import { Roles } from './../../share/decorator/roles.decorator';
import { Order } from './entities/order.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, NotFoundException, Req, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppObject } from './../../share/common/app.object';
import { Request, Response } from 'express';
import { VnpayDto } from 'src/share/payment/dto/vnpay.dto';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    private readonly userService: UsersService,
    private readonly paymentService: PaymentService,
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
  async getUser(@Req() req) {
    const user = await this.userService.findOne(req.user.id);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_ID_NOT_VALID });
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
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const user = await this.userService.findOne(req.user.id);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_ID_NOT_VALID });
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
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Req() req) {

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


  @Post('/vnpay')
  payment(@Req() req: Request): string {

    const ip = req.header('x-forwarded-for') ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    const url = this.paymentService.payment(
      ip,
      1000000,
      'NCB',
      'mua thu cho biet nay biet kia',
      'other',
      '',
    );
    http://localhost:8888/order/vnpay_return?vnp_Amount=1000000&vnp_BankCode=VNPAY&vnp_CardType=QRCODE&vnp_OrderInfo=Thanh+toan+don+hang+thoi+gian%3A+2022-10-06+20%3A10%3A45&vnp_PayDate=20221006210029&vnp_ResponseCode=24&vnp_TmnCode=2DQ7G7DW&vnp_TransactionNo=0&vnp_TransactionStatus=02&vnp_TxnRef=211001&vnp_SecureHash=d28099c63d2d912f8634cb36cdaf820fc6ba9a7d9ecc624b9f8579363dc82dd638e9ff5642f5609595ce9f26cb24f25b146ef2043afaf2ab357662e22d9d6ba7
    https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=100000000&vnp_BankCode=NCB&vnp_Command=pay&vnp_CreateDate=20221006142814&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&vnp_OrderInfo=mua+thu+cho+biet+nay+biet+kia&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A8888%2Forder%2Fvnpay%2Fvnpay_return&vnp_TmnCode=2DQ7G7DW&vnp_TxnRef=142814&vnp_Version=2.1.0&vnp_SecureHash=b7ec2eca53e4891584beebdaa2bbfa3486096779cb060e4542b68ffe6b1386a328c85678978f07a6d1000f40eadd1ff11908695f3feb72975817899803cfb14e
    // res.redirect(url)
    return url;
  }

  @Get('/vnpay/vnpay_return')
  vnpayReturn(@Query() vnpayDto: VnpayDto): { message: string; code: string } {
    return this.paymentService.vnpayReturn(vnpayDto);
  }

  @Get('/vnpay/ipn')
  vnpayIpn(@Query() vnpayDto: VnpayDto): { RspCode: string; Message: string } {
    return this.paymentService.vnpayIpn(vnpayDto);
  }

}
