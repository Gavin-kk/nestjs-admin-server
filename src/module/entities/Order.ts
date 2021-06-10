import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('order_number', ['orderNumber'], { unique: true })
@Entity('order', { schema: 'nest_admin' })
export class Order {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'order_id',
    comment: '主键id',
    unsigned: true,
  })
  orderId: number;

  @Column('mediumint', {
    name: 'user_id',
    comment: '下订单会员id',
    unsigned: true,
  })
  userId: number;

  @Column('varchar', {
    name: 'order_number',
    unique: true,
    comment: '订单编号',
    length: 32,
  })
  orderNumber: string;

  @Column('decimal', {
    name: 'order_price',
    comment: '订单总金额',
    precision: 10,
    scale: 2,
    default: '0.00',
  })
  orderPrice: string;

  @Column('enum', {
    name: 'order_pay',
    comment: '支付方式  0未支付 1支付宝  2微信  3银行卡',
    enum: ['0', '1', '2', '3'],
    default: '1',
  })
  orderPay: '0' | '1' | '2' | '3';

  @Column('enum', {
    name: 'is_send',
    comment: '订单是否已经发货',
    enum: ['是', '否'],
    default: '否',
  })
  isSend: '是' | '否';

  @Column('varchar', {
    name: 'trade_no',
    comment: '支付宝交易流水号码',
    length: 32,
  })
  tradeNo: string;

  @Column('enum', {
    name: 'order_fapiao_title',
    comment: '发票抬头 个人 公司',
    enum: ['个人', '公司'],
    default: '个人',
  })
  orderFapiaoTitle: '个人' | '公司';

  @Column('varchar', {
    name: 'order_fapiao_company',
    comment: '公司名称',
    length: 32,
  })
  orderFapiaoCompany: string;

  @Column('varchar', {
    name: 'order_fapiao_content',
    comment: '发票内容',
    length: 32,
  })
  orderFapiaoContent: string;

  @Column('text', { name: 'consignee_addr', comment: 'consignee收货人地址' })
  consigneeAddr: string;

  @Column('enum', {
    name: 'pay_status',
    comment: '订单状态： 0未付款、1已付款',
    enum: ['0', '1'],
    default: '0',
  })
  payStatus: '0' | '1';

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

  goods: any[];
}
