import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { JwtService } from '@nestjs/jwt';
import { UpdateDto } from './dto/update.dto';
import { Users } from '../../entities/Users';
import { GetiUserDto } from './dto/geti-user.dto';
import { DeleteDto } from './dto/delete.dto';
import { SearchDto } from './dto/search.dto';
import { RoleDto } from './dto/role.dto';

@Controller('auth')
@ApiTags('用户模块')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() RegisterDto: RegisterDto) {
    const user = await this.authService.saveUser(RegisterDto);
    delete user.password;
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto, @CurrentUser() user: LoginDto) {
    const { username, password } = user;
    // 颁发token
    const token = this.jwtService.sign(
      { username, password },
      {
        expiresIn: 60 * 60 * 24,
      },
    );
    delete user.password;
    return { user, token };
  }
  @Get('user')
  @ApiOperation({ summary: '通过id获取用户的信息' })
  async getOneUserInfo(@Query() userDto: GetiUserDto) {
    const { id } = userDto;
    return this.authService.findOneUser(id);
  }

  @Post('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新用户' })
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Body() updateDto: UpdateDto) {
    return await this.authService.updateUser(updateDto);
  }

  @Post('role')
  @ApiBearerAuth()
  @ApiOperation({ summary: '给用户分配角色' })
  @UseGuards(AuthGuard('jwt'))
  async assigningRoles(@Body() roleDot: RoleDto) {
    return await this.authService.assigningRoles(roleDot);
  }

  @Get('userlist')
  @ApiOperation({ summary: '获取所有用户列表 必须登录' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserList() {
    return await this.authService.findAllUser();
  }

  @Delete('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '删除用户 必须登录' })
  @ApiBearerAuth()
  deleteUser(@Query() deleteDto: DeleteDto) {
    const { id } = deleteDto;
    return this.authService.removeUser(id);
  }

  @Get('userinfo')
  @ApiOperation({ summary: '当前用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(@CurrentUser() user: Users) {
    const { id } = user;
    // user.role = await this.authService.getRoleInfo(id);
    delete user.password;
    return user;
  }

  @Get('search')
  @ApiOperation({ summary: '通过用户名|手机号|email来搜索用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  searchForUsers(@Query() searchDto: SearchDto) {
    const { content } = searchDto;
    return this.authService.searchUser(content);
  }
}
