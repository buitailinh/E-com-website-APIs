import { ItemsService } from './../items/items.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './images.constant';
import { Image } from './entities/image.entity'
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService,
    private readonly itemsService: ItemsService,
  ) { }

  @ApiOkResponse({
    type: Image,
    description: 'List images  of items',
  })
  @Get()
  findAll(@Query() query) {
    return this.imagesService.findAll(query);
  }

  @ApiOkResponse({
    type: Image,
    description: 'Name file anh information'
  })
  @ApiBadRequestResponse({
    description: 'Image not found',
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @ApiOkResponse({ description: 'see file image' })
  @ApiBadRequestResponse({ description: 'not found' })
  @Get('/images/:image')
  seeFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './images/items' });
  }

  @ApiOkResponse({
    type: Image,
    description: 'Create a new image object as response',
  })
  @ApiBadRequestResponse({
    description: 'Image cannot register. Try again!',
  })
  @ApiParam({ name: 'id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@UploadedFile() image, @Body() createImageDto: CreateImageDto, @Param('id') id: string) {
    const item = await this.itemsService.getById(+id)
    return await this.imagesService.create(createImageDto, image.filename, item);
  }

  @ApiOkResponse({
    type: Image,
    description: 'Update image object as response',
  })
  @ApiBadRequestResponse({
    description: 'Image cannot update. Try again!',
  })
  @Patch(':id/:idItem')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(@Param('id') id: string, @Param('idItem') idItem: string, @Body() updateImageDto: UpdateImageDto, @UploadedFile() image) {
    const item = await this.itemsService.getById(+idItem);
    return this.imagesService.update(+id, updateImageDto, item, image?.filename);
  }

  @ApiOkResponse({
    description: 'Delete a image object as response',
  })
  @ApiBadRequestResponse({
    description: 'Image cannot delete. Try again!',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
