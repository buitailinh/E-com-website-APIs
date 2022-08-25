import { UsersModule } from './../users/users.module';
import { ItemsModule } from './../items/items.module';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { imageProvider } from './images.provider';
import { forwardRef, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { ImageRepository } from './images.repository';

@Module({
  imports: [DatabaseModule, ItemsModule, UsersModule

    // forwardRef(() => ItemsModule)
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImageRepository, ...imageProvider],
  exports: [ImagesService, ImageRepository]
})
export class ImagesModule { }
