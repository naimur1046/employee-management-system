export interface DashboardStats {
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

export interface RecentActivity {
  id: number;
  action: string;
  employee: string;
  time: string;
  type: 'add' | 'edit' | 'delete';
}
