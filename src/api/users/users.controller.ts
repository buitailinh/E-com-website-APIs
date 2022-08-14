import { RolesGuard } from './../../share/auth/guards/role.guard';
import { AppObject } from './../../share/common/app.object';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './users.constant';
import { Roles } from 'src/share/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/share/auth/guards/jwt-auth.guard';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private mailerServicce: MailerService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  findAll(@Query() query) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@UploadedFile() image, @Body() createUserDto: CreateUserDto,) {
    return await this.usersService.create(createUserDto, image?.filename);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() image) {
    return this.usersService.update(+id, updateUserDto, image?.filename);
  }

  @Delete('')
  remove(@Query() query) {
    return this.usersService.remove(query.id);
  }

  @Get('email/:email')
  async getemail(@Param('email') email: string) {
    console.log(email)
    await this.mailerServicce.sendMail({
      to: email,
      from: 'linhbuitai@gmail.com',
      subject: 'Email',
      text: 'welcome to nestjs email demo',
    });

    return 'success';
  }
}
