import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '结算批次',
    key: '结算批次',
    dataIndex: 'code',
  },
  {
    title: '申请时间',
    key: '申请时间',
    dataIndex: 'reqTime',
  },
  {
    title: '结算金额',
    key: '结算金额',
    dataIndex: 'originalTotal',
  },
  {
    title: '结算到账金额',
    key: '结算到账金额',
    dataIndex: 'total',
  },
  {
    title: '通道费用',
    dataIndex: 'commission',
  },
  {
    title: '可提现金额(结算前)',
    key: '可提现金额(结算前)',
    dataIndex: 'oldWithdrawalPrice',
  },
  {
    title: '可提现金额(结算后)',
    key: '可提现金额(结算后)',
    dataIndex: 'newWithdrawalPrice',
  },
  {
    title: '状态',
    key: '状态',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status',
    },
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
