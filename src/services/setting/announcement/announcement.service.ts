import axios from 'axios';

import { CreateAnnouncementDto } from './create-announcements.dto';
import { FindAnnouncementsDto } from './find-announcements.dto';

export class AnnouncementService {
  async find(dto: FindAnnouncementsDto) {
    const {
      data: {
        data: { records, total },
      },
    } = await axios.get('api/admin/notice/page', {
      params: dto,
    });

    return {
      list: records,
      total,
    };
  }

  async create(dto: CreateAnnouncementDto) {
    await axios.post('api/admin/notice', dto);
  }

  async update(id: number, dto: CreateAnnouncementDto) {
    await axios.put('api/admin/notice', { id, ...dto });
  }
}

export const announcementService = new AnnouncementService();
