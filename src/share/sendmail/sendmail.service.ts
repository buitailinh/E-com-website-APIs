import { AppConst } from './../common/app.const';
import { AppKey } from './../common/app.key';
import { FlashSale } from './../../api/flash_sale/entities/flash_sale.entity';
import { UsersService } from './../../api/users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AppObject } from '../common/app.object';

@Injectable()
export class SendmailService {

  constructor(public mailerService: MailerService,
    private userService: UsersService,
  ) { };

  async sendVerifiedEmail(email: string, token: string) {
    this.mailerService.sendMail({
      to: `${email}`,
      from: 'linhbuitai@gmail.com',
      subject: 'verify email address your',
      text: 'abcdefghijklmnopqrstuvwxyz',
      html: `<html><h4>welcome to web shopp</h4> and link your account to:
       <a href=${process.env.BACKEND_HOST}/auth/verify-email?email=${email}&token=${token}>confirm Email</a> </html> `,
    })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async sendForgetPassword(email: string, OTP: string) {
    this.mailerService.sendMail({
      to: `${email}`,
      from: 'linhbuitai@gmail.com',
      subject: 'Forget password your',
      text: `OTP: ${OTP}`,
    })
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async sendNotification(flashsale: FlashSale) {
    const users = await this.userService.userRepository.find();
    const sendNotification = await users.map(user => {
      if (user.role === AppObject.USER_MODULE.ROLE.CLIENT) {
        this.mailerService.sendMail({
          to: `${user.email}`,
          from: 'linhbuitai@gmail.com',
          subject: 'Forget password your',
          text: `flash sale for ${user.email} is ${flashsale.nameSale}\n
              start: ${flashsale.timeStart} `,
        });
      }
    });
    await Promise.all(sendNotification);
  }



}
