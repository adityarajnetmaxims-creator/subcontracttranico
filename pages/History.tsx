import React, { useState } from 'react';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorkOrderCard from '../components/WorkOrderCard';
import { WORK_ORDERS } from '../constants';
import { WorkOrderStatus } from '../types';

const History: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const historyStatuses = [
    WorkOrderStatus.COMPLETED,
    WorkOrderStatus.CANCELLED
  ];

  const filteredOrders = WORK_ORDERS.filter(order => {
    const matchesSearch = 
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.displayId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isHistoryType = historyStatuses.includes(order.status);
    
    if (!isHistoryType) return false;

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
             <button 
                onClick={() => navigate(-1)} 
                className="p-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">History</h1>
                <p className="text-gray-500 text-sm mt-1">Past and completed work orders</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                type="text"
                placeholder="Search history..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <button className="flex items-center justify-between space-x-2 bg-white border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 w-32">
                <span>All Time</span>
                <ChevronDown size={16} />
            </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
                <WorkOrderCard key={order.id} order={order} />
            ))
         ) : (
             <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                No history found
             </div>
         )}
      </div>
    </div>
  );
};

export default History;