import axios from 'axios';

import { PAGINATION } from '@/constants';

export class AgentService {
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

  async getAgentInfo(id: any) {
    const {
      data: { data },
    } = await axios.get(`api/admin/agent/info/${id}`);
    return data;
  }

  async create(dto: any) {
    await axios.post('api/admin/agent', dto);
  }

  async update(id: number, dto: any) {
    await axios.put('api/admin/agent', { agentId: id, ...dto });
  }

  async remove(id: number) {
    await axios.delete(`api/admin/agent/${id}`);
  }
}

export const agentService = new AgentService();
