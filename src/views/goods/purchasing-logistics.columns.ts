import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '订单号',
    dataIndex: 'code',
  },
  {
    title: '代理账号',
    dataIndex: 'agentName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status',
    },
  },
  {
    title: '收货姓名',
    dataIndex: 'name',
  },
  {
    title: '收货电话',
    dataIndex: 'phone',
  },
  {
    title: '收货地址',
    scopedSlots: {
      customRender: 'address',
    },
  },
  {
    title: '物流公司',
    dataIndex: 'logisticsCompany',
  },
  {
    title: '物流单号',
    dataIndex: 'logisticsCode',
  },
  {
    title: '发货日期',
    dataIndex: 'sendTime',
  },
  {
    title: '操作',
    key: 'actions',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
