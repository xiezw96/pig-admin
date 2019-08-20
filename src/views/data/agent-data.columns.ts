import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '日期',
    dataIndex: 'createDate',
  },
  {
    title: '代理商',
    dataIndex: 'agentName',
  },
  {
    title: '流水',
    dataIndex: 'total',
  },
  {
    title: '新增户数',
    dataIndex: 'newUserCount',
  },
  {
    title: '线上流水',
    dataIndex: 'onlineTotal',
  },
  {
    title: '线下流水',
    dataIndex: 'offlineTotal',
  },
  {
    title: '发展数',
    dataIndex: 'developCount',
  },
  {
    title: '已提现金额',
    dataIndex: 'withdrawalApplyTotal',
  },
  {
    title: '可提现金额',
    dataIndex: 'withdrawalPrice',
  },
];
