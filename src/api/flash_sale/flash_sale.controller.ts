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
} from '@nestjs/common';
import { FlashSaleService } from './flash_sale.service';
import { CreateFlashSaleDto } from './dto/create-flash_sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash_sale.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('flash sale')
@Controller('flash-sale')
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) { }

  @ApiOkResponse({
    type: FlashSale,
    description: 'List Flash sale'
  })
  @Get()
  findAll(@Query() query) {
    return this.flashSaleService.findAll(query);
  }

  @ApiOkResponse({
    type: FlashSale,
    description: 'Information Flash sale'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashSaleService.findOne(+id);
  }

  @ApiOkResponse({
    type: FlashSale,
    description: 'Create a new flash sale successfully',
  })
  @ApiBadRequestResponse({
    description: 'Flash sale cannot create. Try again!',
  })
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
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlashSaleDto: UpdateFlashSaleDto,
  ) {
    return this.flashSaleService.update(+id, updateFlashSaleDto);
  }

  @ApiOkResponse({
    description: 'Delete category successfully',
  })
  @ApiBadRequestResponse({
    description: 'Category cannot delete. Try again!',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashSaleService.remove(+id);
  }
}
