import { DatabaseModule } from './config/database/database.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './share/middlewares/logger.middleware';
import { CategoryModule } from './api/category/category.module';
import { ItemsModule } from './api/items/items.module';
import { ImagesModule } from './api/images/images.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CategoryModule,
    ItemsModule,
    ImagesModule,],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
