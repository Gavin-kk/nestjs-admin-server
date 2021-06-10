import { IsNotEmpty } from 'class-validator';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ description: '搜索的内容' })
  @IsNotEmpty({ message: '搜索内容不可为空' })
  content: string;
}
