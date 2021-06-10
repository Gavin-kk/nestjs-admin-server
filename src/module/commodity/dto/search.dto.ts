import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchDto {
  @ApiProperty({ description: '页码' })
  @IsNotEmpty({ message: '页码是必传的' })
  pageNum: number;

  @ApiProperty({ description: '每页条目数' })
  @IsNotEmpty({ message: '每页条数是必传的' })
  pageSize: number;

  @ApiProperty({ description: '搜索商品的名称或描述' })
  @IsNotEmpty({ message: '请传入查询内容' })
  content: string | null;
}
