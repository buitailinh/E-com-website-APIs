import { MinioClientService } from './../../share/minio-client/minio-client.service';
import { BufferedFile } from 'src/share/minio-client/file.model';
import { AppKey } from './../../share/common/app.key';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { Injectable, Next, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Like } from 'typeorm';
import * as fs from 'fs';
import { from, map } from 'rxjs';
import { parse } from 'path';
import console from 'console';

@Injectable()
export class CategoryService {
  constructor(public categoryRepository: CategoryRepository,
    private minioClientService: MinioClientService,
  ) { };

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keywork = query.keywork || '';
    let active: boolean;
    if (query.active) {
      if (query.active === 'true')
        active = true;
      else { active = false; }
    }
    const data = await this.categoryRepository.findAndOptions({
      where: { nameCategory: Like('%' + keywork + '%'), active: active },
      order: {
        nameCategory: query.order,
      },
      take: take,
      skip: skip,
    });
    return this.categoryRepository.paginateResponse(data, page, take);
  }


  async getById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneByCondition({
      where: { id, },
      relations: ['items']
    });
    if (!category) throw new NotFoundException(AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST);

    return category;
  }

  async getByName(nameCategory: string): Promise<Category> {
    const category = await this.categoryRepository.findOneByCondition({
      where: {
        nameCategory,
      },
      // relations: ['items']
    });
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });

    return category;
  }

  async create(createCatogoryDto: CreateCategoryDto, file?: BufferedFile): Promise<Category> {
    const { nameCategory, ...data } = createCatogoryDto;
    let image;
    const category = await this.categoryRepository.findOneByCondition({
      where: { nameCategory }
    });
    if (category) throw new NotFoundException(AppKey.ERROR_MESSAGE.CATEGORY.ERR_EXIST);
    if (file) image = (await this.minioClientService.upload(file)).url;
    const categoryNew = {
      nameCategory,
      banner: image,
      ...data
    }

    return this.categoryRepository.save(categoryNew);
  }

  async findImageById(id: number) {
    return from(this.categoryRepository.findOne({ id })).pipe(
      map((category) => {
        return category.banner;
      }),
    )
  }

  async updateImage(id: number, banner: string) {
    const category = this.findImageById(id);
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    const categoryUpdate = Object.assign(category, banner);
    return this.categoryRepository.update(id, categoryUpdate);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image?: BufferedFile) {   // 
    const category = this.getById(id);
    let file;
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    if (image) {
      await this.removeFile(id);
      file = (await this.minioClientService.upload(image)).url;
      // console.log(file);
    }
    const CategoryFeld = {
      banner: file,     //
      ...updateCategoryDto,
    }

    console.log(CategoryFeld);
    const categoryUpdate = Object.assign(category, CategoryFeld);
    await this.categoryRepository.update(id, categoryUpdate);
    return { message: `update successfully ${id}` };

  }

  async remove(id: number) {
    const category = await this.getById(id);
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    await this.removeFile(id);
    await this.categoryRepository.delete(id);
    return { message: `This action removes a #${id} category` };
  };


  async removeFile(id: number) {
    const category = await this.getById(id);
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    try {
      await this.minioClientService.delete(category.banner.replace('localhost:9000/photos/', ''));
      console.log("Successfully deleted the file.")
    } catch (err) {
      throw err
    }
    const bannerUpdate = {
      banner: null,
    }
    const categoryUpdate = Object.assign(category, bannerUpdate);
    // console.log(categoryUpdate);
    await this.categoryRepository.save(categoryUpdate);
    // return category;
  }
}
