import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteDto {
  @ApiProperty({ description: '通过订单id删除订单' })
  @IsNotEmpty({ message: '订单id不可为空' })
  id: number;
}
