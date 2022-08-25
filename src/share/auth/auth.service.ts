import { ForgetPassword } from './dto/forgetPassword.dto';
import { async } from 'rxjs';
import { JwtPayload } from './jwt-payload.interface';
import { SignDto } from './dto/signIn.dto';
import { SendmailService } from './../sendmail/sendmail.service';
import { AppKey } from './../common/app.key';
import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/api/users/users.service';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/api/users/users.repository';
import { OtpService } from '../otp/otp.service';
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
  ) { };
  async validateUserCreds(email: string, passwordI: string): Promise<any> {
    console.log(`${email},${passwordI}`);

    const user = await this.userService.getByEmail(email);
    // console.log(user);
    if (user === null) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });


    if (!(await bcrypt.compareSync(passwordI, user.password)))
      throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.USER.ERR_NOT_PASS_CORRECT });
    // console.log(user);
    const { password, ...data } = user;
    return data;
  }

  async generateToken(user: any) {
    // console.log(`${user.fullname}`)
    const payload: JwtPayload = { email: user.email, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign({ payload }, { expiresIn: process.env.JWT_EXPIRE_TIME }),
      refresh_Token: this.jwtService.sign({ payload },
        {
          secret: process.env.REFRESH_JWT_SECRET,
          expiresIn: process.env.REFRESH_JWT_EXPIRE_TIME
        }),
    }
  }

  async refreshToken(refreshToken: string) {
    const result = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_JWT_SECRET,
    });
    if (result) {
      const email = result.email;
      const id = result.id;
      const role = result.role;
      const payload: JwtPayload = { email, id, role }
      const access_token = this.jwtService.sign({ payload }, {
        expiresIn: '24h',
      });

      return {
        code: 200,
        message: 'refreshToken token success',
        access_token,
      }
    }
  }

  async signUp(createUserDto: CreateUserDto, file?: string) {
    const user = await this.userService.create(createUserDto, file);
    console.log(user);
    const token = await this.generateToken(user);
    // await this.mailerServicce.sendMail({
    //   to: user.email,
    //   from: 'linhbuitai@gmail.com',
    //   subject: 'verify email address your',
    //   text: ``,
    //   html: `<html><h4>welcome to web shopp</h4> and link your account to: <a href=${process.env.BACKEND_HOST}/auth/email/verify?token=${token.access_token}>confirm Email</a> </html> `,
    // });

    await this.sendMailService.sendVerifiedEmail(user.email, token.access_token);

    return {
      code: 200,
      message: 'Đăng ký thành công, email send message to verification',
    };
  }


  async signIn(signDto: SignDto) {
    const { email, password } = signDto;
    const user = await this.userService.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.isVerify === false) throw new UnauthorizedException('chua verify email');
      const token = await this.generateToken(user);
      return { message: 'Login successful', token, user };
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
      await this.userService.getByEmail(email)
      await this.userService.verifyEmail(email);
      return 'verify email successfully';
    }
    return 'verify email failed';

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

  async sendForgetPassword(email: string) {
    const user = await this.userService.getByEmail(email);
    const otp = await this.otpService.generateOtp(user.email);
    console.log(otp);
    await this.sendMailService.sendForgetPassword(email, otp);
    return 'send forget password successfully';
  }

  async forgetPassword(forgetPassword: ForgetPassword) {
    const { email, newPassword, OTP } = forgetPassword;
    const user = await this.userService.getByEmail(email);
    const result = await this.otpService.checkOtp(user.email, OTP);
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

  async loginGG(data) {
    const { user } = data;
    console.log(user);
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      }
    });
    if (!userFound) {
      const userdate = {
        email: user.email,
        fullname: user.name,
      }

      const userNew = await this.userRepository.create(userdate);
      const token = await this.generateToken(userNew);
      return {
        token,
        user: userNew,
        message: 'login1 google successfully',
      }

    }
    const token = await this.generateToken(userFound);
    return {
      token,
      user: userFound,
      message: 'login2 google successfully',
    };
  }

}
