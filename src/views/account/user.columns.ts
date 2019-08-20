import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '序号',
    key: '序号',
    dataIndex: 'userId',
  },
  {
    title: '账号名称',
    key: '账号名称',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    key: '姓名',
    dataIndex: 'showName',
  },
  {
    title: '角色',
    key: '角色',
    dataIndex: 'roleList.0.roleName',
  },
  {
    title: '操作时间',
    key: '操作时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作人',
    key: '操作人',
    dataIndex: 'operatorName',
  },
  {
    width: 180,
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
