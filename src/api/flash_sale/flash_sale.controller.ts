import { addItem_FlashSaleDto } from './dto/addItemFS.dto';
import { FlashSale } from './entities/flash_sale.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FlashSaleService } from './flash_sale.service';
import { CreateFlashSaleDto } from './dto/create-flash_sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash_sale.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/share/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/share/auth/guards/role.guard';
import { AppObject } from 'src/share/common/app.object';
import { Roles } from 'src/share/decorator/roles.decorator';
import { filterDto } from '../category/dto/filter.dto';

@ApiTags('flash sale')
@ApiBearerAuth()
@Controller('flash-sale')
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) { }

  @ApiOkResponse({
    type: FlashSale,
    description: 'List Flash sale'
  })
  @ApiQuery({
    required: false,
    type: filterDto,
  })
  @Get()
  findAll(@Query() query) {
    return this.flashSaleService.findAll(query);
  }

  @ApiOkResponse({
    type: FlashSale,
    description: 'Information Flash sale'
  })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashSaleService.findOne(+id);
  }

  @ApiCreatedResponse({
    type: FlashSale,
    description: 'Create a new flash sale successfully',
  })
  @ApiBadRequestResponse({
    description: 'Flash sale cannot create. Try again!',
  })
  @ApiConsumes('multipart/form-data')

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Post()
  create(@Body() createFlashSaleDto: CreateFlashSaleDto) {
    return this.flashSaleService.create(createFlashSaleDto);
  }

  @ApiOkResponse({
    type: FlashSale,
    description: 'Update flash sale successfully',
  })
  @ApiBadRequestResponse({
    description: 'Flash sale cannot update. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlashSaleDto: UpdateFlashSaleDto,
  ) {
    return this.flashSaleService.update(+id, updateFlashSaleDto);
  }

  @ApiOkResponse({
    type: FlashSale,
    description: 'add item of flash sale successfully',
  })
  @ApiBadRequestResponse({
    description: 'Flash sale cannot add item. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string' })
  @Patch('add/:id')
  addItem(
    @Param('id') id: string,
    @Body() addItemFlashSaleDto: addItem_FlashSaleDto,
  ) {
    return this.flashSaleService.addItemFS(+id, addItemFlashSaleDto);
  }


  @ApiOkResponse({
    type: FlashSale,
    description: 'add item of flash sale successfully',
  })
  @ApiBadRequestResponse({
    description: 'Flash sale cannot add item. Try again!',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string' })
  @Delete('remove/:id/:idItem')
  removeItem(
    @Param('id') id: string,
    @Param('idItem') idItem: string
  ) {
    return this.flashSaleService.removeItemFS(+id, +idItem);
  }



  @ApiOkResponse({
    description: 'Delete category successfully',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot delete. Try again!',
  })
  @ApiParam({ name: 'id', type: 'string' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AppObject.USER_MODULE.ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashSaleService.remove(+id);
  }
}
