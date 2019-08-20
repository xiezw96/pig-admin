import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '名称',
    key: '名称',
    dataIndex: 'name',
  },
  {
    title: '商品数量',
    key: '商品数量',
    dataIndex: 'goodsNum',
  },
  {
    title: '排序值',
    key: '排序值',
    dataIndex: 'sort',
  },
  {
    title: '操作人',
    key: '操作人',
    dataIndex: 'username',
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
