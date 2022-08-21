import { Item_FlashSale } from './../flash_sale/dto/create-flash_sale.dto';
import { FlashSaleService } from './../flash_sale/flash_sale.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ItemFlashsaleService } from './item_flashsale.service';
import { CreateItemFlashsaleDto } from './dto/create-item_flashsale.dto';
import { UpdateItemFlashsaleDto } from './dto/update-item_flashsale.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Item flash sale')
@Controller('item-flashsale')
export class ItemFlashsaleController {
  constructor(private readonly itemFlashsaleService: ItemFlashsaleService,
  ) { }

  @ApiOkResponse({
    type: Item_FlashSale,
    description: 'List item flash sale',
  })
  @Get()
  findAll() {
    return this.itemFlashsaleService.findAll();
  }

  @ApiOkResponse({
    type: Item_FlashSale,
    description: 'Information item flash sale',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemFlashsaleService.findOne(+id);
  }

  // @Post(':id')
  // async create(@Body() createItemFlashsaleDto: CreateItemFlashsaleDto, @Param('id') id: string) {
  //   const flashSale = await this.flashSaleService.findOne(+id);
  //   if (flashSale === null) throw new NotFoundException({ message: ' id flash sale not defined' });
  //   return this.itemFlashsaleService.create(createItemFlashsaleDto, flashSale);
  // }

  @ApiOkResponse({
    type: Item_FlashSale,
    description: 'Update item flash sale successfully',
  })
  @ApiBadRequestResponse({
    description: 'Item flash sale cannot update. Try again!',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemFlashsaleDto: UpdateItemFlashsaleDto) {
    return this.itemFlashsaleService.update(+id, updateItemFlashsaleDto);
  }

  @ApiOkResponse({
    description: 'Delete a item flash sale successfully',
  })
  @ApiBadRequestResponse({
    description: 'Item flash sale cannot delete. Try again!',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemFlashsaleService.remove(+id);
  }
}
