import { Module } from '@nestjs/common';
import { CommodityController } from './commodity.controller';
import { CommodityService } from './commodity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from '../../entities/Goods';
import { ClassifyGoods } from '../../entities/ClassifyGoods';
import { Classify } from '../../entities/Classify';

@Module({
  imports: [TypeOrmModule.forFeature([Goods, ClassifyGoods, Classify])],
  controllers: [CommodityController],
  providers: [CommodityService],
})
export class CommodityModule {}
