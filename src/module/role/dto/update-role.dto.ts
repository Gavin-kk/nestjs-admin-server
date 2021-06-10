import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Role } from '../../../entities/Role';

export class UpdateRoleDto extends Role {
  @ApiProperty({ description: '根据此id更新角色' })
  @IsNotEmpty({ message: 'id是必须的' })
  id: number;

  @ApiProperty({ description: '权限名称' })
  @IsNotEmpty({ message: '权限名称是必须的' })
  roleName: string;

  @ApiProperty({ description: '权限列表' })
  @IsNotEmpty({ message: '权限列表不可为空' })
  @IsArray({ message: 'menus必须为一个数组' })
  menu: string[];

  @ApiProperty({ description: '树形选择器父级的数组' })
  @IsNotEmpty({ message: '父级选择不可为空' })
  parentMenu: string[];

  @ApiProperty({ description: '本次授权的时间' })
  @IsNotEmpty({ message: '授权时间不可为空' })
  authTime: string;
}
