import React from 'react';
import { MoreVertical, Calendar } from 'lucide-react';
import { WorkOrder, WorkOrderStatus } from '../types';
import { getStatusBadgeColor } from '../constants';

interface WorkOrderCardProps {
  order: WorkOrder;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({ order }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-sm border border-gray-100 relative">
      {/* Status Badge */}
      <div className="mb-2">
        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadgeColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Title and ID */}
      <div className="flex items-baseline space-x-2 mb-1">
        <h3 className="text-lg font-bold text-gray-900">{order.title}</h3>
        <span className="text-sm text-gray-400 font-medium">{order.displayId}</span>
      </div>

      {/* Location */}
      <p className="text-sm text-gray-500 mb-2">{order.location}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
        {order.description}
      </p>

      {/* Date */}
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <Calendar size={16} className="mr-2" />
        <span>{order.date}</span>
      </div>

      {/* Footer: Assignee and Menu */}
      <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-1">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${order.assignedUser.avatarColor} mr-2`}>
            {order.assignedUser.initials}
          </div>
          <span className="text-sm text-gray-700 font-medium">{order.assignedUser.name}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default WorkOrderCard;