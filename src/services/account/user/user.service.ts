import axios from 'axios';

import { PAGINATION } from '@/constants';

import { CreateUserDto } from './create-user.dto';
import { FindUsersDto } from './find-users.dto';

export class UserService {
  async find(dto?: FindUsersDto) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/user/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }

  async create(dto: CreateUserDto) {
    await axios.post('api/admin/user', dto);
  }

  async update(id: number, dto: CreateUserDto) {
    await axios.put('api/admin/user', { userId: id, ...dto });
  }

  async remove(id: number) {
    await axios.delete(`api/admin/user/${id}`);
  }

  async changePassword(id, dto) {
    await axios.put('api/admin/user', { userId: id, ...dto });
  }
}

export const userService = new UserService();
