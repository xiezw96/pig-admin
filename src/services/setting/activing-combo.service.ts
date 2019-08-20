import axios from 'axios';

import { PAGINATION } from '@/constants';
import { couponService } from '../coupon';

export class ActivingComboService {
  async find(dto?: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/combomanage/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }

  async findAvalibleCoupons() {
    const data = await couponService.findAllAvailable();
    return data;
  }

  async create(dto: any) {
    await axios.post('api/admin/combomanage', dto);
  }

  async update(id: number, dto: any) {
    await axios.put('api/admin/combomanage', { id, ...dto });
  }

  async remove(id: number) {
    await axios.delete(`api/admin/combomanage/${id}`);
  }
}

export const activingComboService = new ActivingComboService();
