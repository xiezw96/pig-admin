import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    width: 180,
    title: '商品',
    key: '商品',
    dataIndex: 'goodsAttId',
    scopedSlots: {
      customRender: 'image',
    },
  },
  {
    width: 300,
    title: '商品名称',
    key: '商品名称',
    scopedSlots: {
      customRender: 'name',
    },
  },
  {
    title: '柜子名称',
    key: '柜子名称',
    dataIndex: 'machineName',
  },
  {
    title: '购买数量',
    key: '购买数量',
    dataIndex: 'payNum',
  },
  {
    title: '订单总价',
    key: '订单总价',
    dataIndex: 'orderTotalMoney',
  },
  {
    title: '支付方式',
    key: '支付方式',
    dataIndex: 'payWay',
    scopedSlots: {
      customRender: 'payway',
    },
  },
  {
    title: '买家帐号',
    key: '买家帐号',
    dataIndex: 'creatorName',
  },
  {
    title: '柜子归属',
    key: '柜子归属',
    dataIndex: 'belongsUser',
    width: 100
  },
  {
    title: '订单号',
    key: '订单号',
    dataIndex: 'orderCode',
    width: 250
  },
  {
    title: '订单日期',
    key: '订单日期',
    dataIndex: 'orderCreateTime',
    width: 180
  },
];
