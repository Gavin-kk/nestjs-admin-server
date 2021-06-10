import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({ description: '要更新状态的商品的id' })
  @IsNotEmpty({ message: '请输入商品id' })
  productId: number;

  @ApiProperty({ description: '要更新的状态' })
  @IsNotEmpty({ message: '请输入产品状态' })
  status: string;
}
