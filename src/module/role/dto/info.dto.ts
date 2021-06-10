import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InfoDto {
  @IsNotEmpty({ message: 'id不可为空' })
  @ApiProperty({ description: '通过此id获取角色信息' })
  id: number;
}
