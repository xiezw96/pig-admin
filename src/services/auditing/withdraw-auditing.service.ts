import axios from 'axios';

import { PAGINATION } from '@/constants';

export class WithdrawAuditingService {
  async find(dto: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/withdrawalapply/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }

  async audit(dto: any) {
    await axios.put('api/admin/withdrawalapply/audit', dto);
  }

  async pay(id: number) {
    await axios.put(`api/admin/withdrawalapply/remit/${id}`);
  }
}

export const withdrawAudtingService = new WithdrawAuditingService();
