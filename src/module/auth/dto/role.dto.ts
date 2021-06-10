import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ description: '用户的id,被分配权限的用户' })
  @IsNotEmpty({ message: '用户id不可为空' })
  id: number;
  @ApiProperty({ description: '角色的id' })
  @IsNotEmpty({ message: '角色id不可为空' })
  roleId: number;
}
