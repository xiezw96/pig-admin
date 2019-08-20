import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '序号',
    key: '序号',
    dataIndex: 'id',
  },
  {
    title: '套餐名称',
    key: '套餐名称',
    dataIndex: 'name',
  },
  {
    title: '权重值',
    key: '权重值',
  },
  {
    title: '操作人',
    key: '操作人',
    dataIndex: 'creatorName',
  },
  {
    title: '操作日期',
    key: '操作日期',
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

export const bundleColumns: Column[] = [
  {
    title: '商品',
    key: '商品',
    dataIndex: 'goodsName',
  },
  {
    title: '规格1',
    key: '规格1',
    dataIndex: 'sepcValue1',
  },
  {
    title: '规格2',
    key: '规格2',
    dataIndex: 'sepcValue2',
  },
  {
    title: '数量',
    key: '数量',
    dataIndex: 'goodNum',
  },
  {
    title: '总价',
    key: '总价',
    dataIndex: 'totalPrice',
  },
  {
    title: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
