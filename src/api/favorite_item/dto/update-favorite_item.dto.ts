import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteItemDto } from './create-favorite_item.dto';

export class UpdateFavoriteItemDto extends PartialType(CreateFavoriteItemDto) {}
