import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../../entities/Users';

export class UpdateDto extends Users {
  @IsNotEmpty({ message: '用户id不可为空' })
  @ApiProperty({ description: '通过此id来更新用户' })
  id: number;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '手机号' })
  phone: number;

  @ApiProperty({ description: 'email' })
  email: string;

  @ApiProperty({ description: '头像' })
  avatar: string;
}
