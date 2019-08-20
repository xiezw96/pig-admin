import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { ModalOptions } from 'ant-design-vue/types/modal';

import { EditingMode } from '@/enums';

import { columns } from './development-reward.columns';

export class DevelopmentRewardState {
  loading = false;

  mode: EditingMode = EditingMode.无;

  columns = columns;

  record: any | undefined = undefined;

  editingModal: Partial<ModalOptions> | undefined = undefined;

  pagingList: any[] = [];

  constructor(public form: WrappedFormUtils) {}
}
