import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/Order';
import { OrderGoods } from '../../entities/OrderGoods';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderGoods])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
