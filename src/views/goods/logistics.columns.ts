import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '商品',
    key: 'goods',
    dataIndex: 'goods',
  },
  {
    title: '商品名称',
    key: 'goodsName',
    dataIndex: 'goodsName',
  },
  {
    title: '规格1',
    key: 'spec1',
    dataIndex: 'spec1',
  },
  {
    title: '规格2',
    key: 'spec2',
    dataIndex: 'sepc2',
  },
  {
    title: '数量',
    key: 'count',
    dataIndex: 'count',
  },
  {
    title: '收货地址',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: '收货人',
    key: 'consignee',
    dataIndex: 'consignee',
  },
  {
    title: '电话',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '物流信息',
    key: 'logistics',
    dataIndex: 'logistics',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作日期',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
