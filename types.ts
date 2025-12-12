export enum WorkOrderStatus {
  TODO = 'Todo',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In progress',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  organization?: string;
}

export interface WorkOrder {
  id: string;
  displayId: string;
  title: string;
  location: string;
  description: string;
  date: string;
  status: WorkOrderStatus;
  assignedUser: User;
  // Extended fields
  serialNumber?: string;
  issueTitle?: string;
  instructions?: string;
  attachments?: string[];
  customerId?: string;
}

export interface DashboardCount {
  status: WorkOrderStatus;
  count: number;
  color: string; // Tailwind border color class
}

export interface Customer {
  id: string;
  siteName: string;
  address: string;
  postcode: string;
  contactName: string;
  contactPhone: string;
}

export type NotificationType = 'status_change' | 'info' | 'cancel';

export interface Notification {
  id: string;
  actorName: string;
  actorInitials: string;
  actorColor: string;
  actionText: string;
  targetId: string; // e.g., WO-0071
  time: string;
  isUnread: boolean;
  type: NotificationType;
  fromStatus?: WorkOrderStatus;
  toStatus?: WorkOrderStatus;
  highlightText?: string; // For "4hrs" etc.
}