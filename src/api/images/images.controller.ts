import { ItemsService } from './../items/items.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './images.constant';
import { Image } from './entities/image.entity'
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../share/decorator/roles.decorator';
import { JwtAuthGuard } from '../../share/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../share/auth/guards/role.guard';
import { AppObject } from '../../share/common/app.object';

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
  @ApiQuery({})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @ApiOkResponse({ description: 'see file image' })
  @ApiBadRequestResponse({ description: 'not found' })
  @ApiParam({ name: 'image' })
  @Get('/images/:image')
  seeFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './images/items' });
  }

  @ApiCreatedResponse({
    type: Image,
    description: 'Create a new image object as response',
  })
  @ApiBadRequestResponse({
    description: 'Image cannot register. Try again!',
  })
  @ApiParam({ name: 'id' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
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
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'idItem', type: 'string' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
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
  @ApiParam({ name: 'id', type: 'string' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
