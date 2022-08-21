import { User } from './entities/user.entity';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { AppObject } from './../../share/common/app.object';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './users.constant';
import { Roles } from 'src/share/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/share/auth/guards/jwt-auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private mailerServicce: MailerService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @ApiOkResponse({
    type: User,
    description: 'List user'
  })
  @ApiQuery({})
  findAll(@Query() query) {
    return this.usersService.findAll(query);
  }

  @Get('/id/:id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @ApiOkResponse({
    type: User,
    description: 'information about user'
  })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOkResponse({
    type: User,
    description: 'information about user with email'
  })
  @ApiParam({ name: 'email' })
  @Get('email/:email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  getByEmail(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Get('phone/:phone')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  getByPhone(@Param('phone') phone: string) {
    return this.usersService.getByPhone(phone);
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
  @ApiBadRequestResponse({
    description: 'User cannot update. Try again!',
  })
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
  @ApiBadRequestResponse({
    description: 'User cannot update. Try again!',
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.PRO)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOkResponse({

    description: 'Delete user successfully',
  })
  @ApiBadRequestResponse({
    description: 'User cannot delete. Try again!',
  })
  @ApiParam({ name: 'id' })
  @Delete('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  remove(@Query() query, @Request() req) {
    return this.usersService.remove(query.id);
  }

  // @Get('email/:email')
  // async getemail(@Param('email') email: string) {
  //   console.log(email)
  //   await this.mailerServicce.sendMail({
  //     to: email,
  //     from: 'linhbuitai@gmail.com',
  //     subject: 'Email',
  //     text: 'welcome to nestjs email demo',
  //   });

  //   return 'success';
  // }
}
