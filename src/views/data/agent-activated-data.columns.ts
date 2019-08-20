import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '订单号',
    dataIndex: 'orderCode',
  },
  {
    title: '代理',
    dataIndex: 'agentName',
  },
  {
    title: '套餐名称',
    dataIndex: 'comboName',
  },
  {
    title: '类型',
    dataIndex: 'comboType',
    scopedSlots: {
      customRender: 'type',
    },
  },
  {
    title: '金额',
    dataIndex: 'totalMoney',
  },
  {
    title: '日期',
    dataIndex: 'createDate',
  },
];
