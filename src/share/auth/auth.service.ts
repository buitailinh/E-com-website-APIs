import { ResetPasswordDto } from './dto/reset-password.dto';
import { sendEmail } from './../utils/utils/sendEmail';
import { AppKey } from './../common/app.key';
import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/api/users/users.service';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/api/users/users.repository';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailerServicce: MailerService,
    private configService: ConfigService,
    private userRepository: UserRepository,
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
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
        role: user.role,
      })
    }
  }

  async create(createUserDto: CreateUserDto, file?: string) {
    const user = await this.userService.create(createUserDto, file);
    console.log(user);
    const token = await this.generateToken(user);
    // console.log(token);
    // const url = `${this.configService.get(process.env.EMAIL_CONFIRMATION_URL)}?token=${token.access_token}`;
    // console.log(url);
    await this.mailerServicce.sendMail({
      to: user.email,
      from: 'linhbuitai@gmail.com',
      subject: 'verify email address your',
      text: ``,
      html: `<html><h4>welcome to web shopp</h4> and link your account to: <a href=${process.env.BACKEND_HOST}/auth/email/verify?token=${token.access_token}>confirm Email</a> </html> `,
    });

    return 'success';
  }

  async verifyEmail(user: any, token: string) {
    const decodedJwtAccessToken = await this.jwtService.decode(token);
    // console.log(decodedJwtAccessToken['email']);
    console.log(user);
    if (user.email === decodedJwtAccessToken['email']) {
      return 'verify email successfully';
    }
    return 'verify email failed';
  }

  async sendEmailForgotPassword(email: string) {
    const userFound = await this.userService.getByEmail(email);
    if (userFound === null) throw new NotFoundException('Email not found');
    const token = await this.generateToken(userFound);

    let mailOptions = {
      to: userFound.email,
      from: 'linhbuitai@gmail.com',
      subject: 'Frogotten Password',
      text: 'Forgot Password',
      html: `<html><h4>welcome to web shopp</h4> and link your account to: <a href=${process.env.BACKEND_HOST}/auth/login/reset-password?token=${token.access_token}>confirm Email</a> </html> `,
    };

    const sent = await new Promise<boolean>(async function (resolve, reject) {
      return await this.mailerServicce.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log('Message sent: %s', error);
          return reject(false);
        }
        console.log('Message sent: %s', info.messageId);
        resolve(true);
      });
    })

    return sent;
  }

  async resetPassword(rp: ResetPasswordDto, token: string) {
    if (rp.password !== rp.repassword) throw new NotFoundException('password must match repassword');
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(rp.password, salt);
    const decodedJwtAccessToken = await this.jwtService.decode(token);
    const user = await this.userService.getByEmail(decodedJwtAccessToken['email']);
    if (user === null) throw new NotFoundException('Email not found');
    await this.userRepository.update(user.id, password);
    const userUpdate = await this.userService.findOne(user.id);
    console.log(userUpdate);
    return await this.generateToken(userUpdate);
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
      const userdate = {
        email: user.email,
        fullname: user.name,
      }

      const userNew = await this.userRepository.create(userdate);
      const accessToken = await this.generateToken(userNew);
      return {
        accessToken,
        user: userNew,
        message: 'login1 google successfully',
      }

    }
    const accessToken = await this.generateToken(userFound);
    return {
      accessToken,
      user: userFound,
      message: 'login2 google successfully',
    };
  }

}
