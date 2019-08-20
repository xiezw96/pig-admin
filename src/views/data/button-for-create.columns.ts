import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '商品',
    dataIndex: 'goodsAttId',
    scopedSlots: {
      customRender: 'image',
    }
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
  },
  {
    title: '规格',
    key: 'spec',
    scopedSlots: {
      customRender: 'spec',
    },
  },
  {
    title: '采购价',
    dataIndex: 'tradePrice',
  },
  {
    title: '零售价',
    dataIndex: 'salePrice',
  },
  {
    title: '采购数量',
    dataIndex: 'goodNum',
  },
  {
    title: '采购总价',
    dataIndex: 'totalPrice',
  },
  {
    title: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
