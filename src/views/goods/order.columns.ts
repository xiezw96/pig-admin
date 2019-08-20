import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '商品',
    dataIndex: 'goodsAttId',
    scopedSlots: {
      customRender: 'image',
    },
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
  },
  {
    title: '规格',
    scopedSlots: {
      customRender: 'spec',
    },
  },
  {
    title: '数量',
    dataIndex: 'payNum',
  },
];
