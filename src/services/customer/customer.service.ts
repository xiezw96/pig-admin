import axios from 'axios';

import { PAGINATION } from '@/constants';

export class CustomerService {
  async find(dto: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/fxuser/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }
  /**
   * 冻结/解冻
   * @param record
   */
  async updateStatus(id: number, state: number) {
    await axios.put(`api/admin/fxuser/updateState/${id}?state=${state}`);
  }
}

export const customerService = new CustomerService();
