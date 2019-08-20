import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '订单号',
    key: '订单号',
    dataIndex: 'code',
  },
  {
    title: '代理姓名',
    key: '代理姓名',
    dataIndex: 'agentName',
  },
  {
    title: '数目',
    key: '数目',
    dataIndex: 'goodsTypeCount',
  },
  {
    title: '商品数量',
    key: '商品数量',
    dataIndex: 'goodsCount',
  },
  {
    title: '总金额',
    key: '总金额',
    dataIndex: 'totalMoney',
  },
  {
    title: '实际支付金额',
    key: '实际支付金额',
    dataIndex: 'payPrice',
  },
  {
    title: '类型',
    dataIndex: 'sourceType',
    scopedSlots: {
      customRender: 'sourceType',
    }
  },
  {
    title: '状态',
    key: '状态',
    dataIndex: 'payStatus',
    scopedSlots: {
      customRender: 'status',
    },
  },
  {
    title: '订单日期',
    key: '订单日期',
    dataIndex: 'createTime',
  },
];
