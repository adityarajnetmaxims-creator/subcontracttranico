import { WorkOrderStatus, WorkOrder, User, Customer, Notification } from './types';
import React from 'react';

// Mock Current User
export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Roberto Carlos',
  email: 'robertocarlos@email.com',
  initials: 'RC',
  avatarColor: 'bg-blue-600',
  organization: 'Gold Gym'
};

export const OTHER_USER: User = {
  id: 'u2',
  name: 'Alex Kim',
  email: 'alex@example.com',
  initials: 'AK',
  avatarColor: 'bg-indigo-600'
};

export const RITA_USER: User = {
  id: 'u3',
  name: 'Rita Miller',
  email: 'rita@example.com',
  initials: 'RM',
  avatarColor: 'bg-red-600'
};

// Mock Customers
export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    siteName: 'Gold Gym',
    address: '123 Fitness Ave, Sector 15',
    postcode: '121007',
    contactName: 'John Doe',
    contactPhone: '+91 98765 43210'
  },
  {
    id: 'c2',
    siteName: 'Silver Gym',
    address: '456 Muscle Lane, Green Park',
    postcode: '110016',
    contactName: 'Jane Smith',
    contactPhone: '+91 98989 89898'
  }
];

// Mock Work Orders
export const WORK_ORDERS: WorkOrder[] = [
  {
    id: 'wo1',
    displayId: '#WO-0065',
    title: 'FlexiStrength 9000',
    location: 'Gold gym, Faridabad',
    description: 'Emergency repair required for main production line...',
    date: 'Jan 19, 2025',
    status: WorkOrderStatus.ASSIGNED,
    assignedUser: OTHER_USER,
    customerId: 'c1'
  },
  {
    id: 'wo2',
    displayId: '#WO-0065',
    title: 'FlexiStrength 9000',
    location: 'Gold gym, Faridabad',
    description: 'Emergency repair required for main production line belt system to ensure safety compliance.',
    date: 'Jan 19, 2025',
    status: WorkOrderStatus.IN_PROGRESS,
    assignedUser: OTHER_USER,
    customerId: 'c1'
  },
  {
    id: 'wo3',
    displayId: '#WO-0067',
    title: 'TreadMill X1',
    location: 'Silver gym, Delhi',
    description: 'Routine maintenance check for motor noise.',
    date: 'Jan 20, 2025',
    status: WorkOrderStatus.IN_PROGRESS,
    assignedUser: OTHER_USER,
    customerId: 'c2'
  },
  {
    id: 'wo4',
    displayId: '#WO-0060',
    title: 'PowerMax 3000',
    location: 'Fit Zone, Mumbai',
    description: 'Awaiting parts for the upgrade of the electrical console unit.',
    date: 'Jan 15, 2025',
    status: WorkOrderStatus.CANCELLED,
    assignedUser: RITA_USER
  },
  {
    id: 'wo5',
    displayId: '#WO-0055',
    title: 'FlexiStrength 9000',
    location: 'Gold gym, Faridabad',
    description: 'Emergency repair required for main production line.',
    date: 'Jan 10, 2025',
    status: WorkOrderStatus.COMPLETED,
    assignedUser: OTHER_USER,
    customerId: 'c1'
  },
  {
    id: 'wo6',
    displayId: '#WO-0050',
    title: 'Elliptical E5',
    location: 'Home Gym, Pune',
    description: 'Console display not working.',
    date: 'Jan 05, 2025',
    status: WorkOrderStatus.COMPLETED,
    assignedUser: RITA_USER
  },
    {
    id: 'wo7',
    displayId: '#WO-0070',
    title: 'RowMaster 500',
    location: 'City Center Gym',
    description: 'Chain needs lubrication and tension adjustment.',
    date: 'Jan 22, 2025',
    status: WorkOrderStatus.TODO,
    assignedUser: CURRENT_USER,
    customerId: 'c2'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    actorName: 'Lamine Yamal',
    actorInitials: 'ES', // Placeholder initials as per design
    actorColor: 'bg-gray-500',
    actionText: 'has changed the status',
    targetId: 'WO-0071',
    time: '11:00 AM',
    isUnread: true,
    type: 'status_change',
    fromStatus: WorkOrderStatus.IN_PROGRESS,
    toStatus: WorkOrderStatus.COMPLETED
  },
  {
    id: 'n2',
    actorName: 'Lamine Yamal',
    actorInitials: 'ES',
    actorColor: 'bg-gray-500',
    actionText: 'has changed the status',
    targetId: 'WO-0071',
    time: '11:00 AM',
    isUnread: true,
    type: 'status_change',
    fromStatus: WorkOrderStatus.ON_HOLD,
    toStatus: WorkOrderStatus.IN_PROGRESS
  },
  {
    id: 'n3',
    actorName: 'Lamine Yamal',
    actorInitials: 'ES',
    actorColor: 'bg-gray-500',
    actionText: 'has changed the status',
    targetId: 'WO-0071',
    time: '11:00 AM',
    isUnread: false,
    type: 'status_change',
    fromStatus: WorkOrderStatus.IN_PROGRESS,
    toStatus: WorkOrderStatus.ON_HOLD
  },
  {
    id: 'n4',
    actorName: 'Lamine Yamal',
    actorInitials: 'ES',
    actorColor: 'bg-gray-500',
    actionText: 'has changed the status',
    targetId: 'WO-0071',
    time: '11:00 AM',
    isUnread: false,
    type: 'status_change',
    fromStatus: WorkOrderStatus.ASSIGNED,
    toStatus: WorkOrderStatus.IN_PROGRESS
  },
  {
    id: 'n5',
    actorName: 'Lamine Yamal',
    actorInitials: 'ES',
    actorColor: 'bg-gray-500',
    actionText: 'has added',
    highlightText: '4hrs estimated time',
    targetId: 'WO-0071',
    time: '11:00 AM',
    isUnread: false,
    type: 'info'
  },
  {
    id: 'n6',
    actorName: 'Lamine Yamal',
    actorInitials: 'ES',
    actorColor: 'bg-gray-500',
    actionText: 'has changed the status',
    targetId: 'WO-0071',
    time: '11:00 AM',
    isUnread: false,
    type: 'status_change',
    fromStatus: WorkOrderStatus.TODO,
    toStatus: WorkOrderStatus.ASSIGNED
  },
  {
    id: 'n7',
    actorName: 'Admin',
    actorInitials: 'ES',
    actorColor: 'bg-gray-500',
    actionText: 'has cancelled the',
    targetId: 'WO-0069',
    time: '11:00 AM',
    isUnread: false,
    type: 'cancel'
  }
];

