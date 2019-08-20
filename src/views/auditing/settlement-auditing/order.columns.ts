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
    title: '柜子编码',
    key: '柜子编码',
    dataIndex: 'machineCode',
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
    dataIndex: 'orderTotal',
  },
  {
    title: '收益',
    key: '收益',
    dataIndex: 'settlementPrice',
  },
  {
    title: '收益类型',
    key: '收益类型',
    dataIndex: 'source',
    scopedSlots: {
      customRender: 'source',
    },
  },
  {
    title: '订单号',
    key: '订单号',
    dataIndex: 'orderCode',
  },
  {
    title: '订单日期',
    key: '订单日期',
    dataIndex: 'orderCreateTime',
  },
];
