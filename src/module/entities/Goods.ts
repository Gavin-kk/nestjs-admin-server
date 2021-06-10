import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassifyGoods } from './ClassifyGoods';

@Entity('goods', { schema: 'nest_admin' })
export class Goods {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @Column('varchar', { name: 'desc', nullable: true, length: 500 })
  desc: string | null;

  @Column('varchar', { name: 'price', nullable: true, length: 50 })
  price: string | null;

  @Column('text', { name: 'detail', nullable: true })
  detail: string | null;

  @Column({ type: 'simple-json', name: 'imgs', nullable: true })
  imgs: string[] | null;

  // @Column('varchar', { name: 'imgs', nullable: true, length: 500 })
  // imgs: string | null;

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

  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @OneToMany(() => ClassifyGoods, (classifyGoods) => classifyGoods.goods)
  classifyGoods: ClassifyGoods[];
}
