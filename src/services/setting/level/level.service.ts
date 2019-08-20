import axios from 'axios';

import { CreateLevelDto } from './create-level.dto';
import { GetLevelsDto } from './get-levels.dto';

export class LevelService {
  async get(dto?: GetLevelsDto) {
    const { data } = await axios.get('api/admin/level', {
      params: dto,
    });

    return data;
  }

  async create(dto: CreateLevelDto) {
    await axios.post('api/admin/level', dto);
  }

  async update(id: number, dto: CreateLevelDto) {
    await axios.put(`api/admin/level/${id}`, dto);
  }

  async remove(id: number) {
    await axios.delete(`api/admin/level/${id}`);
  }
}

export const levelService = new LevelService();
