import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/Users';
import { Repository } from 'typeorm';
import { Interface } from 'readline';
import { Role } from '../../entities/Role';
import { UpdateDto } from './dto/update.dto';
import { RoleDto } from './dto/role.dto';

export interface IUserListRole extends Users {
  auth_name: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async saveUser(user: Users) {
    const { username } = user;
    // 检查数据库中是否存在该用户
    const userInfo = await this.userRepository.findOne({ username });
    if (userInfo) {
      throw new HttpException({ status: 400, msg: '用户已存在' }, 400);
    }
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException({ status: 400, msg: '未知错误' }, 400);
    }
  }

  async findOneUser(id: number) {
    const userInfo = await this.userRepository.findOne(id);
    console.log(userInfo);
    let role;
    if (userInfo.roleId) {
      role = await this.roleRepository.findOne(userInfo.roleId);
    }
    return {
      userInfo,
      role,
    };
  }

  async updateUser(user: UpdateDto) {
    const { id } = user;

    return await this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set(user)
      .where('id = :id', { id })
      .execute();
  }

  async findAllUser(): Promise<IUserListRole[]> {
    const result: IUserListRole[] = await this.userRepository.query(
      `select users.* ,role.auth_name,role.role_name 
         from users left join role on role.id = users.role_id`,
    );
    result.forEach((item) => {
      delete item.password;
    });

    return result;
  }

  async removeUser(id: number) {
    return await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where('id = :id', { id })
      .execute();
  }

  async searchUser(content: string): Promise<IUserListRole[]> {
    const result: IUserListRole[] = await this.userRepository.query(
      `select users.* ,role.auth_name,role.role_name 
         from users left join role on role.id = users.role_id 
         where concat(users.username,users.email,users.phone) like '%${content}%' `,
    );
    return result;
  }

  async assigningRoles(role: RoleDto) {
    const { id, roleId } = role;
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set({ roleId })
      .where('id = :id', { id })
      .execute();
  }

  async getRoleInfo(id: number) {
    return this.roleRepository.findOne(id);
  }
}
