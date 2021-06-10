import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ListDto {
  @ApiProperty({ description: '一页多少条' })
  @IsNotEmpty({ message: 'pageSize是必须的' })
  pageSize: number;
  @ApiProperty({ description: '页码' })
  @IsNotEmpty({ message: 'pageNum是必须的' })
  pageNum: number;
}
