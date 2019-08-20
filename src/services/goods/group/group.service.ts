import axios from 'axios';

import { CreateGroupDto } from './create-group.dto';
import { FindGroupsDto } from './find-groups.dto';

export class GroupService {
  async find(dto?: FindGroupsDto) {
    const { data } = await axios.get('api/admin/goodsgroup/list', {
      params: dto,
    });
    return data;
  }

  async create(dto: CreateGroupDto) {
    await axios.post('api/admin/goodsgroup', dto);
  }

  async update(id: number, dto: CreateGroupDto) {
    await axios.put('api/admin/goodsgroup', { id, ...dto });
  }

  async remove(id: number) {
    await axios.delete(`api/admin/goodsgroup/${id}`);
  }
}

export const groupService = new GroupService();
