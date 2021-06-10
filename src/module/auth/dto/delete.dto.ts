import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteDto {
  @ApiProperty({ description: '通过此id删除用户' })
  @IsNotEmpty({ message: 'id不可为空' })
  id: number;
}
