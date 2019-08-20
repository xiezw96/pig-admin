import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: 'ID',
    key: 'ID',
    dataIndex: 'id',
  },
  {
    title: '昵称',
    key: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '手机',
    key: '手机',
    dataIndex: 'phone',
  },
  {
    title: '注册日期',
    key: '注册日期',
    dataIndex: 'registerDate',
  },
  {
    title: '注册设备',
    key: '注册设备',
    dataIndex: 'registerEq',
  },
  {
    title: '代理归属',
    key: '代理归属',
    dataIndex: 'ofProxyName',
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
