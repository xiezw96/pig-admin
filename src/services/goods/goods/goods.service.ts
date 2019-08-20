import axios from 'axios';

import { PAGINATION } from '@/constants';

export class GoodsService {
  async find(dto?: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/goods/page', {
      params: { descs: 'goods.create_date', ...dto, ...PAGINATION },
    });

    return records;
  }

  async create(dto: any) {
    await axios.post('api/admin/goods', dto);
  }

  async update(id: number, dto: any) {
    await axios.put('api/admin/goods', { id, ...dto });
  }

  async updateStatus(id: number, status: number) {
    await axios.put(`api/admin/goods/updateState/${id}?state=${status}`);
  }

  async delete(id: number) {
    await axios.delete(`api/admin/goods/${id}`);
  }
}

export const goodsService = new GoodsService();
