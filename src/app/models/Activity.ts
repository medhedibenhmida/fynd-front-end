interface IActivity {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  created_at: Date;
  activityStatus: 'ACTIVE' | 'PENDING' | 'CANCELLED';
}
