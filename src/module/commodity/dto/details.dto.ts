import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DetailsDto {
  @IsNotEmpty({ message: '请输入id' })
  @ApiProperty({ description: '通过此id获取商品的详情' })
  id: number;
}
