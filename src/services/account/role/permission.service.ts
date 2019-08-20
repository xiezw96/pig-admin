import axios from 'axios';

export class PermissionService {
  async find() {
    const {
      data: { data },
    } = await axios.get('api/admin/menu/tree');

    return data;
  }
}

export const permissionService = new PermissionService();
