import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ description: '通过此内容查询用户' })
  @IsNotEmpty({ message: '搜索内容是必须的' })
  content: string;
}
