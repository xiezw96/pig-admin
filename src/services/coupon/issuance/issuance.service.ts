import axios from 'axios';

import { PAGINATION } from '@/constants';
import { couponService } from '@/services';
import { agentService } from '@/services/account';

export class IssuanceService {
  async find(dto: any) {
    const {
      data: {
        data: { records, total },
      },
    } = await axios.get('api/admin/vouchergrantrecord/page', {
      params: { dto, ...PAGINATION },
    });

    return { data: records, total };
  }

  async create(dto: any) {
    await axios.post('api/admin/vouchergrantrecord', dto);
  }

  async findAllAvailableCoupons() {
    return couponService.findAllAvailable();
  }

  async findAllAgents() {
    return agentService.find();
  }
}

export const issuanceService = new IssuanceService();
