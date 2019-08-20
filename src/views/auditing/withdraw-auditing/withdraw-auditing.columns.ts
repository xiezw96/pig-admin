import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '代理',
    key: '代理',
    dataIndex: 'userName',
  },
  {
    title: '当前余额',
    key: '当前余额',
    dataIndex: 'withdrawalPrice',
  },
  {
    title: '提现金额',
    key: '提现金额',
    dataIndex: 'total',
  },
  {
    title: '开户名',
    key: '开户名',
    dataIndex: 'bankAccountName',
  },
  {
    title: '审核状态',
    key: '审核状态',
    dataIndex: 'auditStatus',
    scopedSlots: {
      customRender: 'status',
    },
  },
  {
    title: '打款状态',
    key: '打款状态',
    dataIndex: 'remitStatus',
    scopedSlots: {
      customRender: 'remitStatus',
    },
  },
  {
    title: '申请日期',
    key: '申请日期',
    dataIndex: 'reqTime',
    scopedSlots: {
      customRender: 'reqTime',
    },
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
