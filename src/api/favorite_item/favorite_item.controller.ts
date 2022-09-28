import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteItemService } from './favorite_item.service';
import { CreateFavoriteItemDto } from './dto/create-favorite_item.dto';
import { UpdateFavoriteItemDto } from './dto/update-favorite_item.dto';

@Controller('favorite-item')
export class FavoriteItemController {
  constructor(private readonly favoriteItemService: FavoriteItemService) {}

  @Post()
  create(@Body() createFavoriteItemDto: CreateFavoriteItemDto) {
    return this.favoriteItemService.create(createFavoriteItemDto);
  }

  @Get()
  findAll() {
    return this.favoriteItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteItemDto: UpdateFavoriteItemDto) {
    return this.favoriteItemService.update(+id, updateFavoriteItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteItemService.remove(+id);
  }
}
