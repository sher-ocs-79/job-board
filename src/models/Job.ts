export interface Job {
  id: string;
  title: string;
  description: string;
  email: string;
  isApproved: boolean;
  isSpam: boolean;
  createdAt: Date;
}
