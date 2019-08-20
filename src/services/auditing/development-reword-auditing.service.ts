import axios from 'axios';

import { PAGINATION } from '@/constants';

export class DevelopmentRewordAuditingService {
  async find(dto) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/developaudit/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }

  async update(dto) {
    await axios.put('api/admin/developaudit/audit', dto);
  }

  async findRewards(id: number) {
    const {
      data: {
        data,
      },
    } = await axios.get(`api/admin/developaudit/info/${id}`, {
      params: { id },
    });

    return data;
  }
}

export const developmentRewordAuditingService = new DevelopmentRewordAuditingService();
