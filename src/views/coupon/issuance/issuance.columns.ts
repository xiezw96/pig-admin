import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '名称',
    key: '名称',
    dataIndex: 'voucherName',
  },
  {
    title: '面额',
    key: '面额',
    dataIndex: 'price',
  },
  {
    title: '有效时间',
    key: '有效时间',
    scopedSlots: {
      customRender: 'range',
    },
  },
  {
    title: '到账代理',
    key: '到账代理',
    dataIndex: 'agentName',
  },
  {
    title: '发放时间',
    key: '发放时间',
    dataIndex: 'createDate',
  },
  {
    title: '类型',
    key: '类型',
    scopedSlots: {
      customRender: 'type',
    },
  },
];
