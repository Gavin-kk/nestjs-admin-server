import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../entities/Order';

export class ChangeDto extends Order {
  @ApiProperty({ description: '订单id 不能为空' })
  @IsNotEmpty({ message: '订单id不可为空' })
  id: number;

  @ApiProperty({
    description: '订单是否发货 1:已经发货, 0:未发货',
    required: false,
  })
  is_send: number;

  @ApiProperty({
    description: '订单支付 支付方式: 0:未支付 1:支付宝 2:微信 3:银行卡',
    required: false,
  })
  order_pay: number;

  @ApiProperty({ description: '订单价格', required: false })
  order_price: number;

  @ApiProperty({ description: '订单数量', required: false })
  order_number: number;

  @ApiProperty({ description: '支付状态 0:未支付 1:已付款', required: false })
  pay_status: number;
}
