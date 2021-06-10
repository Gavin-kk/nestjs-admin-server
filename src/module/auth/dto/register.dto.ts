import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../../entities/Users';

export class RegisterDto extends Users {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不得为空' })
  password: string;

  @ApiProperty({ description: '手机号' })
  phone: number;

  @ApiProperty({ description: 'email' })
  email: string;
}
