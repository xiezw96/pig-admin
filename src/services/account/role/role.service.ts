import axios from 'axios';

import { PAGINATION } from '@/constants';

import { CreateRoleDto } from './create-role.dto';
import { FindRolesDto } from './find-roles.dto';

export class RoleService {
  async find(dto?: FindRolesDto) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/role/page', {
      params: { ...dto, ...PAGINATION },
    });

    return records;
  }

  async create(dto: CreateRoleDto) {
    await axios.post('api/admin/role', {
      roleName: dto.roleName,
      roleCode: dto.roleName,
      roleDesc: dto.roleName,
    });
  }

  async update(id: number, dto: CreateRoleDto) {
    await axios.put('api/admin/role', {
      roleId: id,
      roleName: dto.roleName,
      roleCode: dto.roleName,
      roleDesc: dto.roleName,
    });
  }

  async remove(id: number) {
    await axios.delete(`api/admin/role/${id}`);
  }

  async findPermissions(id: number) {
    const { data } = await axios.get(`api/admin/menu/tree/${id}`);

    return data;
  }

  async updatePermissions(id, permissionIds) {
    await axios.put('api/admin/role/menu', {
      roleId: id,
      menuIds: permissionIds,
    });
  }
}

export const roleService = new RoleService();
