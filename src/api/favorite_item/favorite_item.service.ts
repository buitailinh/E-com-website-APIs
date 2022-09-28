import { Injectable } from '@nestjs/common';
import { CreateFavoriteItemDto } from './dto/create-favorite_item.dto';
import { UpdateFavoriteItemDto } from './dto/update-favorite_item.dto';

@Injectable()
export class FavoriteItemService {
  create(createFavoriteItemDto: CreateFavoriteItemDto) {
    return 'This action adds a new favoriteItem';
  }

  findAll() {
    return `This action returns all favoriteItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteItem`;
  }

  update(id: number, updateFavoriteItemDto: UpdateFavoriteItemDto) {
    return `This action updates a #${id} favoriteItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteItem`;
  }
}
