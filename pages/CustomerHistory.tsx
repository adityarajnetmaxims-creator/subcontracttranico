import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Camera, Paperclip } from 'lucide-react';
import WorkOrderCard from '../components/WorkOrderCard';
import { WORK_ORDERS, MOCK_CUSTOMERS, CURRENT_USER } from '../constants';
import { WorkOrderStatus, WorkOrder } from '../types';

const CustomerHistory: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();

  const [allOrders, setAllOrders] = useState<WorkOrder[]>(WORK_ORDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    machineName: '',
    serialNumber: '',
    machineLocation: '',
    issueTitle: '',
    issueDescription: '',
    instructions: '',
  });

  const customer = MOCK_CUSTOMERS.find(c => c.id === customerId);
  const customerOrders = allOrders.filter(order => order.customerId === customerId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    const locationString = `${formData.machineLocation ? formData.machineLocation + ', ' : ''}${customer.siteName}, ${customer.address}`;

    const newOrder: WorkOrder = {
      id: `wo-${Date.now()}`,
      displayId: `#WO-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.machineName || 'New Machine',
      location: locationString,
      description: `${formData.issueTitle ? formData.issueTitle + ': ' : ''}${formData.issueDescription}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: WorkOrderStatus.TODO,
      assignedUser: CURRENT_USER,
      serialNumber: formData.serialNumber,
      issueTitle: formData.issueTitle,
      instructions: formData.instructions,
      customerId: customer.id
    };

    setAllOrders([newOrder, ...allOrders]);
    setIsModalOpen(false);
    setFormData({
      machineName: '',
      serialNumber: '',
      machineLocation: '',
      issueTitle: '',
      issueDescription: '',
      instructions: '',
    });
  };

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">Customer not found</p>
        <button onClick={() => navigate(-1)} className="bg-blue-900 text-white px-4 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <button 
                onClick={() => navigate(-1)} 
                className="p-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
            <h1 className="text-2xl font-bold text-gray-900">Work History</h1>
            <div className="flex items-center text-sm text-gray-500 space-x-2 mt-1">
                <span className="font-semibold text-blue-800">{customer.siteName}</span>
                <span>•</span>
                <span>{customer.address}</span>
            </div>
            </div>
        </div>

        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
            <Plus size={20} />
            <span>New Order</span>
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {customerOrders.length > 0 ? (
            customerOrders.map(order => (
                <WorkOrderCard key={order.id} order={order} />
            ))
         ) : (
             <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-3xl">
                 📋
               </div>
               <h3 className="text-gray-900 font-medium mb-1">No Work Orders</h3>
               <p className="text-gray-500 text-sm">No history found for this customer.</p>
             </div>
         )}
      </div>

      {/* Create Work Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">New Work Order for {customer.siteName}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {/* Machine Information */}
              <div>
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
                      placeholder="e.g. 1st Floor"
                      value={formData.machineLocation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Issue Details</h3>
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
                    <input
                        type="text"
                        name="issueTitle"
                        required
                        className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Brief summary"
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
                        placeholder="Any specific access instructions..."
                        value={formData.instructions}
                        onChange={handleInputChange}
                    />
                    </div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                <div className="flex space-x-4">
                   <button type="button" className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
                     <Camera size={24} className="mb-1" />
                     <span className="text-xs font-medium">Add Photo</span>
                   </button>
                   <button type="button" className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
                     <Paperclip size={24} className="mb-1" />
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

export default CustomerHistory;