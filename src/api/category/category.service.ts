import { AppKey } from './../../share/common/app.key';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { Injectable, Next, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Like } from 'typeorm';
import * as fs from 'fs';
import { from, map } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository,) { };

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';

    const data = await this.categoryRepository.findAndOptions({
      where: { nameCategory: Like('%' + keyword + '%') },
      order: {
        nameCategory: query.order === "descend" ? 'DESC' : 'ASC',
      },
      take: take,
      skip: skip,
    });

    return await this.categoryRepository.paginateResponse(data, page, take);
  }

  async getById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneByCondition({
      where: {
        id,
      }
    });
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });

    return category;
  }

  async getByName(nameCategory: string): Promise<Category> {
    const category = await this.categoryRepository.findOneByCondition({
      where: {
        nameCategory,
      }
    });
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });

    return category;
  }

  async create(createCatogoryDto: CreateCategoryDto, file?: string): Promise<Category> {
    const { nameCategory, ...data } = createCatogoryDto;
    const category = await this.categoryRepository.findOneByCondition({
      where: { nameCategory }
    });
    if (category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_EXIST });
    const categoryNew = {
      nameCategory,
      image: file,
      ...data
    }

    return await this.categoryRepository.save(categoryNew);
  }

  async findImageById(id: number) {
    return from(this.categoryRepository.findOne({ id })).pipe(
      map((category) => {
        return category.image;
      }),
    )
  }

  async updateImage(id: number, image: string) {
    const category = this.findImageById(id);
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    const categoryUpdate = Object.assign(category, image);
    return await this.categoryRepository.update(id, categoryUpdate);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image: string) {
    const category = this.getById(id);
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    const CategoryFeld = {
      image,
      ...updateCategoryDto,
    }
    const categoryUpdate = Object.assign(category, CategoryFeld);
    await this.categoryRepository.update(id, categoryUpdate);
    return { message: `update successfully ${id}` };

  }

  async remove(id: number) {
    const category = await this.getById(id);
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    await this.categoryRepository.delete(id);
    return { message: `This action removes a #${id} category` };
  }
  async removeFile(id: number) {
    const category = await this.getById(id);
    if (!category) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.CATEGORY.ERR_NOT_EXIST });
    try {
      const link = `./images/${category.image}`;
      fs.unlinkSync(link)
      console.log("Successfully deleted the file.")
    } catch (err) {
      throw err
    }
    const imageUpdate = {
      image: null,
    }
    const categoryUpdate = Object.assign(category, imageUpdate);
    await this.categoryRepository.update(id, categoryUpdate);
    return category;
  }
}
