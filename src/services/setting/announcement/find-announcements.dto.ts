import { AnnouncementDisplayPerriod } from '@/enums';

export interface FindAnnouncementsDto {
  title?: string;
  status?: AnnouncementDisplayPerriod;

  current: number;
  size: number;
}
