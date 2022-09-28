import { PatternLib } from './../utils/pattern.lib';
import { Matches } from 'class-validator';
import { User } from './../../api/users/entities/user.entity';
import { ForgetPassword } from './dto/forgetPassword.dto';
import { async, retry } from 'rxjs';
import { JwtPayload } from './jwt-payload.interface';
import { SignDto } from './dto/signIn.dto';
import { SendmailService } from './../sendmail/sendmail.service';
import { AppKey } from './../common/app.key';
import { BadRequestException, Injectable, UnauthorizedException, NotFoundException, HttpException, HttpStatus, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../api/users/users.service';
import { CreateUserDto } from './../../api/users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './../../api/users/users.repository';
import { OtpService } from '../otp/otp.service';
import { SmsService } from '../otp/sms.service';
import { Http } from 'winston/lib/winston/transports';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailerServicce: MailerService,
    private configService: ConfigService,
    private userRepository: UserRepository,
    private sendMailService: SendmailService,
    private otpService: OtpService,
    private smsService: SmsService
  ) { };
  async validateUserCreds(email: string, passwordI: string): Promise<any> {
    console.log(`${email},${passwordI}`);

    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });


    if (!(await bcrypt.compareSync(passwordI, user.password)))
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    // console.log(user);
    user.password = undefined;
    return user;
  }

  async generateToken(user: any, refresh = true) {
    // console.log(`${user.fullname}`)
    const payload: JwtPayload = { email: user.email, id: user.id, role: user.role };
    const access_token = this.jwtService.sign({ payload }, { expiresIn: process.env.JWT_EXPIRE_TIME });

    if (refresh) {
      const refresh_Token = this.jwtService.sign({ payload },
        {
          secret: process.env.REFRESH_JWT_SECRET,
          expiresIn: process.env.REFRESH_JWT_EXPIRE_TIME
        });
      const refreshToken = await bcrypt.hash(
        this.reverse(refresh_Token),
        10,
      );
      await this.userService.userRepository.save({ ...user, refreshToken });
      return {
        expiresIn: process.env.JWT_EXPIRE_TIME,
        access_token,
        expiresInRefresh: process.env.REFRESH_JWT_EXPIRE_TIME,
        refresh_Token,
      }
    }
    else {
      return {
        expiresIn: process.env.JWT_EXPIRE_TIME,
        access_token,
      };
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_JWT_SECRET,
      });
      const user = await this.getUserByRefresh(refreshToken, payload.payload.email);
      const token = await this.generateToken(user, false);
      return `Authentication=${token.access_token}; HttpOnly; Path=/; Max-Age=${token.expiresIn}`;

    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

  }

  async getUserByRefresh(refreshToken, email) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });
    const is_equal = await bcrypt.compare(
      this.reverse(refreshToken),
      user.refreshToken
    );
    if (!is_equal) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    return user;
  }

  private reverse(s) {
    return s.split('').reverse().join('');
  }

  async signUp(createUserDto: CreateUserDto, file?: string) {
    const user = await this.userService.create(createUserDto, file);
    // console.log(user);
    const token = await this.generateToken(user);
    await this.sendMailService.sendVerifiedEmail(user.email, token.access_token);

    return {
      status: HttpStatus.OK,
      message: 'Đăng ký thành công, email send message to verification',
    };
  }




  async signIn(signDto: SignDto) {
    const { email, password } = signDto;
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.isVerify === false) {
        const token = await this.generateToken(user);
        await this.sendMailService.sendVerifiedEmail(user.email, token.access_token);
        return {
          status: HttpStatus.ACCEPTED,
          message: 'Because you have not confirmed your email address, please read in your email inbox'
        }
      };
      const token = await this.generateToken(user);
      const cookie1 = `Authentication=${token.access_token}; HttpOnly; Path=/; Max-Age=${token.expiresIn}`;
      const cookie2 = `Refresh=${token.refresh_Token}; HttpOnly; Path=/; Max-Age=${token.expiresInRefresh}`;
      const cookie = { cookie1, cookie2 };
      return { message: 'Login successful', status: HttpStatus.OK, token, cookie };
      // return cookie;
    }
    else {
      throw new UnauthorizedException('email or passsword is incorrect');
    }
  }

  async verifyEmail(email: string, token: string) {

    const decodedJwtAccessToken = await this.jwtService.decode(token);
    // console.log(decodedJwtAccessToken['payload']);
    // console.log(token);
    if (email === decodedJwtAccessToken['payload'].email) {
      const user = await this.userService.getByEmail(email)
      if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });
      await this.userService.verifyEmail(email);
      return {
        status: HttpStatus.OK,
        message: 'verify email successfully',
      };
    }
    throw new BadRequestException('verify email failed');

  }

  // async generateOTP(id: number) {
  //   const salt = await bcrypt.genSalt();
  //   const otp = bcrypt.hash(id.toString(), salt);
  //   return otp;
  // }

  // async verifyOTP(id: number, OTP: string) {
  //   const check = await bcrypt.compare(id.toString(), OTP);
  //   return check;
  // }

  async logout(id: number) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_ID_NOT_VALID });
    await this.userService.userRepository.save({ ...user, refreshToken: null })
  }

  // async sendForgetPassword(email: string) {
  //   const user = await this.userService.getByEmail(email);
  //   const otp = await this.otpService.generateOtp(user.email);
  //   console.log(otp);
  //   await this.sendMailService.sendForgetPassword(email, otp);
  //   return {
  //     status: HttpStatus.OK,
  //     message: 'send forget password successfully',
  //   };
  // }

  // async forgetPassword(forgetPassword: ForgetPassword) {
  //   const { email, newPassword, OTP } = forgetPassword;
  //   const user = await this.userService.getByEmail(email);
  //   const result = await this.otpService.checkOtp(user.email, OTP);
  //   if (result) {
  //     const updatePassword = await this.userService.resertPassword(email, newPassword);
  //     if (updatePassword) {
  //       return {
  //         status: HttpStatus.CREATED,
  //         message: 'update password successfully',
  //       };
  //     }
  //     return {
  //       status: HttpStatus.BAD_REQUEST,
  //       message: 'update password failed',
  //     };
  //   }
  // }

  async sendForgetPassword(email: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });
    if (!user.phone) throw new BadRequestException('Phone number not exists');
    await this.smsService.initiatePhoneNumberVerification(user.phone);
    return {
      message: 'please check sms verificationCode',
      status: HttpStatus.PROCESSING,
    }
  }

  async forgetPassword(forgetPassword: ForgetPassword) {
    const { email, newPassword, OTP } = forgetPassword;
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });
    const result = await this.smsService.confirmPhonePhoneNumber(user.phone, OTP);
    if (result) {
      const updatePassword = await this.userService.resertPassword(email, newPassword);
      if (updatePassword) {
        return 'update password successfully';
      }
      return 'update password failed';
    }
  }


  // async sendEmailForgotPassword(email: string) {
  //   const userFound = await this.userService.getByEmail(email);
  //   if (userFound === null) throw new NotFoundException('Email not found');
  //   const token = await this.generateToken(userFound);

  //   let mailOptions = {
  //     to: userFound.email,
  //     from: 'linhbuitai@gmail.com',
  //     subject: 'Frogotten Password',
  //     text: 'Forgot Password',
  //     html: `<html><h4>welcome to web shopp</h4> and link your account to: <a href=${process.env.BACKEND_HOST}/auth/login/reset-password?token=${token.access_token}>confirm Email</a> </html> `,
  //   };

  //   const sent = await new Promise<boolean>(async function (resolve, reject) {
  //     return await this.mailerServicce.sendMail(mailOptions, async (error, info) => {
  //       if (error) {
  //         console.log('Message sent: %s', error);
  //         return reject(false);
  //       }
  //       console.log('Message sent: %s', info.messageId);
  //       resolve(true);
  //     });
  //   })

  //   return sent;
  // }

  // async resetPassword(rp: ResetPasswordDto, token: string) {
  //   if (rp.password !== rp.repassword) throw new NotFoundException('password must match repassword');
  //   const salt = await bcrypt.genSalt();
  //   const password = await bcrypt.hash(rp.password, salt);
  //   const decodedJwtAccessToken = await this.jwtService.decode(token);
  //   const user = await this.userService.getByEmail(decodedJwtAccessToken['email']);
  //   if (user === null) throw new NotFoundException('Email not found');
  //   await this.userRepository.update(user.id, password);
  //   const userUpdate = await this.userService.findOne(user.id);
  //   console.log(userUpdate);
  //   return await this.generateToken(userUpdate);
  // }

  async addPhone(user: User, phone) {
    if (!phone.Matches(PatternLib.phone))
      throw new BadRequestException('Phone must match pattern');
    const userFound = await this.userService.findOne(user.id);
    if (!userFound) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_ID_NOT_VALID });
    const phoneUser = await this.userService.getByPhone(phone);
    if (phoneUser && user.phone !== phoneUser.phone) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_PHONE_EXIST });
    return this.userRepository.save({ ...userFound, phone });
  }

  async loginGG(data) {
    const { user } = data;
    console.log(user);
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      }
    });
    if (!userFound) {
      const userdata = {
        email: user.email,
        fullname: user.name,
      }

      const userNew = await this.userRepository.create(userdata);
      await this.userService.verifyEmail(userNew.email);
      const token = await this.generateToken(userNew);

      return {
        ...token,
        url: 'localhost:8888/auth/addPhone',
        user: userNew,
        message: 'create account google successfully',
      }

    }
    const token = await this.generateToken(userFound);
    return {
      ...token,
      user: userFound,
      message: 'login google successfully',
    };
  }

}
