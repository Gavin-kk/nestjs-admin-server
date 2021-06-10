import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleDto {
  @ApiProperty({ description: '通过此id来删除角色' })
  @IsNotEmpty({ message: 'id不可为空' })
  id: number;
}
