import { Classify } from '../../entities/Classify';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateClassifyDto extends Classify {
  @ApiProperty({ description: '要更新分类的id' })
  @IsNotEmpty({ message: 'parentId不可为空' })
  parentId: number;
  @IsNotEmpty({ message: '分类名不可为空' })
  @ApiProperty({ description: '分类名' })
  categoryName: string;
}
