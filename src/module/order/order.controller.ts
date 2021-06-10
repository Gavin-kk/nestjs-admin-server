import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangeDto } from './dto/change.dto';
import { DetailDto } from './dto/detail.dto';
import { DeleteDto } from './dto/delete.dto';

@ApiTags('订单模块')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  @ApiOperation({ summary: '获取所有订单' })
  async getOrderList() {
    return this.orderService.getOrderList();
  }

  @Get('detail')
  @ApiOperation({ summary: '获取订单详情' })
  async getOrderDetail(@Query() detailDto: DetailDto) {
    const { id } = detailDto;
    return this.orderService.getOrderDetail(id);
  }

  @Post('change')
  @ApiOperation({
    summary: '修改订单状态',
    description: '可以通过订单id 修改是否发货 订单是否支付 订单价格 支付状态',
  })
  async changeOrderState(@Body() changeDto: ChangeDto) {
    return this.orderService.changeOrderState(changeDto);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除订单' })
  async deleteOrder(@Query() deleteDto: DeleteDto) {
    const { id } = deleteDto;
    return this.orderService.deleteOrder(id);
  }

  @Get('search')
  @ApiOperation({ summary: '通过订单编号搜索订单' })
  async searchOrder(@Query('order_number') order_number: string | undefined) {
    return this.orderService.searchOrder(order_number);
  }
}
