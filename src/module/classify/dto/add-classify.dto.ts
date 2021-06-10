import { Classify } from '../../../entities/Classify';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddClassifyDto extends Classify {
  @ApiProperty({ description: '父级分类id 如果没有就是一级分类' })
  parentId: number;
  @IsNotEmpty({ message: '分类名不可为空' })
  @ApiProperty({ description: '分类名' })
  categoryName: string;
}
