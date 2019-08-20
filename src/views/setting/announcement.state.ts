import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { ModalOptions } from 'ant-design-vue/types/modal';
import { PaginationConfig } from 'ant-design-vue/types/table/table';

import { AnnouncementEntity } from '@/entities';
import { EditingMode } from '@/enums';
import { FindAnnouncementsDto } from '@/services';

import { columns } from './announcement.columns';

export class AnnouncementState {
  loading = false;
  mode: EditingMode = EditingMode.无;
  pagingList: AnnouncementEntity[] = [];
  columns = columns;
  record: AnnouncementEntity | undefined = undefined;
  editingModal: Partial<ModalOptions> | undefined = undefined;
  pagination: Pick<PaginationConfig, 'current' | 'pageSize' | 'total'> = {
    current: 1,
    pageSize: 15,
    total: 0,
  };
  prevFindDto: FindAnnouncementsDto = {
    current: this.pagination.current,
    size: this.pagination.pageSize,
  };

  constructor(
    public queryingForm: WrappedFormUtils,
    public editingForm: WrappedFormUtils,
  ) {}
}
