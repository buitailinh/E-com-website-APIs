import { CategoryRepository } from './category.repository';
import { DatabaseModule } from './../../config/database/database.module';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProvider } from './category.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, ...categoryProvider],
  exports: [CategoryService, CategoryRepository]
})
export class CategoryModule { }
