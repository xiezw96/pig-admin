import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    width: 180,
    title: '商品',
    key: '商品',
    scopedSlots: {
      customRender: 'image',
    },
  },
  {
    width: 300,
    title: '商品名称',
    key: '商品名称',
    scopedSlots: {
      customRender: 'name',
    },
  },
  {
    title: '商品编码',
    key: '商品编码',
    dataIndex: 'code',
  },
  {
    title: '销量',
    key: '销量',
    scopedSlots: {
      customRender: 'salesVolume',
    },
  },
  {
    title: '商品类型',
    key: '商品类型',
    dataIndex: 'category',
    scopedSlots: {
      customRender: 'category',
    },
  },
  {
    title: '库存',
    key: '库存',
    scopedSlots: {
      customRender: 'inventory',
    },
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
