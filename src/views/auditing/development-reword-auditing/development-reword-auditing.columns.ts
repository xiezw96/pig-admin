import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '代理商',
    key: '代理商',
    dataIndex: 'agentName',
  },
  {
    title: '发展数量',
    key: '发展数量',
    dataIndex: 'developNum',
  },
  {
    title: '奖励金额',
    dataIndex: 'originalTotalMoney',
  },
  {
    title: '通道费用',
    dataIndex: 'commission',
  },
  {
    title: '奖励到账金额',
    dataIndex: 'totalMoney',
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
    title: '操作人',
    key: '操作人',
    dataIndex: 'creatorId',
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
