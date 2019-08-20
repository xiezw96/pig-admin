import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '柜子型号',
    dataIndex: 'spec',
  },
  {
    title: '数量',
    dataIndex: 'num',
  },
  {
    title: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
