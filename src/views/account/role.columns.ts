import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '名称',
    key: '名称',
    dataIndex: 'roleName',
  },
  {
    title: '操作人',
    key: '操作人',
    dataIndex: 'operatorName',
  },
  {
    title: '操作时间',
    key: '操作时间',
    dataIndex: 'updateTime',
  },
  {
    width: 180,
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
