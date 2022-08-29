import { Category } from './entities/category.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, Request, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { multerOptions } from './category.constant';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../share/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../share/auth/guards/role.guard';
import { AppObject } from '../../share/common/app.object';
import { Roles } from '../../share/decorator/roles.decorator';
import { filterDto } from './dto/filter.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOkResponse({
    type: Category,
    description: 'List category'
  })
  @ApiQuery({
    required: false,
    type: filterDto,
  })
  @Get()
  findAll(@Query() query) {
    console.log(query);
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
    description: 'Create a new category successfully',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot create. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file) {
    return this.categoryService.create(createCategoryDto, file?.filename);
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
  @ApiParam({ name: 'image', description: 'file image ', required: true })
  @Get('/images/:image')
  seeFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './images/Category' });

  }

  @ApiOkResponse({
    type: Category,
    description: 'Update category successfully',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot update. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiBody({
    type: UpdateCategoryDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Patch(':id')   //
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(@Param('id') id: string, @UploadedFile() image, @Body() updateCategoryDto: UpdateCategoryDto) {   // , 
    return this.categoryService.update(+id, updateCategoryDto, image?.filename);   // 
  }

  @ApiOkResponse({
    type: Category,
    description: 'Update image category successfully',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot update image. Try again!',
  })
  @ApiConsumes('multipart/form-data')
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
  @Patch('/image/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updateImage(@Param('id') id: number, @UploadedFile('file') image,) {
    return this.categoryService.updateImage(+id, image?.filename);
  }

  @ApiOkResponse({
    description: 'Delete a category successfully',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot delete. Try again!',
  })
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.categoryService.remove(+id);
  }

  @ApiOkResponse({
    type: Category,
    description: 'Delete image category successfully',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot delete image. Try again!',
  })
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Delete('/image/:id')
  removeFile(@Param('id') id: string) {
    return this.categoryService.removeFile(+id);
  }
}
