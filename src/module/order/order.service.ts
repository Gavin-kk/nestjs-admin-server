import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { OrderGoods } from '../entities/OrderGoods';
import { ChangeDto } from './dto/change.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderGoods)
    private readonly orderGoodsRepository: Repository<OrderGoods>,
  ) {}

  async getOrderList() {
    return this.orderRepository.find();
  }

  async getOrderDetail(id: number) {
    const order: Order = await this.orderRepository.findOne(id);
    order.goods = await this.orderGoodsRepository.find({ orderId: id });
    return order;
  }

  async changeOrderState(changeDto: ChangeDto) {
    const { id } = changeDto;
    return this.orderRepository
      .createQueryBuilder()
      .update()
      .set(changeDto)
      .where('id = :id', { id })
      .execute();
  }

  async deleteOrder(id: number) {
    await this.orderGoodsRepository.delete({ orderId: id });
    return this.orderRepository.delete({ orderId: id });
  }

  async searchOrder(order_number?: string) {
    if (order_number) {
      return this.orderRepository.findOne({ orderNumber: order_number });
    }
    return null;
  }
}
