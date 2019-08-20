import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '标题',
    key: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    key: '状态',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status',
    },
  },
  {
    title: '创建时间',
    key: '创建时间',
    dataIndex: 'createDate',
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
