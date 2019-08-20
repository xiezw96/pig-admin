import { Column } from '@/interfaces';

export const columns: Column[] = [
  {
    title: '商品售价',
    key: '商品售价',
    dataIndex: 'goodsPrice',
  },
  {
    title: '代理上级分润比例',
    key: '代理上级分润比例',
    dataIndex: 'upAgentShareProfit',
  },
  {
    title: '代理分润比例',
    key: '代理分润比例',
    dataIndex: 'agentShareProfit',
  },
  // {
  //   title: '省代分润',
  //   key: '省代分润',
  //   dataIndex: 'provinceShareProfit',
  // },
  // {
  //   title: '市代分润比例',
  //   key: '市代分润比例',
  //   dataIndex: 'cityShareProfit',
  // },
  // {
  //   title: '区/县代分润比例',
  //   key: '区/县代分润比例',
  //   dataIndex: 'areaShareProfit',
  // },
  {
    title: '操作',
    key: '操作',
    scopedSlots: {
      customRender: 'actions',
    },
  },
];
