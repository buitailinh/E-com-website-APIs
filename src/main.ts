import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './config/server.config';

const configService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appConfig(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true
      // },
    }),
  );

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
