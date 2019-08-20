import axios from 'axios';

import { PAGINATION } from '@/constants';

export class CouponService {
  async find(dto?: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/voucher/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }

  async create(dto?: any) {
    await axios.post('api/admin/voucher', dto);
  }

  async update(id: number, dto?: any) {
    await axios.put('api/admin/voucher', { id, ...dto });
  }

  async remove(id: number) {
    const result = await axios.delete(`api/admin/voucher/${id}`);
    return result;
  }

  async findAllAvailable() {
    return await this.find();
  }
}

export const couponService = new CouponService();
