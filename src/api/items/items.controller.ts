import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './items.constant';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @ApiOkResponse({ type: Item })
  @Get()
  findAll(@Query() query) {
    return this.itemsService.findAll(query);
  }

  @ApiOkResponse({ type: Item })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.getById(+id);
  }

  @ApiOkResponse({ type: Item })
  @ApiParam({ name: 'nameItem' })
  @Get(':nameItem')
  findByName(@Param('nameItem') nameItem: string) {
    return this.itemsService.getByName(nameItem);
  }

  @ApiOkResponse({
    type: Item,
    description: 'Create a new item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot register. Try again!',
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(@UploadedFile() image, @Body() createItemDto: CreateItemDto) {
    console.log(createItemDto);
    return this.itemsService.create(createItemDto, image?.filename);
  }


  @Get('/images/:image')
  seeFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './images/itemMain' });
  }


  @ApiOkResponse({
    type: Item,
    description: 'Update item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot update. Try again!',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(@Param('id') id: number, @UploadedFile() image, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto, image?.filename);
  }

  @ApiOkResponse({
    type: Item,
    description: 'Update image Item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot update image. Try again!',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updateImageMain(@Param('id') id: number, @UploadedFile() image,) {
    return this.itemsService.updateImageMain(+id, image?.filename);
  }

  @ApiOkResponse({
    description: 'Delete a item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot delete. Try again!',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }


  @ApiOkResponse({
    type: Item,
    description: 'Delete image item object as response',
  })
  @ApiBadGatewayResponse({
    description: 'Item cannot delete image. Try again!',
  })
  @Delete('/image/:id')
  removeFile(@Param('id') id: string) {
    return this.itemsService.removeFile(+id);
  }
}
