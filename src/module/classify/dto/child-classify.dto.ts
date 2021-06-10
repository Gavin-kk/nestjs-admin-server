import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChildClassifyDto {
  @ApiProperty({ description: '父分类的id' })
  @IsNotEmpty({ message: 'id是必须的' })
  id: number;
}
