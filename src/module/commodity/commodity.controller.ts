import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { CommodityService, PaginationType } from './commodity.service';
import { AddGoodsDto } from './dto/add-goods.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoodsPipe } from './goods.pipe';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ListDto } from './dto/list.dto';
import { SearchDto } from './dto/search.dto';
import { InsertResult, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { Goods } from '../../entities/Goods';
import { AllGoodsDto } from './dto/all-goods.dto';
import { PaginationDto } from './dto/pagination.dto';
import { DetailsDto } from './dto/details.dto';

@Controller('commodity')
@ApiTags('商品模块')
@UseGuards(AuthGuard('jwt'))
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Get('list')
  @ApiOperation({ summary: '查询分页的商品数据' })
  async getProductList(@Query() getListDto: ListDto): Promise<PaginationType> {
    return this.commodityService.findAllGoods(getListDto);
  }

  @Get('goods')
  @ApiOperation({ summary: '查询所有商品的数据和商品所属的分类' })
  async getAllGoodsAndClassify(@Query() paginationDto: PaginationDto) {
    return this.commodityService.getGoodsAndClassify(paginationDto);
  }

  @Get('detail')
  @ApiOperation({ summary: '根据id查询商品详情' })
  async getDetail(@Query() detailDto: DetailsDto) {
    const { id } = detailDto;
    return this.commodityService.getProductDetails(id);
  }

  @Post('add')
  @ApiOperation({ summary: '添加商品' })
  async add(
    @Body(new GoodsPipe()) addGoodsDto: AddGoodsDto,
  ): Promise<{ save: AddGoodsDto & Goods; saveRelationship: InsertResult }> {
    return this.commodityService.addGoods(addGoodsDto);
  }

  @Put('update/status')
  @ApiOperation({ summary: '更新商品状态 status 参数可选: 下架 | 在售' })
  async updateStatus(
    @Body(new GoodsPipe()) statusDto: UpdateStatusDto,
  ): Promise<UpdateResult> {
    return this.commodityService.updateStatus(statusDto);
  }

  @Put('update')
  @ApiOperation({ summary: '更新商品' })
  async update(@Body() updateGoodsDto: UpdateGoodsDto): Promise<UpdateResult> {
    return this.commodityService.updateGoods(updateGoodsDto);
  }

  @Get('search')
  @ApiOperation({ description: '搜索商品接口' })
  async search(
    @Query() searchDto: SearchDto,
  ): Promise<SelectQueryBuilder<Goods[]>> {
    return this.commodityService.search(searchDto);
  }
}
