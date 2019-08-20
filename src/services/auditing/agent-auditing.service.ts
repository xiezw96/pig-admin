import axios from 'axios';

import { PAGINATION } from '@/constants';

export class AgentAuditingService {
  async find(dto: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/agent/page', {
      params: { ...PAGINATION, ...dto },
    });

    return records;
  }

  async audit(dto: any) {
    await axios.post('api/admin/agent/audit', dto);
  }
}

export const agentAuditingService = new AgentAuditingService();
