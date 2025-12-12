import React from 'react';
import { ChevronRight, Trash2, History, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../constants';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Card */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold ${CURRENT_USER.avatarColor} mb-4`}>
                {CURRENT_USER.initials}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{CURRENT_USER.name}</h2>
                <p className="text-gray-500 mb-4">{CURRENT_USER.email}</p>
                <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                    {CURRENT_USER.organization}
                </div>
            </div>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Account Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Account</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                                <UserIcon size={20} />
                            </div>
                            <span className="text-gray-700 font-medium">Personal Information</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>
                    
                    <button 
                        onClick={() => navigate('/history')}
                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                                <History size={20} />
                            </div>
                            <span className="text-gray-700 font-medium">Work History</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                     <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                                <Settings size={20} />
                            </div>
                            <span className="text-gray-700 font-medium">Preferences</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Session & Security</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    <button className="w-full flex items-center justify-between p-6 hover:bg-red-50/30 transition-colors group">
                        <div className="flex items-center space-x-4">
                             <div className="p-2 bg-red-50 rounded-lg text-red-500 transition-colors">
                                <Trash2 size={20} />
                            </div>
                            <span className="text-gray-700 font-medium group-hover:text-red-600">Delete Account</span>
                        </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center space-x-4">
                             <div className="p-2 bg-gray-100 rounded-lg text-gray-600 transition-colors">
                                <LogOut size={20} />
                            </div>
                            <span className="text-red-500 font-medium">Logout</span>
                        </div>
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;