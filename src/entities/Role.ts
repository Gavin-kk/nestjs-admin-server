import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users';

@Entity('role', { schema: 'nest_admin' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'role_name', length: 30 })
  roleName: string;

  @Column('text', { name: 'auth_time' })
  authTime: string;

  @Column('varchar', { name: 'auth_name', length: 30 })
  authName: string;

  @Column('timestamp', {
    name: 'createAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date | null;

  @Column('timestamp', {
    name: 'updateAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date | null;

  @Column('simple-json', { name: 'menu', nullable: true })
  menu: string[] | null;
  @Column('simple-json', { name: 'parent_menu', nullable: true })
  parentMenu: string[] | null;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
