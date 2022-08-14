import { ResetPasswordDto } from './dto/reset-password.dto';
import { sendEmail } from './../utils/utils/sendEmail';
import { ResponseError } from './../common/models/error.model';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, UploadedFile, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    console.log(req.body);
    return this.authService.generateToken(req.user);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@UploadedFile() image, @Body() createUserDto: CreateUserDto,) {
    return await this.authService.create(createUserDto, image?.filename);
  }

  @UseGuards(JwtAuthGuard)
  @Get('email/verify')
  async verifyEmail(@Request() req, @Query() query) {
    try {
      var isEmailVerified = await this.authService.verifyEmail(req.user, query.token);
      return isEmailVerified;
    } catch (error) {
      return 'login failed';
    }
  }

  @Get('login/forgotPassword/:email')
  async sendEmailForgotPassword(@Param('email') email: string) {
    return await this.authService.sendEmailForgotPassword(email);
  }

  @Post('login/reset-password')
  async resetPassword(@Query() query, @Body() resetPassword: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPassword, query);
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthenticatedGuard)
  @Get('user')
  user(@Request() req) {
    // console.log(req);
    return req.user;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() { };

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async loginGG(@Req() req) {
    return this.authService.loginGG(req);
  }


}
