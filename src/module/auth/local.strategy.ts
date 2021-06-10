import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
// 登录时使用
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    // 查找用户有没有这个人
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new HttpException({ status: 400, msg: '用户不存在' }, 400);
    }
    // 验证密码是否正确
    if (!compareSync(password, user.password)) {
      throw new HttpException({ status: 400, msg: '用户名或密码错误' }, 400);
    }
    return user;
  }
}
