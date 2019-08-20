import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '名称',
    key: '名称',
    dataIndex: 'name',
  },
  {
    title: '面额',
    key: '面额',
    dataIndex: 'price',
  },
  {
    title: '有效时间',
    key: '有效时间',
    scopedSlots: {
      customRender: 'range',
    },
  },
  {
    title: '操作人',
    key: '操作人',
    dataIndex: 'creatorId.name',
  },
  {
    title: '操作时间',
    key: '操作时间',
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
