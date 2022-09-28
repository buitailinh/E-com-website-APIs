import { AppKey } from './../../share/common/app.key';
import { filterDto } from './../category/dto/filter.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { AppObject } from './../../share/common/app.object';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards, Request, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, USER_SWAGGER_RESPONSE } from './users.constant';
import { Roles } from './../../share/decorator/roles.decorator';
import { JwtAuthGuard } from './../../share/auth/guards/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RoleUserDto } from './dto/role-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.USER_OK)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiUnauthorizedResponse(USER_SWAGGER_RESPONSE.UNAUTHORIZED_EXCEPTION)
  @ApiInternalServerErrorResponse(USER_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @ApiOkResponse({
    type: User,
    description: 'List user'
  })
  @ApiQuery({
    required: false,
    type: filterDto,
  })
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Get('/id/:id')
  @ApiOkResponse(USER_SWAGGER_RESPONSE.USER_OK)
  @ApiNotFoundResponse(USER_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiUnauthorizedResponse(USER_SWAGGER_RESPONSE.UNAUTHORIZED_EXCEPTION)
  @ApiInternalServerErrorResponse(USER_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @ApiOkResponse({
    type: User,
    description: 'information about user'
  })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_ID_NOT_VALID });
    return user;
  }


  @ApiParam({ name: 'email', type: 'string' })
  @Get('email/:email')
  @ApiOkResponse(USER_SWAGGER_RESPONSE.USER_OK)
  @ApiNotFoundResponse(USER_SWAGGER_RESPONSE.USER_FAIL)
  @ApiUnauthorizedResponse(USER_SWAGGER_RESPONSE.UNAUTHORIZED_EXCEPTION)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(USER_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  getByEmail(@Param('email') email: string) {
    const user = this.usersService.getByEmail(email);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });
    return user;
  }

  @Get('phone/:phone')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.USER_OK)
  @ApiNotFoundResponse(USER_SWAGGER_RESPONSE.USER_FAIL)
  @ApiUnauthorizedResponse(USER_SWAGGER_RESPONSE.UNAUTHORIZED_EXCEPTION)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(USER_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  getByPhone(@Param('phone') phone: string) {
    const user = this.usersService.getByPhone(phone);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_PHONE_EXIST });
    return user;
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  // async create(@UploadedFile() image, @Body() createUserDto: CreateUserDto,) {
  //   return await this.usersService.create(createUserDto, image?.filename);
  // }

  @ApiOkResponse({
    type: User,
    description: 'Update user successfully',
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_REQUEST)
  @ApiNotFoundResponse(USER_SWAGGER_RESPONSE.USER_FAIL)
  @ApiUnauthorizedResponse(USER_SWAGGER_RESPONSE.UNAUTHORIZED_EXCEPTION)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(USER_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @ApiConsumes('multipart/form-data')
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updateForUser(@Request() req, @Body() updateUserDto: UpdateUserDto, @UploadedFile() image) {
    console.log(req.user);
    return this.usersService.UpdateByUser(updateUserDto, req.user, image?.filename);
  }

  @ApiOkResponse({
    type: User,
    description: 'Update user successfully',
  })
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_REQUEST)
  @ApiNotFoundResponse(USER_SWAGGER_RESPONSE.USER_FAIL)
  @ApiUnauthorizedResponse(USER_SWAGGER_RESPONSE.UNAUTHORIZED_EXCEPTION)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(USER_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.PRO)
  async update(@Param('id') id: string, @Body() role: RoleUserDto) {

    return await this.usersService.update(+id, role);
  }

  @ApiOkResponse(USER_SWAGGER_RESPONSE.USER_OK)
  @ApiNotFoundResponse(USER_SWAGGER_RESPONSE.USER_FAIL)
  @ApiUnauthorizedResponse(USER_SWAGGER_RESPONSE.UNAUTHORIZED_EXCEPTION)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(USER_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @ApiParam({ name: 'id' })
  @Delete('')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  remove(@Query() query, @Request() req) {
    return this.usersService.remove(query.id);
  }



}
