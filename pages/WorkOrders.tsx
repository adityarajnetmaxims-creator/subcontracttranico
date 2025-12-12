import React, { useState } from 'react';
import { Search, Plus, ChevronDown, X, Camera, Paperclip, Calendar, MoreHorizontal, User, Filter } from 'lucide-react';
import { WORK_ORDERS, MOCK_CUSTOMERS, CURRENT_USER, getStatusBadgeColor } from '../constants';
import { WorkOrderStatus, WorkOrder } from '../types';
import WorkOrderCard from '../components/WorkOrderCard'; // Keeping for potential mobile fallback or other uses if needed, though unused here

const WorkOrders: React.FC = () => {
  const [orders, setOrders] = useState<WorkOrder[]>(WORK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'assigned' | 'ongoing' | 'history'>('new');

  // Form State
  const [formData, setFormData] = useState({
    customerId: '',
    machineName: '',
    serialNumber: '',
    machineLocation: '',
    issueTitle: '',
    issueDescription: '',
    instructions: '',
  });

  const tabs = [
    { id: 'new', label: 'New', statuses: [WorkOrderStatus.TODO] },
    { id: 'assigned', label: 'Assigned', statuses: [WorkOrderStatus.ASSIGNED] },
    { id: 'ongoing', label: 'In Progress', statuses: [WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.ON_HOLD] },
    { id: 'history', label: 'History', statuses: [WorkOrderStatus.COMPLETED, WorkOrderStatus.CANCELLED] },
  ];

  // Calculate counts for tabs
  const getTabCount = (tabStatuses: WorkOrderStatus[]) => {
    return orders.filter(o => tabStatuses.includes(o.status)).length;
  };

  // Filter Logic
  const currentTab = tabs.find(t => t.id === activeTab);
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
        order.displayId.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = currentTab?.statuses.includes(order.status);
    
    return matchesSearch && matchesTab;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCustomer = MOCK_CUSTOMERS.find(c => c.id === formData.customerId);
    const locationString = selectedCustomer 
      ? `${formData.machineLocation ? formData.machineLocation + ', ' : ''}${selectedCustomer.siteName}, ${selectedCustomer.address}`
      : formData.machineLocation;

    const newOrder: WorkOrder = {
      id: `wo-${Date.now()}`,
      displayId: `#WO-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.machineName || 'New Machine',
      location: locationString || 'Unknown Location',
      description: `${formData.issueTitle ? formData.issueTitle + ': ' : ''}${formData.issueDescription}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: WorkOrderStatus.TODO,
      assignedUser: CURRENT_USER,
      serialNumber: formData.serialNumber,
      issueTitle: formData.issueTitle,
      instructions: formData.instructions,
      customerId: formData.customerId
    };

    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
    setFormData({
      customerId: '',
      machineName: '',
      serialNumber: '',
      machineLocation: '',
      issueTitle: '',
      issueDescription: '',
      instructions: '',
    });
    setActiveTab('new'); // Switch to new tab to see the created order
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Work Order</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = getTabCount(tab.statuses as WorkOrderStatus[]);
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 flex items-center space-x-2 text-sm font-medium border-b-2 transition-colors ${
                  isActive 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Work Order..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-100 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Optional Priority Filter Placeholder to match image */}
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50">
           <span>All Statuses</span>
           <ChevronDown size={16} />
        </button>
      </div>

      {/* Table View */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Job number</th>
                <th className="px-6 py-4">Customer / Machine</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned Engineer</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 underline underline-offset-2 decoration-gray-300 decoration-1 cursor-pointer hover:decoration-blue-500 hover:text-blue-700 transition-all">
                          {order.displayId}
                        </span>
                        <div className="flex items-center text-gray-400 text-xs mt-1.5">
                          <Calendar size={12} className="mr-1.5" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top max-w-xs">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm mb-1">{order.title}</span>
                        <div className="flex items-start text-gray-500 text-xs leading-relaxed">
                           <span className="line-clamp-2">{order.location}</span>
                        </div>
                        {order.description && (
                          <p className="text-gray-400 text-xs mt-1 line-clamp-1 italic">
                            "{order.description}"
                          </p>
                        )}
                      </div>
                    </td>
                     <td className="px-6 py-4 align-top">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.status)}`}>
                            {order.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center p-1.5 bg-gray-50 border border-gray-100 rounded-lg w-fit pr-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${order.assignedUser.avatarColor} mr-2`}>
                            {order.assignedUser.initials}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{order.assignedUser.name}</span>
                        <ChevronDown size={14} className="ml-2 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Filter size={20} className="text-gray-300" />
                      </div>
                      <p>No orders found in {tabs.find(t => t.id === activeTab)?.label}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Work Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">New Work Order</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Customer</label>
                  <div className="relative">
                    <select
                      name="customerId"
                      required
                      className="w-full pl-4 pr-10 py-3 bg-gray-50 text-black border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all"
                      value={formData.customerId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a customer</option>
                      {MOCK_CUSTOMERS.map(c => (
                        <option key={c.id} value={c.id}>{c.siteName} - {c.address}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                {/* Machine Information */}
                <div className="md:col-span-2 border-t border-gray-100 pt-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Machine Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
                        <input
                          type="text"
                          name="machineName"
                          required
                          className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="e.g. FlexiStrength 9000"
                          value={formData.machineName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                        <input
                          type="text"
                          name="serialNumber"
                          className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="e.g. SN-12345"
                          value={formData.serialNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Floor/Location</label>
                        <input
                          type="text"
                          name="machineLocation"
                          className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="e.g. 1st Floor, Main Hall"
                          value={formData.machineLocation}
                          onChange={handleInputChange}
                        />
                      </div>
                  </div>
                </div>

                {/* Issue Details */}
                <div className="md:col-span-2 border-t border-gray-100 pt-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Issue Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
                      <input
                        type="text"
                        name="issueTitle"
                        required
                        className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Brief summary of the problem"
                        value={formData.issueTitle}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="issueDescription"
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        placeholder="Detailed description..."
                        value={formData.issueDescription}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                      <textarea
                        name="instructions"
                        rows={2}
                        className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        placeholder="Safety warnings or access codes..."
                        value={formData.instructions}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                <div className="flex space-x-4">
                   <button type="button" className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-400 transition-all text-gray-500">
                     <Camera size={24} className="mb-2" />
                     <span className="text-xs font-medium">Add Photo</span>
                   </button>
                   <button type="button" className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-400 transition-all text-gray-500">
                     <Paperclip size={24} className="mb-2" />
                     <span className="text-xs font-medium">Add File</span>
                   </button>
                </div>
              </div>

            </form>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-900 text-white font-bold px-8 py-2.5 rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;
