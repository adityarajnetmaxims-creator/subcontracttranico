import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_NOTIFICATIONS, getNotificationPillColor } from '../constants';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Read' | 'Unread'>('All');

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => n.isUnread).length;

  const filteredNotifications = MOCK_NOTIFICATIONS.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Read') return !n.isUnread;
    if (filter === 'Unread') return n.isUnread;
    return true;
  });

  const StatusPill = ({ status }: { status: any }) => (
    <span className={`px-3 py-1 rounded-full text-[10px] font-medium border ${getNotificationPillColor(status)}`}>
      {status}
    </span>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200 w-fit">
          {['All', 'Read', 'Unread'].map((f) => (
             <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-gray-900 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
                {f} {f === 'Unread' && unreadCount > 0 && `(${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className={`p-5 flex items-start space-x-4 hover:bg-gray-50 transition-colors ${notification.isUnread ? 'bg-blue-50/30' : ''}`}>
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold ${notification.actorColor}`}>
              {notification.actorInitials}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                  <p className="text-gray-600 text-base leading-relaxed">
                    <span className="font-semibold text-gray-900">{notification.actorName}</span>{' '}
                    {notification.actionText}{' '}
                    {notification.highlightText && <span className="font-medium text-gray-900">{notification.highlightText} </span>}
                    {notification.type === 'info' ? 'in ' : ''}
                    <span className="font-medium text-blue-600 hover:underline cursor-pointer">{notification.targetId}</span>
                  </p>
                  <span className="text-xs font-medium text-gray-400 whitespace-nowrap ml-4">
                    {notification.time}
                  </span>
              </div>

              {/* Status Change Badges */}
              {notification.type === 'status_change' && notification.fromStatus && notification.toStatus && (
                <div className="flex items-center mt-3 space-x-3">
                  <StatusPill status={notification.fromStatus} />
                  <ArrowRight size={16} className="text-gray-400" />
                  <StatusPill status={notification.toStatus} />
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
           <div className="p-12 text-center text-gray-400">
               No notifications found.
           </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;