// Helper to get color for status
export const getStatusColor = (status: WorkOrderStatus): string => {
  switch (status) {
    case WorkOrderStatus.TODO: return 'border-l-gray-400 text-gray-600';
    case WorkOrderStatus.ASSIGNED: return 'border-l-blue-500 text-blue-600';
    case WorkOrderStatus.IN_PROGRESS: return 'border-l-orange-400 text-orange-600';
    case WorkOrderStatus.ON_HOLD: return 'border-l-yellow-400 text-yellow-600';
    case WorkOrderStatus.COMPLETED: return 'border-l-green-500 text-green-600';
    case WorkOrderStatus.CANCELLED: return 'border-l-red-500 text-red-600';
    default: return 'border-l-gray-400 text-gray-600';
  }
};

export const getStatusBadgeColor = (status: WorkOrderStatus): string => {
    switch (status) {
      case WorkOrderStatus.ASSIGNED: return 'border-blue-500 text-blue-700 bg-blue-50';
      case WorkOrderStatus.IN_PROGRESS: return 'border-orange-400 text-orange-700 bg-orange-50';
      case WorkOrderStatus.COMPLETED: return 'border-green-500 text-green-700 bg-green-50';
      case WorkOrderStatus.CANCELLED: return 'border-red-500 text-red-700 bg-red-50';
      case WorkOrderStatus.TODO: return 'border-gray-400 text-gray-700 bg-gray-50';
      case WorkOrderStatus.ON_HOLD: return 'border-yellow-400 text-yellow-700 bg-yellow-50';
      default: return 'border-gray-300 text-gray-600 bg-gray-50';
    }
  };

// Specific helper for the notification pills to match design strictly
export const getNotificationPillColor = (status: WorkOrderStatus) => {
  switch (status) {
    case WorkOrderStatus.COMPLETED: return 'bg-green-600 text-white border-green-600';
    case WorkOrderStatus.IN_PROGRESS: return 'bg-orange-400 text-white border-orange-400';
    case WorkOrderStatus.ON_HOLD: return 'bg-yellow-400 text-white border-yellow-400';
    case WorkOrderStatus.ASSIGNED: return 'bg-blue-500 text-white border-blue-500';
    case WorkOrderStatus.TODO: return 'bg-gray-500 text-white border-gray-500';
    case WorkOrderStatus.CANCELLED: return 'bg-red-500 text-white border-red-500';
    default: return 'bg-gray-400 text-white';
  }
}