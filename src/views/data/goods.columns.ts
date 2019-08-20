import { Column } from '@/interfaces';

export const goodsColumns: Column[] = [
  {
    title: '商品',
    width: 150,
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
    dataIndex: 'payNum',
  },
  {
    title: '采购总价',
    key: 'totalMoney',
    scopedSlots: {
      customRender: 'total',
    },
  },
];
