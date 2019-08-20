import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '设备名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '设备码',
    key: 'code',
    dataIndex: 'code',
  },
  {
    title: '代理商/手机号',
    key: 'belongs',
    dataIndex: 'belongs',
  },
  {
    title: '归属类型',
    key: 'belongsType',
    dataIndex: 'belongsType',
    scopedSlots: {
      customRender: 'belongsType',
    },
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: {
      customRender: 'status',
    },
  },
  {
    title: '当前地址',
    key: 'currAddreaa',
    dataIndex: 'currAddreaa',
  },
  {
    title: '激活地址',
    key: 'activateAddress',
    dataIndex: 'activateAddress',
  },
  {
    title: '激活时间',
    key: 'activateTime',
    dataIndex: 'activateTime',
  },
  {
    title: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
