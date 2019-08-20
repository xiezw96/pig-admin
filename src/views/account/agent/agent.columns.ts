import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '序号',
    key: '序号',
    dataIndex: 'agentId',
  },
  {
    title: '手机',
    key: '手机',
    dataIndex: 'phone',
  },
  {
    title: '姓名',
    key: '姓名',
    dataIndex: 'name',
  },
  {
    title: '推荐人',
    key: '推荐人',
    dataIndex: 'referrerName',
  },
  {
    title: '激活状态',
    key: '激活状态',
    dataIndex: 'activeStatus',
    scopedSlots: {
      customRender: 'status',
    },
  },
  // {
  //   title: '操作人',
  //   key: '操作人',
  // },
  // {
  //   title: '操作时间',
  //   key: '操作时间',
  // },
  {
    width: 180,
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
