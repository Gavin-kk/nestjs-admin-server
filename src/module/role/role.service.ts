import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/Role';
import { Repository } from 'typeorm';
import moment from 'moment';
import { Users } from '../entities/Users';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAllRole() {
    return this.roleRepository.find();
  }

  async getOneRole(id: number) {
    return this.roleRepository.findOne(id);
  }

  async saveRole(addRoleDto: AddRoleDto, user: Users) {
    const { roleName, menu, authTime, parentMenu } = addRoleDto;
    const { username } = user; // 授权人
    return await this.roleRepository
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          roleName,
          menu,
          parentMenu,
          authTime: authTime,
          authName: username,
        },
      ])
      .execute();
  }

  async updateRole(updateRoleDto: UpdateRoleDto, user: Users) {
    const { id } = updateRoleDto;
    const { username } = user; // 授权人
    updateRoleDto.authName = username;
    return await this.roleRepository
      .createQueryBuilder()
      .update(Role)
      .set(updateRoleDto)
      .where('id = :id', { id })
      .execute();
  }

  async search(content: string) {
    return this.roleRepository
      .createQueryBuilder()
      .select()
      .where('concat(role_name,auth_name) like :content', {
        content: `%${content}%`,
      })
      .getMany();
  }

  async deleteRole(id: number) {
    return this.roleRepository.delete({ id });
  }
}
