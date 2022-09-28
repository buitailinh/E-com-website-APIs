import { AUTH_SWAGGER_RESPONSE } from './auth,constant';
import { Headers } from './../common/models/common.model';
import { User } from './../../api/users/entities/user.entity';
import { ForgetPassword } from './dto/forgetPassword.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, UploadedFile, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../config/multer.config';
import { CreateUserDto } from './../../api/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { SignDto } from './dto/signIn.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiExcludeEndpoint, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpCode } from '@nestjs/common/decorators';
import * as CircularJSON from 'circular-json';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guards';

@ApiTags('Auth')
@ApiBearerAuth()
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
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @ApiConsumes('multipart/form-data')
  @Post('signup')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@UploadedFile() image, @Body() createUserDto: CreateUserDto,) {
    return await this.authService.signUp(createUserDto, image?.filename);
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  // @ApiConsumes('multipart/form-data')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() signin: SignDto, @Res() res: Response) {
    const result = await this.authService.signIn(signin);
    res.setHeader('Set-Cookie', [result.cookie.cookie1, result.cookie.cookie2]);
    // // res.cookie('auth-cookie', secretData, { httpOnly: true });
    res.send(result);
    return { 'msg': 'Sign in successful' }



  }

  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
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

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @ApiQuery({
    name: 'email',
    type: 'string',
  })
  @Get('send-forgotPassword')
  async sendEmailForgotPassword(@Query('email') email: string) {
    return await this.authService.sendForgetPassword(email);
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @ApiConsumes('multipart/form-data')
  @Post('reset-password')
  async resetPassword(@Body() forgetPassword: ForgetPassword) {
    return await this.authService.forgetPassword(forgetPassword);
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @ApiQuery({
    name: 'refreshToken',
    type: 'string',
  })
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refreshToken')
  async refreshToken(@Request() req) {
    const refresh = await this.authService.refreshToken(req.cookies.Refresh);
    req.res.setHeader('Set-Cookie', refresh);
    return { 'msg': 'refresh token successful' };
  }

  @ApiOkResponse({
    type: User,
    description: 'information about user'
  })
  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Get('user')
  user(@Request() req) {
    // console.log(req);
    return req.user;
  }

  @ApiOkResponse({
    type: User,
    description: 'information about user'
  })
  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Get('addPhone')
  phone(@Request() req) {
    // console.log(req);
    return { message: 'please enter your phone number...' };
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Patch('addPhone')
  async addphone(@Request() req, @Body() body) {
    await this.authService.addPhone(req.user, body.phone);
    return { message: 'please enter your phone number...' };
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() { };

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async loginGG(@Req() req) {
    return this.authService.loginGG(req);
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.AUTH_OK)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.USER_FAIL)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @ApiExcludeEndpoint()
  async logout(@Request() req, @Res() response: Response) {
    await this.authService.logout(req.user.id);
    response.setHeader('Set-Cookie', ['Authentication=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0']);
    return response.sendStatus(200).send('login');
  }

}
