import { RolesGuard } from './share/auth/guards/role.guard';
import { DatabaseModule } from './config/database/database.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './share/middlewares/logger.middleware';
import { CategoryModule } from './api/category/category.module';
import { ItemsModule } from './api/items/items.module';
import { ImagesModule } from './api/images/images.module';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './share/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';



@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CategoryModule,
    ItemsModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        }
      }
    })
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
