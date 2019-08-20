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
    title: '状态',
    key: '状态',
    dataIndex: 'auditStatus',
    scopedSlots: {
      customRender: 'status',
    },
  },
  {
    title: '操作账号',
    key: '操作账号',
    dataIndex: 'updateAuditorName',
  },
  {
    title: '操作日期',
    key: '操作日期',
    dataIndex: 'updateAuditTime',
  },
  {
    title: '备注',
    key: '备注',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
