import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '奖励金额/个',
    key: '奖励金额/个',
    dataIndex: 'awardMoney',
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
