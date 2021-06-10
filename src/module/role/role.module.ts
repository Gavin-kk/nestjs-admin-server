import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/Role';
import { Users } from '../entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Users])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
