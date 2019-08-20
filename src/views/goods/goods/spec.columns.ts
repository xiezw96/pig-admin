import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    key: '零售价',
    dataIndex: 'salePrice',
    scopedSlots: {
      title: 'salePriceHeader',
      customRender: 'salePriceEditableCell',
    },
  },
  {
    key: '统批价',
    dataIndex: 'tradePrice',
    scopedSlots: {
      title: 'tradePriceHeader',
      customRender: 'tradePriceEditableCell',
    },
  },
  {
    key: '销量',
    dataIndex: 'salesVolume',
    scopedSlots: {
      title: 'salesVolumeHeader',
      customRender: 'salesVolumeEditableCell',
    },
  },
  {
    key: '库存',
    dataIndex: 'inventoryNum',
    scopedSlots: {
      title: 'inventoryNumHeader',
      customRender: 'inventoryNumEditableCell',
    },
  },
  {
    key: '重量(kg)',
    dataIndex: 'weight',
    scopedSlots: {
      title: 'weightHeader',
      customRender: 'weightEditableCell',
    },
  },
];
