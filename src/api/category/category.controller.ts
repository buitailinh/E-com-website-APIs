import { Category } from './entities/category.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, Request, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { multerOptions } from './category.constant';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOkResponse({
    type: Category,
    description: 'List item of page'
  })
  @Get()
  findAll(@Query() query) {
    return this.categoryService.findAll(query);
  }

  @ApiOkResponse({
    type: Category,
    description: 'information about item'
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoryService.getById(+id);
  }


  @ApiOkResponse({
    type: Category,
    description: 'Create a new category object as response',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot register. Try again!',
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(@UploadedFile() image, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto, image?.filename);
  }

  // @UseGuards(JwtGuard)

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  // async upload(@UploadedFile() file) {
  //   console.log(file)
  //   return file;
  // }

  @ApiOkResponse({ description: 'see file image' })
  @ApiBadRequestResponse({ description: 'not found' })
  @Get('/images/:image')
  seeFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './images/Category' });

  }

  @ApiOkResponse({
    type: Category,
    description: 'Update category object as response',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot update. Try again!',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(@Param('id') id: number, @UploadedFile() image, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto, image?.filename);
  }

  @ApiOkResponse({
    type: Category,
    description: 'Update image category object as response',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot update image. Try again!',
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updateImage(@Param('id') id: number, @UploadedFile() image,) {
    return this.categoryService.updateImage(+id, image?.filename);
  }

  @ApiOkResponse({
    description: 'Delete a category object as response',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot delete. Try again!',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.categoryService.remove(+id);
  }

  @ApiOkResponse({
    type: Category,
    description: 'Delete image category object as response',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot delete image. Try again!',
  })
  @Delete('/image/:id')
  removeFile(@Param('id') id: string) {
    return this.categoryService.removeFile(+id);
  }
}
