import { UsersModule } from './../../api/users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendmailService } from './sendmail.service';


@Module({
  imports: [UsersModule, MailerModule.forRoot({
    transport: {
      host: 'smtp.sendgrid.net',
      auth: {
        user: process.env.SEND_MAIL_USER,
        pass: process.env.SENDGRID_API_KEY,
      }
    }
  }),],
  providers: [SendmailService],
  exports: [SendmailService],
})
export class SendmailModule { }
