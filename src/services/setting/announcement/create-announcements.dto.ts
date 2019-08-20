import { AnnouncementDisplayPerriod } from '@/enums';

export interface CreateAnnouncementDto {
  title: string;

  status: number;

  period: AnnouncementDisplayPerriod;

  content: string;
}
