import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetiUserDto {
  @ApiProperty({ description: '通过此id获取用户信息' })
  @IsNotEmpty({ message: 'id是必须的哦' })
  id: number;
}
