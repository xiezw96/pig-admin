import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '设备型号',
    dataIndex: 'spec',
  },
  {
    title: '货道数量',
    dataIndex: 'aisleCount',
  },
  {
    title: '采购价',
    dataIndex: 'tradePrice',
  },
  {
    title: '操作人',
    dataIndex: '',
  },
  {
    title: '操作时间',
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
