import axios from 'axios';

export class SettlementAuditingService {
  async find(dto: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/agentsettlement/page', {
      params: dto,
    });

    return records;
  }

  async findDetail(dto: any) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/settlementdetail/page', { params: dto });

    return records;
  }

  async getTotal(dto: any) {
    const {
      data: { data },
    } = await axios.get('api/admin/settlementdetail/sum');

    return data;
  }

  async audit(dto: any) {
    await axios.put('api/admin/agentsettlement/audit', dto);
  }
}

export const settlementAuditingService = new SettlementAuditingService();
