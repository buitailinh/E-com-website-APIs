import { User } from './../../api/users/entities/user.entity';
import { ForgetPassword } from './dto/forgetPassword.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, UploadedFile, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../config/multer.config';
import { CreateUserDto } from './../../api/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { SignDto } from './dto/signIn.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiExcludeEndpoint, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // login(@Request() req) {
  //   console.log(req.body);
  //   return this.authService.generateToken(req.user);
  // }
  @ApiCreatedResponse({ description: 'Sign up a account successfully', type: User })
  @ApiBadRequestResponse({ description: 'Sign up a account failed' })
  @ApiConsumes('multipart/form-data')
  @Post('signup')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@UploadedFile() image, @Body() createUserDto: CreateUserDto,) {
    return await this.authService.signUp(createUserDto, image?.filename);
  }

  @ApiOkResponse({ description: 'Sign in successfully' })
  @ApiBadRequestResponse({ description: 'Sign in failed' })
  @ApiConsumes('multipart/form-data')
  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() signin: SignDto) {
    console.log(signin);
    return this.authService.signIn(signin);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Verify email successfully' })
  @ApiBadRequestResponse({ description: 'Verify email failed' })
  @ApiQuery({
    name: 'email',
    type: 'string',
  })
  @ApiQuery({
    name: 'token',
    type: 'string',
  })
  @Get('verify-email')
  async verifyEmail(@Query('email') email: string, @Query('token') token: string) {
    return this.authService.verifyEmail(email, token);
  }

  @ApiOkResponse({ description: 'send email forgot password successfully' })
  @ApiBadRequestResponse({ description: 'send email forgot password failed' })
  @ApiQuery({
    name: 'email',
    type: 'string',
  })
  @Get('send-forgotPassword')
  async sendEmailForgotPassword(@Query('email') email: string) {
    return await this.authService.sendForgetPassword(email);
  }

  @ApiOkResponse({ description: 'send email forgot password successfully' })
  @ApiBadRequestResponse({ description: 'send email forgot password failed' })
  @ApiConsumes('multipart/form-data')
  @Post('reset-password')
  async resetPassword(@Body() forgetPassword: ForgetPassword) {
    return await this.authService.forgetPassword(forgetPassword);
  }

  @ApiOkResponse({ description: 'send email forgot password successfully' })
  @ApiBadRequestResponse({ description: 'send email forgot password failed' })
  @ApiQuery({
    name: 'refreshToken',
    type: 'string',
  })
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
