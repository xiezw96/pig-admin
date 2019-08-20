import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '名称',
    key: 'name',
    dataIndex: 'name',
    queriable: true,
  },
  {
    title: '商品数量',
    key: 'goodsNum',
    dataIndex: 'goodsNum',
    editable: false,
  },
  {
    title: '排序值',
    key: 'sort',
    dataIndex: 'sort',
  },
  {
    title: '操作人',
    key: 'username',
    dataIndex: 'username',
    control: false,
  },
  {
    title: '操作时间',
    key: 'createDate',
    dataIndex: 'createDate',
    control: false,
  },
  {
    title: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
