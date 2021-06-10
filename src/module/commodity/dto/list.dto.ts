import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty({ description: '分页页码' })
  @IsNotEmpty({ message: '必须传入分页参数' })
  pageNum: number;

  @ApiProperty({ description: '分页大小' })
  @IsNotEmpty({ message: '必须传入每页显示多少条' })
  pageSize: number;
}
