import { filterDto } from './../category/dto/filter.dto';
import { JwtAuthGuard } from 'src/share/auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './items.constant';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { Roles } from 'src/share/decorator/roles.decorator';
import { AppObject } from 'src/share/common/app.object';
import { RolesGuard } from 'src/share/auth/guards/role.guard';
import { ExportDataService } from './exportData.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService,
    private readonly exportDataService: ExportDataService
  ) { }


  @Get('exportgoogle')
  getGGS2() {
    return this.exportDataService.exportData();
  }

  @ApiOkResponse({
    description: 'List of items',
    type: Item
  })
  @ApiQuery({
    required: false,
    type: filterDto,
  })
  @Get()
  findAll(@Query() query) {
    return this.itemsService.findAll(query);
  }



  @ApiOkResponse({
    description: 'Information about an item',
    type: Item
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.getById(+id);
  }

  @ApiOkResponse({
    type: Item,
    description: 'Item details'
  })
  @ApiParam({ name: 'nameItem', type: 'string' })
  @Get('name/:nameItem')
  findByName(@Param('nameItem') nameItem: string) {
    return this.itemsService.getByName(nameItem);
  }

  @ApiCreatedResponse({
    type: Item,
    description: 'Create a new item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot register. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(@UploadedFile() image, @Body() createItemDto: CreateItemDto) {
    console.log(createItemDto);
    return this.itemsService.create(createItemDto, image?.filename);
  }

  @ApiOkResponse({
    type: Item,
    description: 'Add  quantity of item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot  add quantity. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: {
          type: 'number',
          minimum: 1,
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Post('addAmount/:id')
  addAmount(@Param('id') id: string, @Body('amount') amount: number) {
    return this.itemsService.addSLB(+id, amount);
  }

  @ApiOkResponse({
    description: 'See file Image of item',
  })
  @ApiParam({ name: 'image', type: 'string' })
  @Get('/images/:image')
  seeFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './images/itemMain' });
  }


  @ApiOkResponse({
    type: Item,
    description: 'Update image Item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot update image. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Patch('uploadfile/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updateImageMain(@Param('id') id: number, @UploadedFile('file') image,) {
    // console.log(id);
    return this.itemsService.updateImageMain(+id, image?.filename);
  }

  @ApiOkResponse({
    type: Item,
    description: 'Update item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot update. Try again!',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(@Param('id') id: number, @UploadedFile() image, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto, image?.filename);
  }


  @ApiOkResponse({
    description: 'Delete a item object as response',
  })
  @ApiBadRequestResponse({
    description: 'Item cannot delete. Try again!',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
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
  @ApiParam({ name: 'id', type: 'string' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Delete('/image/:id')
  removeFile(@Param('id') id: string) {
    return this.itemsService.removeFile(+id);
  }


}
