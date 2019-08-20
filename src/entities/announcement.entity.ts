import { AnnouncementDisplayPerriod, EnableStatus } from '@/enums';

export interface AnnouncementEntity {
  id: number;

  title: string;

  status: EnableStatus;

  period: AnnouncementDisplayPerriod;

  content: string;

  createDate: string;
}
