import { PaginationConfig } from 'ant-design-vue/types/table/table';

export type Pagination = Pick<
  PaginationConfig,
  'current' | 'pageSize' | 'total'
>;
