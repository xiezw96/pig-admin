import axios from 'axios';

import { PAGINATION } from '@/constants';

export class ModifyInfoAuditingService {
  async find(dto?: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/agent/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }

  async audit(dto: any) {
    await axios.post('api/admin/agent/updateaudit', dto);
  }
}

export const modifyInfoAuditingService = new ModifyInfoAuditingService();
