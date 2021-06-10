import { Goods } from '../../entities/Goods';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddGoodsDto extends Goods {
  @IsNotEmpty({ message: '商品名称不可为空' })
  @ApiProperty({ description: '商品名称' })
  name: string;

  @IsNotEmpty({ message: '分类id不可为空' })
  @ApiProperty({ description: '分类id/属于哪个分类' })
  classifyId: number;

  @IsNotEmpty({ message: '商品状态不可为空' })
  @ApiProperty({ description: '商品状态' })
  status: string;

  @ApiProperty({ description: '商品描述' })
  desc: string | null;

  @ApiProperty({ description: '商品价格' })
  price: string | null;

  @ApiProperty({ description: '商品详情' })
  detail: string | null;

  @ApiProperty({ description: '商品图片' })
  imgs: string[] | null;
}
