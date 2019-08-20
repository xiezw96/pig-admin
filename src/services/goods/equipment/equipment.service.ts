import axios from 'axios';

import { PAGINATION } from '@/constants';

import { FindEquipmentDto } from './find-equipment.dto';

export class EquipmentService {
  async find(dto?: FindEquipmentDto) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/salesmachine/page', {
      params: { ...PAGINATION, ...dto },
    });

    return records;
  }

  async fetchTypes(dto?) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/salesmachinespec/page', {
      params: { ...PAGINATION, ...dto },
    });

    return records;
  }

  async export(dto?: FindEquipmentDto) {
    // TODO
  }

  async update(id: number, status: number) {
    // TODO
  }
}

export const equipmentService = new EquipmentService();
