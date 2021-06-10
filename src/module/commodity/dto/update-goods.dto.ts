import { Goods } from '../../../entities/Goods';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGoodsDto extends Goods {
  @IsNotEmpty({ message: '商品名称不可为空' })
  @ApiProperty({ description: '商品名称' })
  name: string;

  @IsNotEmpty({ message: 'Id不可为空' })
  @ApiProperty({ description: '商品的id/要更新商品的id' })
  id: number;

  @ApiProperty({ description: '商品状态' })
  status: string | null;

  @ApiProperty({ description: '商品描述' })
  desc: string | null;

  @ApiProperty({ description: '商品价格' })
  price: string | null;

  @ApiProperty({ description: '商品详情' })
  detail: string | null;

  @ApiProperty({ description: '商品图片' })
  imgs: string[] | null;
}
