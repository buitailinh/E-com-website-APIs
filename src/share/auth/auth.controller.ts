import { ForgetPassword } from './dto/forgetPassword.dto';
import { sendEmail } from './../utils/utils/sendEmail';
import { ResponseError } from './../common/models/error.model';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, UploadedFile, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { SignDto } from './dto/signIn.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


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

  @Post('signup')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@UploadedFile() image, @Body() createUserDto: CreateUserDto,) {
    return await this.authService.signUp(createUserDto, image?.filename);
  }

  @Post('signin')
  async signin(@Body() signin: SignDto) {
    return this.authService.signIn(signin);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('verify-email')
  async verifyEmail(@Query('email') email: string, @Query('token') token: string) {
    return this.authService.verifyEmail(email, token);
  }

  @Get('send-forgotPassword')
  async sendEmailForgotPassword(@Query('email') email: string) {
    return await this.authService.sendForgetPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() forgetPassword: ForgetPassword) {
    return await this.authService.forgetPassword(forgetPassword);
  }

  @Post('refreshToken')
  refreshToken(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
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

  @Post('/logout')
  @ApiExcludeEndpoint()
  logout() {
    // TODO: implement this method
  }

}
