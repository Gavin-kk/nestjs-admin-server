import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DetailDto {
  @ApiProperty({ description: '通过订单id 获取订单的详情' })
  @IsNotEmpty({ message: '订单id不可为空' })
  id: number;
}
