import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { Users } from '../entities/Users';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SearchDto } from './dto/search.dto';
import { InfoDto } from './dto/info.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Controller('role')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('角色模块')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  @ApiOperation({ summary: '查询所有角色' })
  async getAllRole() {
    return this.roleService.getAllRole();
  }

  @Get('info')
  @ApiOperation({ summary: '通过id查询某一个角色' })
  async getOneRole(@Query() infoDto: InfoDto) {
    return this.roleService.getOneRole(infoDto.id);
  }

  @Post('add')
  @ApiOperation({ summary: '添加角色' })
  async addRole(@Body() addRoleDto: AddRoleDto, @CurrentUser() user: Users) {
    return this.roleService.saveRole(addRoleDto, user);
  }
  @Post('update')
  @ApiOperation({ summary: '更新角色' })
  async updateRole(
    @Body() updateRoleDto: UpdateRoleDto,
    @CurrentUser() user: Users,
  ) {
    return this.roleService.updateRole(updateRoleDto, user);
  }

  @Get('search')
  @ApiOperation({ summary: '搜索角色' })
  async searchRole(@Query() searchDto: SearchDto) {
    const { content } = searchDto;
    return this.roleService.search(content);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除角色' })
  async deleteRole(@Query() deleteRoleDto: DeleteRoleDto) {
    const { id } = deleteRoleDto;
    return this.roleService.deleteRole(id);
  }
}
