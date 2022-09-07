import { AppKey } from '../../share/common/app.key';
import { Item } from './../items/entities/item.entity';
import { query } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './images.repository';
import { Like } from 'typeorm';
import { Image } from './entities/image.entity'
AppKey
import * as  fs from 'fs';

@Injectable()
export class ImagesService {
  constructor(private readonly imageRepository: ImageRepository,
  ) { };

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';
    const data = await this.imageRepository.findAndOptions({
      where: { image: Like('%' + keyword + '%') },
      order: {
        image: query.order === "descend" ? 'DESC' : 'ASC',
      },
      take: take,
      skip: skip,
    });

    return this.imageRepository.paginateResponse(data, page, take);
  }

  async findOne(id: number) {
    const image = await this.imageRepository.findOneByCondition({
      where: { id, },
      relations: ['item']
    });
    if (!image) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.IMAGE.ERR_ID_NOT_VALID });

    return image;
  }

  async create(createImageDto: CreateImageDto, file: string, item: Item): Promise<Image> {
    const imageNew: any = {
      image: file,
      ...createImageDto,
    }
    item.images = [...item.images, imageNew];

    await item.save();

    return this.imageRepository.save(imageNew);
  }
  async update(id: number, updateImageDto: UpdateImageDto, item: Item, image?: string) {
    const imageFound = await this.findOne(id);
    if (image) {
      try {
        const link = `./images/items/${imageFound.image}`;
        fs.unlinkSync(link)
        console.log("Successfully deleted the file.")
      } catch (err) {
        throw err
      }
    }
    const update = {
      image: image,
      ...updateImageDto,
    }
    const imageUpdate = Object.assign(imageFound, update);
    item.images = [...item.images, imageUpdate];
    await item.save();
    await this.imageRepository.update(id, imageUpdate);
    return { message: ` Updated successfully  image ${id} with item ${item.id}` };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.imageRepository.delete(id);
    return { message: ` Removed successfully image ${id}` };
  }

}
