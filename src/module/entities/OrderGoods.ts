import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('goods_id', ['goodsId'], {})
@Index('order_id', ['orderId'], {})
@Entity('order_goods', { schema: 'nest_admin' })
export class OrderGoods {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
    unsigned: true,
  })
  id: number;

  @Column('int', { name: 'order_id', comment: '订单id', unsigned: true })
  orderId: number;

  @Column('mediumint', { name: 'goods_id', comment: '商品id', unsigned: true })
  goodsId: number;

  @Column('decimal', {
    name: 'goods_price',
    comment: '商品单价',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  goodsPrice: string;

  @Column('tinyint', {
    name: 'goods_number',
    comment: '购买单个商品数量',
    default: 1,
  })
  goodsNumber: number;

  @Column('decimal', {
    name: 'goods_total_price',
    comment: '商品小计价格',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  goodsTotalPrice: string;

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
}
