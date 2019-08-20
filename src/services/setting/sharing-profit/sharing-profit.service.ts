import axios from 'axios';

export class SharingProfitService {
  async find() {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/shareprofit/page', {
      params: {
        current: 1,
        size: 1000,
      },
    });

    return records;
  }

  async create(dto: any) {
    Object.entries(dto).forEach(([key, value]) => {
      dto[key] = +value;
    });

    await axios.post('api/admin/shareprofit', dto);
  }

  async update(id: number, dto: any) {
    Object.entries(dto).forEach(([key, value]) => {
      dto[key] = +value;
    });
    await axios.put('api/admin/shareprofit', { id, ...dto });
  }
}

export const sharingProfitService = new SharingProfitService();
