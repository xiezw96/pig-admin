import axios from 'axios';

export class DevelopmentRewardService {
  async find() {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/developaward/page', {
      params: {
        current: 1,
        size: 1000,
      },
    });

    console.log(records);

    return records;
  }

  async create(dto: any) {
    Object.entries(dto).forEach(([key, value]) => {
      dto[key] = +value;
    });

    await axios.post('api/admin/developaward', dto);
  }

  async update(id: number, dto: any) {
    Object.entries(dto).forEach(([key, value]) => {
      dto[key] = +value;
    });
    await axios.put('api/admin/developaward', { id, ...dto });
  }
}

export const developmentRewardService = new DevelopmentRewardService();
