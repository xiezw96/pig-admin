import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '代理姓名',
    key: '代理姓名',
    dataIndex: 'name',
  },
  {
    title: '身份证',
    key: '身份证',
    dataIndex: 'idCard',
  },
  {
    title: '身份证正面',
    key: '身份证正面',
    dataIndex: 'identityCardFront',
    scopedSlots: {
      customRender: 'image',
    },
  },
  {
    title: '身份证反面',
    key: '身份证反面',
    dataIndex: 'identityCardVerso',
    scopedSlots: {
      customRender: 'image',
    },
  },
  {
    title: '银行卡正面',
    key: '银行卡正面',
    dataIndex: 'bankCardFront',
    scopedSlots: {
      customRender: 'image',
    },
  },
  {
    title: '银行卡反面',
    key: '银行卡反面',
    dataIndex: 'bankCardVerso',
    scopedSlots: {
      customRender: 'image',
    },
  },
  {
    title: '状态',
    key: '状态',
    dataIndex: 'updateAuditStatus',
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
    title: '操作人',
    key: '操作人',
    dataIndex: 'updateAuditorName',
  },
  {
    title: '操作日期',
    key: '操作日期',
    dataIndex: 'updateAuditTime',
  },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
