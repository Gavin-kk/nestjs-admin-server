import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Classify } from './Classify';
import { Goods } from './Goods';

@Index('p_classify_id', ['pClassifyId'], {})
@Index('goods_id', ['goodsId'], {})
@Entity('classify_goods', { schema: 'nest_admin' })
export class ClassifyGoods {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'p_classify_id' })
  pClassifyId: number;

  @Column('int', { name: 'goods_id' })
  goodsId: number;

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

  @ManyToOne(() => Classify, (classify) => classify.classifyGoods, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'p_classify_id', referencedColumnName: 'id' }])
  pClassify: Classify;

  @ManyToOne(() => Goods, (goods) => goods.classifyGoods, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'goods_id', referencedColumnName: 'id' }])
  goods: Goods;
}
