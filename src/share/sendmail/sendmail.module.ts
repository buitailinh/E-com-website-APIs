import { UsersModule } from './../../api/users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendmailService } from './sendmail.service';


@Module({
  imports: [UsersModule, MailerModule.forRoot({
    transport: {
      host: 'smtp.sendgrid.net',
      auth: {
        user: 'apikey',
        pass: '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',
      }
    }
  }),],
  providers: [SendmailService],
  exports: [SendmailService],
})
export class SendmailModule { }
