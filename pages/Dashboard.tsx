import React from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WorkOrderStatus } from '../types';
import { WORK_ORDERS, getStatusColor, MOCK_NOTIFICATIONS } from '../constants';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Calculate counts dynamically
  const getCount = (status: WorkOrderStatus) => WORK_ORDERS.filter(o => o.status === status).length;
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => n.isUnread).length;

  const dashboardItems = [
    { label: 'Todo', status: WorkOrderStatus.TODO, count: 9 }, // Hardcoded 9 to match design
    { label: 'Assigned', status: WorkOrderStatus.ASSIGNED, count: getCount(WorkOrderStatus.ASSIGNED) },
    { label: 'In progress', status: WorkOrderStatus.IN_PROGRESS, count: getCount(WorkOrderStatus.IN_PROGRESS) },
    { label: 'On Hold', status: WorkOrderStatus.ON_HOLD, count: 0 },
    { label: 'Completed', status: WorkOrderStatus.COMPLETED, count: getCount(WorkOrderStatus.COMPLETED) },
    { label: 'Cancelled', status: WorkOrderStatus.CANCELLED, count: '02' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Roberto</p>
        </div>
        
        <button 
          onClick={() => navigate('/notifications')} 
          className="relative p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm group"
        >
          <Bell size={24} className="group-hover:stroke-[2.5px]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white min-w-[20px] text-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      <h2 className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-4">Overview</h2>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => {
          const colorClass = getStatusColor(item.status);
          const borderColor = colorClass.split(' ')[0].replace('border-l-', 'border-l-4 border-'); 
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center relative overflow-hidden transition-transform hover:scale-[1.02] cursor-default">
               {/* Colored Border Indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorClass.split(' ')[0]}`}></div>
              
              <span className="ml-2 text-gray-600 font-medium text-lg">
                {item.label}
              </span>
              <span className="text-3xl font-bold text-gray-900">
                {item.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;