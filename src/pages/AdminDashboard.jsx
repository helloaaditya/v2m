import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaSearch, 
  FaBox, FaHistory, FaArrowUp, FaArrowDown, FaFilter,
  FaTimes, FaSave, FaTimesCircle
} from 'react-icons/fa';
import { api } from '../utils/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [activityHistory, setActivityHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'units',
    location: '',
    description: '',
    minStock: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [inv, activities] = await Promise.all([
        api.getInventory(),
        api.getActivities()
      ]);
      setInventory(inv);
      setActivityHistory(activities);
    } catch (err) {
      setError('Failed to load data. Please check if the backend server is running.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddItem = () => {
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: 'units',
      location: '',
      description: '',
      minStock: ''
    });
    setShowAddModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category || '',
      quantity: item.quantity.toString(),
      unit: item.unit || 'units',
      location: item.location || '',
      description: item.description || '',
      minStock: item.minStock?.toString() || ''
    });
    setShowEditModal(true);
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.deleteItem(id);
        await loadData();
      } catch (err) {
        alert('Failed to delete item: ' + err.message);
      }
    }
  };

  const handleSaveItem = async () => {
    if (!formData.name || !formData.quantity) {
      alert('Please fill in required fields (Name and Quantity)');
      return;
    }

    const quantity = parseFloat(formData.quantity);
    if (isNaN(quantity) || quantity < 0) {
      alert('Please enter a valid quantity');
      return;
    }

    try {
      const itemData = {
        name: formData.name,
        category: formData.category,
        quantity: quantity,
        unit: formData.unit,
        location: formData.location,
        description: formData.description,
        minStock: formData.minStock ? parseFloat(formData.minStock) : null
      };

      if (showAddModal) {
        await api.createItem(itemData);
      } else if (showEditModal && editingItem) {
        await api.updateItem(editingItem.id, itemData);
      }

      setShowAddModal(false);
      setShowEditModal(false);
      setEditingItem(null);
      await loadData();
    } catch (err) {
      alert('Failed to save item: ' + err.message);
    }
  };

  const handleInOut = async (item, type) => {
    const amount = prompt(`Enter ${type === 'in' ? 'quantity to add' : 'quantity to remove'}:`);
    if (!amount) return;

    const changeAmount = parseFloat(amount);
    if (isNaN(changeAmount) || changeAmount <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    try {
      await api.stockInOut(item.id, type, changeAmount);
      await loadData();
    } catch (err) {
      alert('Failed to update stock: ' + err.message);
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'low' && item.minStock && item.quantity <= item.minStock) ||
                         (filterType === 'out' && item.quantity === 0);
    
    return matchesSearch && matchesFilter;
  });

  const filteredActivities = activityHistory.filter(activity => {
    if (filterType === 'all') return true;
    return activity.type === filterType;
  });

  const getStockStatus = (item) => {
    if (item.quantity === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (item.minStock && item.quantity <= item.minStock) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900"> V2 Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {user?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="mb-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inventory'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaBox className="inline mr-2" />
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaHistory className="inline mr-2" />
              Activity History
            </button>
          </nav>
        </div>

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Items</option>
                  <option value="low">Low Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
                <button
                  onClick={handleAddItem}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus /> Add Item
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInventory.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          No items found. Add your first item to get started.
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map((item) => {
                        const status = getStockStatus(item);
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              {item.description && (
                                <div className="text-sm text-gray-500">{item.description}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.category || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {item.quantity} {item.unit}
                              </div>
                              {item.minStock && (
                                <div className="text-xs text-gray-500">Min: {item.minStock} {item.unit}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.location || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                {status.text}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleInOut(item, 'in')}
                                  className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded"
                                  title="Stock In"
                                >
                                  <FaArrowUp />
                                </button>
                                <button
                                  onClick={() => handleInOut(item, 'out')}
                                  className="text-orange-600 hover:text-orange-900 p-2 hover:bg-orange-50 rounded"
                                  title="Stock Out"
                                >
                                  <FaArrowDown />
                                </button>
                                <button
                                  onClick={() => handleEditItem(item)}
                                  className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded"
                                  title="Delete"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Activity History Tab */}
        {activeTab === 'history' && (
          <div>
            <div className="mb-6 flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Activities</option>
                <option value="add">Item Added</option>
                <option value="update">Item Updated</option>
                <option value="delete">Item Deleted</option>
                <option value="stock_in">Stock In</option>
                <option value="stock_out">Stock Out</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredActivities.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                          No activity history found.
                        </td>
                      </tr>
                    ) : (
                      filteredActivities.map((activity) => {
                        const date = new Date(activity.timestamp);
                        const getActionColor = (type) => {
                          switch (type) {
                            case 'add': return 'bg-green-100 text-green-800';
                            case 'update': return 'bg-blue-100 text-blue-800';
                            case 'delete': return 'bg-red-100 text-red-800';
                            case 'stock_in': return 'bg-emerald-100 text-emerald-800';
                            case 'stock_out': return 'bg-orange-100 text-orange-800';
                            default: return 'bg-gray-100 text-gray-800';
                          }
                        };
                        return (
                          <tr key={activity.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {date.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(activity.type)}`}>
                                {activity.action}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {activity.itemName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {activity.details}
                              {activity.quantityChange !== undefined && activity.quantityChange !== 0 && (
                                <span className={`ml-2 ${activity.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  ({activity.quantityChange > 0 ? '+' : ''}{activity.quantityChange} {activity.unit})
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <ItemForm formData={formData} setFormData={setFormData} />
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveItem}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                <FaTimesCircle /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Item</h3>
              <button onClick={() => {
                setShowEditModal(false);
                setEditingItem(null);
              }} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <ItemForm formData={formData} setFormData={setFormData} />
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveItem}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaSave /> Update
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingItem(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                <FaTimesCircle /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Item Form Component
const ItemForm = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
          <input
            type="number"
            step="0.01"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="units">Units</option>
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
            <option value="bags">Bags</option>
            <option value="boxes">Boxes</option>
            <option value="pieces">Pieces</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
        <input
          type="number"
          step="0.01"
          value={formData.minStock}
          onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Alert when stock falls below this"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

