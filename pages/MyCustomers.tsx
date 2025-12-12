import React, { useState } from 'react';
import { Search, Plus, MapPin, Phone, User as UserIcon, X, Pencil, ClipboardList, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CUSTOMERS } from '../constants';
import { Customer } from '../types';

const MyCustomers: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Customer>>({
    siteName: '',
    address: '',
    postcode: '',
    contactName: '',
    contactPhone: ''
  });

  const filteredCustomers = customers.filter(c =>
    c.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      siteName: '',
      address: '',
      postcode: '',
      contactName: '',
      contactPhone: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingId(customer.id);
    setFormData({
      siteName: customer.siteName,
      address: customer.address,
      postcode: customer.postcode,
      contactName: customer.contactName,
      contactPhone: customer.contactPhone
    });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.siteName && formData.address && formData.contactName) {
      if (editingId) {
        setCustomers(prev => prev.map(c => 
          c.id === editingId ? { ...c, ...formData } as Customer : c
        ));
      } else {
        const newCustomerEntry: Customer = {
          id: `c${Date.now()}`,
          siteName: formData.siteName!,
          address: formData.address!,
          postcode: formData.postcode || '',
          contactName: formData.contactName!,
          contactPhone: formData.contactPhone || ''
        };
        setCustomers([...customers, newCustomerEntry]);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">My Customers</h1>
        </div>

        <button 
            onClick={openAddModal}
            className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
            <Plus size={20} />
            <span>Add Customer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2">
        <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-100 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* Customer List Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Customer / Site</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Contact Person</th>
                <th className="px-6 py-4">Contact Number</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">{customer.siteName}</span>
                        {customer.postcode && (
                            <span className="text-xs text-gray-400 font-medium mt-1">{customer.postcode}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top max-w-xs">
                        <div className="flex items-start text-gray-500 text-sm">
                            <MapPin size={16} className="mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
                            <span className="line-clamp-2">{customer.address}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                        <div className="flex items-center text-gray-700 text-sm font-medium">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-500">
                                <UserIcon size={16} />
                            </div>
                            {customer.contactName}
                        </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                        {customer.contactPhone ? (
                             <div className="inline-flex items-center text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                                <Phone size={12} className="mr-1.5" />
                                <span>{customer.contactPhone}</span>
                            </div>
                        ) : (
                            <span className="text-gray-400 text-xs italic">No number</span>
                        )}
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                        <div className="flex items-center justify-end space-x-2">
                             <button
                                onClick={() => navigate(`/customer-history/${customer.id}`)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Work Orders"
                            >
                                <ClipboardList size={18} />
                            </button>
                            <button 
                                onClick={() => openEditModal(customer)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Details"
                            >
                                <Pencil size={18} />
                            </button>
                        </div>
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
                      <p>No customers found matching "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name *</label>
                <input
                  type="text"
                  name="siteName"
                  required
                  className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Gold Gym"
                  value={formData.siteName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input
                  type="text"
                  name="postcode"
                  className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. 110001"
                  value={formData.postcode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. +91..."
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                    />
                  </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 mt-2">
                 <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
                >
                  {editingId ? 'Update Customer' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCustomers;