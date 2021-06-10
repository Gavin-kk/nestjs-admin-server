import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/Users';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../../entities/Role';

// 验证的token
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    } as StrategyOptions);
  }
  async validate({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    // 验证数据库中是否存在
    const user: Users = await this.userRepository.findOne({ username });
    if (user.roleId) {
      const role: Role = await this.roleRepository.findOne(user.roleId);
      if (role) {
        user.role = role;
      }
    }
    if (!user || password !== user.password) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, msg: '未经授权' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
