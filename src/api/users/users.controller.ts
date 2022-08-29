import { filterDto } from './../category/dto/filter.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from './../../share/auth/guards/role.guard';
import { AppObject } from './../../share/common/app.object';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './users.constant';
import { Roles } from './../../share/decorator/roles.decorator';
import { JwtAuthGuard } from './../../share/auth/guards/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoleUserDto } from './dto/role-user.dto';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @ApiOkResponse({
    type: User,
    description: 'List user'
  })
  @ApiQuery({
    required: false,
    type: filterDto,
  })
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Get('/id/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
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
  @ApiParam({ name: 'email', type: 'string' })
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
  @ApiBadRequestResponse({
    description: 'User cannot update. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.PRO)
  update(@Param('id') id: string, @Body() role: RoleUserDto) {
    return this.usersService.update(+id, role);
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

}
