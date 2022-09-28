import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './config/server.config';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import { JWT_CONFIG } from './config/constant.config';
import cookieParser from 'cookie-parser';

const configService = new ConfigService();
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appConfig(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true
      // },
    }),
  );
  // app.use(
  //   session({
  //     secret: process.env.JWT_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: +JWT_CONFIG.expiresIn }
  //   })
  // )
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.use(cookieParser());
  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();

