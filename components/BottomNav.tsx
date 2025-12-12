import React from 'react';
import { Home, ClipboardList, User, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPathActive = (path: string) => {
    // Keep Profile active when viewing history since it's now a sub-page of Profile
    if (path === '/profile' && location.pathname === '/history') return true;
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    const isActive = isPathActive(path);
    return `flex flex-col items-center justify-center w-full h-full space-y-1 ${
      isActive ? 'text-blue-800' : 'text-gray-500'
    }`;
  };

  const getIconClass = (path: string) => {
      const isActive = isPathActive(path);
      return isActive ? 'stroke-[2.5px]' : 'stroke-2';
  }

  // Active indicator line
  const ActiveLine = ({ path }: { path: string }) => {
     if (!isPathActive(path)) return null;
     return (
         <div className="absolute top-0 w-12 h-0.5 bg-blue-800 rounded-b-md" />
     );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 pb-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-full max-w-md mx-auto relative">
        <button onClick={() => navigate('/')} className={getLinkClass('/')}>
          <div className="relative flex flex-col items-center h-full justify-center w-full pt-2">
            <ActiveLine path="/" />
            <Home size={24} className={getIconClass('/')} />
            <span className="text-xs font-medium mt-1">Home</span>
          </div>
        </button>

        <button onClick={() => navigate('/work-orders')} className={getLinkClass('/work-orders')}>
            <div className="relative flex flex-col items-center h-full justify-center w-full pt-2">
                <ActiveLine path="/work-orders" />
                <ClipboardList size={24} className={getIconClass('/work-orders')} />
                <span className="text-xs font-medium mt-1">Orders</span>
            </div>
        </button>

        <button onClick={() => navigate('/my-customers')} className={getLinkClass('/my-customers')}>
             <div className="relative flex flex-col items-center h-full justify-center w-full pt-2">
                <ActiveLine path="/my-customers" />
                <Users size={24} className={getIconClass('/my-customers')} />
                <span className="text-xs font-medium mt-1">Customers</span>
             </div>
        </button>

        <button onClick={() => navigate('/profile')} className={getLinkClass('/profile')}>
             <div className="relative flex flex-col items-center h-full justify-center w-full pt-2">
                <ActiveLine path="/profile" />
                <User size={24} className={getIconClass('/profile')} />
                <span className="text-xs font-medium mt-1">Profile</span>
             </div>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;