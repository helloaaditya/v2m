import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaSearch, 
  FaBox, FaHistory, FaArrowUp, FaArrowDown, FaFilter,
  FaTimes, FaSave, FaTimesCircle, FaShoppingBag, FaMoon, FaSun, FaCog
} from 'react-icons/fa';
import { api } from '../utils/api';
import { productCategories } from '../data/products';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [activityHistory, setActivityHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showItemHistoryModal, setShowItemHistoryModal] = useState(false);
  const [selectedItemForHistory, setSelectedItemForHistory] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockFormData, setStockFormData] = useState({
    type: 'in',
    quantity: '',
    note: '',
    reference: ''
  });
  const [selectedItemForStock, setSelectedItemForStock] = useState(null);
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
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'waterproofing',
    description: '',
    applications: '',
    specifications: '',
    packaging: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [inv, activities] = await Promise.all([
        api.getInventory().catch(() => []),
        api.getActivities().catch(() => [])
      ]);
      setInventory(inv || []);
      setActivityHistory(activities || []);
      
      // Load products separately (public endpoint, no auth needed)
      try {
        const prods = await api.getProducts();
        console.log('Loaded products:', prods?.length || 0);
        setProducts(prods || []);
      } catch (prodErr) {
        console.error('Error loading products:', prodErr);
        setProducts([]);
        // Don't show error for products, just use empty array
      }
    } catch (err) {
      const errorMessage = err.message || 'Unknown error';
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        setError('Cannot connect to backend server. Please check if the backend is deployed and VITE_API_URL is configured correctly.');
      } else {
        setError('Failed to load data. Please check if the backend server is running.');
      }
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

  const handleInOut = (item, type) => {
    setSelectedItemForStock(item);
    setStockFormData({
      type: type,
      quantity: '',
      note: '',
      reference: ''
    });
    setShowStockModal(true);
  };

  const handleStockSubmit = async () => {
    if (!stockFormData.quantity || !stockFormData.note.trim()) {
      alert('Please fill in required fields (Quantity and Note)');
      return;
    }

    const quantity = parseFloat(stockFormData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid positive number for quantity');
      return;
    }

    try {
      await api.stockInOut(
        selectedItemForStock.id,
        stockFormData.type,
        quantity,
        stockFormData.note.trim(),
        stockFormData.reference.trim() || null
      );
      setShowStockModal(false);
      setSelectedItemForStock(null);
      setStockFormData({ type: 'in', quantity: '', note: '', reference: '' });
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
    if (item.quantity === 0) return { text: 'Out of Stock', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' };
    if (item.minStock && item.quantity <= item.minStock) return { text: 'Low Stock', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' };
    return { text: 'In Stock', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">V2 Admin</h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Welcome, {user?.username}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Settings"
              >
                <FaCog />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base min-h-[44px] flex-1 sm:flex-initial"
              >
                <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-fosroc-red"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <nav className="flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-h-[44px] ${
                activeTab === 'inventory'
                  ? 'border-fosroc-red text-fosroc-red dark:text-fosroc-red-light'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <FaBox className="inline mr-2" />
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-h-[44px] ${
                activeTab === 'history'
                  ? 'border-fosroc-red text-fosroc-red dark:text-fosroc-red-light'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <FaHistory className="inline mr-2" />
              Activity History
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-h-[44px] ${
                activeTab === 'products'
                  ? 'border-fosroc-red text-fosroc-red dark:text-fosroc-red-light'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <FaShoppingBag className="inline mr-2" />
              Products
            </button>
          </nav>
        </div>

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="flex-1 sm:flex-initial px-4 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base sm:text-sm min-h-[44px]"
                >
                  <option value="all">All Items</option>
                  <option value="low">Low Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
                <button
                  onClick={handleAddItem}
                  className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-fosroc-red text-white rounded-lg hover:bg-fosroc-red-dark transition-colors text-base sm:text-sm min-h-[44px] w-full sm:w-auto"
                >
                  <FaPlus /> Add Item
                </button>
              </div>
            </div>

            {/* Inventory - Mobile Cards / Desktop Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {/* Mobile Card View */}
              <div className="block md:hidden">
                {filteredInventory.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No items found. Add your first item to get started.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredInventory.map((item) => {
                      const status = getStockStatus(item);
                      return (
                        <div key={item.id} className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">{item.name}</h3>
                              {item.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                              )}
                            </div>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                              {status.text}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Category:</span>
                              <span className="ml-2 text-gray-900 dark:text-gray-100">{item.category || '-'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Location:</span>
                              <span className="ml-2 text-gray-900 dark:text-gray-100">{item.location || '-'}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-500 dark:text-gray-400">Quantity:</span>
                              <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">
                                {item.quantity} {item.unit}
                              </span>
                              {item.minStock && (
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(Min: {item.minStock} {item.unit})</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <button
                              onClick={() => handleInOut(item, 'in')}
                              className="flex-1 min-w-[80px] flex items-center justify-center gap-1 px-3 py-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors min-h-[44px]"
                              title="Stock In"
                            >
                              <FaArrowUp /> In
                            </button>
                            <button
                              onClick={() => handleInOut(item, 'out')}
                              className="flex-1 min-w-[80px] flex items-center justify-center gap-1 px-3 py-2 text-sm text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors min-h-[44px]"
                              title="Stock Out"
                            >
                              <FaArrowDown /> Out
                            </button>
                            <button
                              onClick={() => handleEditItem(item)}
                              className="flex-1 min-w-[80px] flex items-center justify-center gap-1 px-3 py-2 text-sm text-fosroc-red-dark dark:text-fosroc-red-light bg-fosroc-red-lightest dark:bg-fosroc-red-dark/30 rounded-lg hover:bg-fosroc-red-lightest dark:hover:bg-fosroc-red-dark/50 transition-colors min-h-[44px]"
                              title="Edit"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => {
                                setSelectedItemForHistory(item);
                                setShowItemHistoryModal(true);
                              }}
                              className="flex-1 min-w-[80px] flex items-center justify-center gap-1 px-3 py-2 text-sm text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors min-h-[44px]"
                              title="View History"
                            >
                              <FaHistory /> History
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="flex-1 min-w-[80px] flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors min-h-[44px]"
                              title="Delete"
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredInventory.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                          No items found. Add your first item to get started.
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map((item) => {
                        const status = getStockStatus(item);
                        return (
                          <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                              {item.description && (
                                <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{item.category || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">
                                {item.quantity} {item.unit}
                              </div>
                              {item.minStock && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">Min: {item.minStock} {item.unit}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">{item.location || '-'}</div>
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
                                  className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 p-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                  title="Stock In"
                                >
                                  <FaArrowUp />
                                </button>
                                <button
                                  onClick={() => handleInOut(item, 'out')}
                                  className="text-orange-600 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300 p-2 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                  title="Stock Out"
                                >
                                  <FaArrowDown />
                                </button>
                                <button
                                  onClick={() => handleEditItem(item)}
                                  className="text-fosroc-red dark:text-fosroc-red-light hover:text-fosroc-red-dark dark:hover:text-fosroc-red-light p-2 hover:bg-fosroc-red-lightest dark:hover:bg-fosroc-red-dark/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                  title="Edit"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                  title="Delete"
                                >
                                  <FaTrash />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedItemForHistory(item);
                                    setShowItemHistoryModal(true);
                                  }}
                                  className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 p-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                  title="View History"
                                >
                                  <FaHistory />
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red"
              >
                <option value="all">All Activities</option>
                <option value="add">Item Added</option>
                <option value="update">Item Updated</option>
                <option value="delete">Item Deleted</option>
                <option value="stock_in">Stock In</option>
                <option value="stock_out">Stock Out</option>
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {/* Mobile Card View */}
              <div className="block md:hidden">
                {filteredActivities.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No activity history found.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredActivities.map((activity) => {
                      const date = new Date(activity.timestamp);
                      const getActionColor = (type) => {
                        switch (type) {
                          case 'add': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
                          case 'update': return 'bg-fosroc-red-lightest dark:bg-fosroc-red-dark/30 text-fosroc-red-dark dark:text-fosroc-red-light';
                          case 'delete': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
                          case 'stock_in': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
                          case 'stock_out': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
                          default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
                        }
                      };
                      return (
                        <div key={activity.id} className="p-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(activity.type)}`}>
                              {activity.action}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{date.toLocaleDateString()}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.itemName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.details}
                            {activity.quantityChange !== undefined && activity.quantityChange !== 0 && (
                              <span className={`ml-2 ${activity.quantityChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                ({activity.quantityChange > 0 ? '+' : ''}{activity.quantityChange} {activity.unit})
                              </span>
                            )}
                          </div>
                          {(activity.note || activity.reference) && (
                            <div className="mt-2 space-y-1 text-xs">
                              {activity.note && (
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400 font-medium">Note:</span>
                                  <span className="ml-1 text-gray-600 dark:text-gray-300">{activity.note}</span>
                                </div>
                              )}
                              {activity.reference && (
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400 font-medium">Ref:</span>
                                  <span className="ml-1 text-gray-600 dark:text-gray-300">{activity.reference}</span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 dark:text-gray-500">{date.toLocaleTimeString()}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredActivities.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                          No activity history found.
                        </td>
                      </tr>
                    ) : (
                      filteredActivities.map((activity) => {
                        const date = new Date(activity.timestamp);
                        const getActionColor = (type) => {
                          switch (type) {
                            case 'add': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
                            case 'update': return 'bg-fosroc-red-lightest dark:bg-fosroc-red-dark/30 text-fosroc-red-dark dark:text-fosroc-red-light';
                            case 'delete': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
                            case 'stock_in': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
                            case 'stock_out': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
                            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
                          }
                        };
                        return (
                          <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                              {date.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(activity.type)}`}>
                                {activity.action}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {activity.itemName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                              <div>{activity.details}</div>
                              {activity.quantityChange !== undefined && activity.quantityChange !== 0 && (
                                <span className={`ml-2 ${activity.quantityChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  ({activity.quantityChange > 0 ? '+' : ''}{activity.quantityChange} {activity.unit})
                                </span>
                              )}
                              {(activity.note || activity.reference) && (
                                <div className="mt-1 space-y-1 text-xs">
                                  {activity.note && (
                                    <div>
                                      <span className="text-gray-500 dark:text-gray-400 font-medium">Note:</span>
                                      <span className="ml-1 text-gray-600 dark:text-gray-300">{activity.note}</span>
                                    </div>
                                  )}
                                  {activity.reference && (
                                    <div>
                                      <span className="text-gray-500 dark:text-gray-400 font-medium">Ref:</span>
                                      <span className="ml-1 text-gray-600 dark:text-gray-300">{activity.reference}</span>
                                    </div>
                                  )}
                                </div>
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

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            {loading && (
              <div className="mb-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-fosroc-red"></div>
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-sm sm:text-base">No products found. Make sure the backend server is running and products.json exists.</span>
                <button
                  onClick={loadData}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm sm:text-base min-h-[44px] w-full sm:w-auto"
                >
                  Reload
                </button>
              </div>
            )}
            {!loading && products.length > 0 && (
              <div className="mb-4 text-sm text-gray-600">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </div>
            )}
            <div className="mb-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="flex-1 sm:flex-initial px-4 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base sm:text-sm min-h-[44px]"
                >
                  <option value="all">All Categories</option>
                  {productCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setProductFormData({
                      name: '',
                      category: 'waterproofing',
                      description: '',
                      applications: '',
                      specifications: '',
                      packaging: '',
                      imageUrl: ''
                    });
                    setShowProductModal(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-fosroc-red text-white rounded-lg hover:bg-fosroc-red-dark transition-colors text-base sm:text-sm min-h-[44px] w-full sm:w-auto"
                >
                  <FaPlus /> Add Product
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {/* Mobile Card View */}
              <div className="block md:hidden">
                {(() => {
                  const filtered = products.filter(p => {
                    if (!p || !p.name) return false;
                    const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                         (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = filterType === 'all' || p.category === filterType;
                    return matchesSearch && matchesCategory;
                  });
                  
                  if (filtered.length === 0) {
                    return (
                      <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        {products.length === 0 
                          ? 'No products found. Add your first product to get started.'
                          : 'No products match your search criteria.'}
                      </div>
                    );
                  }
                  
                  return (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filtered.map((product) => (
                        <div key={product.id} className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white flex-1">{product.name}</h3>
                            <div className="flex gap-2 ml-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setProductFormData({
                                    name: product.name,
                                    category: product.category,
                                    description: product.description,
                                    applications: Array.isArray(product.applications) ? product.applications.join('\n') : product.applications || '',
                                    specifications: product.specifications || '',
                                    packaging: product.packaging || '',
                                    imageUrl: product.imageUrl || ''
                                  });
                                  setShowProductModal(true);
                                }}
                                className="text-fosroc-red dark:text-fosroc-red-light hover:text-fosroc-red-dark dark:hover:text-fosroc-red-light p-2 hover:bg-fosroc-red-lightest dark:hover:bg-fosroc-red-dark/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm('Are you sure you want to delete this product?')) {
                                    try {
                                      await api.deleteProduct(product.id);
                                      await loadData();
                                    } catch (err) {
                                      alert('Failed to delete product: ' + err.message);
                                    }
                                  }
                                }}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Category:</span>
                              <span className="ml-2 text-gray-900 dark:text-gray-100">
                                {productCategories.find(c => c.id === product.category)?.name || product.category}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Packaging:</span>
                              <span className="ml-2 text-gray-900 dark:text-gray-100">{product.packaging || '-'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Description:</span>
                              <p className="mt-1 text-gray-700 dark:text-gray-300">{product.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Packaging</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {(() => {
                      const filtered = products.filter(p => {
                        if (!p || !p.name) return false;
                        const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                             (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesCategory = filterType === 'all' || p.category === filterType;
                        return matchesSearch && matchesCategory;
                      });
                      
                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                              {products.length === 0 
                                ? 'No products found. Add your first product to get started.'
                                : 'No products match your search criteria.'}
                            </td>
                          </tr>
                        );
                      }
                      
                      return filtered.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {productCategories.find(c => c.id === product.category)?.name || product.category}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">{product.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100">{product.packaging || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setProductFormData({
                                    name: product.name,
                                    category: product.category,
                                    description: product.description,
                                    applications: Array.isArray(product.applications) ? product.applications.join('\n') : product.applications || '',
                                    specifications: product.specifications || '',
                                    packaging: product.packaging || '',
                                    imageUrl: product.imageUrl || ''
                                  });
                                  setShowProductModal(true);
                                }}
                                className="text-fosroc-red dark:text-fosroc-red-light hover:text-fosroc-red-dark dark:hover:text-fosroc-red-light p-2 hover:bg-fosroc-red-lightest dark:hover:bg-fosroc-red-dark/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm('Are you sure you want to delete this product?')) {
                                    try {
                                      await api.deleteProduct(product.id);
                                      await loadData();
                                    } catch (err) {
                                      alert('Failed to delete product: ' + err.message);
                                    }
                                  }
                                }}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-fosroc-red/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => {
                setShowProductModal(false);
                setEditingProduct(null);
              }} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <ProductForm formData={productFormData} setFormData={setProductFormData} />
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={async () => {
                  if (!productFormData.name || !productFormData.description) {
                    alert('Please fill in required fields (Name and Description)');
                    return;
                  }

                  try {
                    const productData = {
                      name: productFormData.name,
                      category: productFormData.category,
                      description: productFormData.description,
                      applications: productFormData.applications.split('\n').filter(a => a.trim()),
                      specifications: productFormData.specifications,
                      packaging: productFormData.packaging,
                      imageUrl: productFormData.imageUrl || ''
                    };

                    if (editingProduct) {
                      await api.updateProduct(editingProduct.id, productData);
                    } else {
                      await api.createProduct(productData);
                    }

                    setShowProductModal(false);
                    setEditingProduct(null);
                    await loadData();
                  } catch (err) {
                    alert('Failed to save product: ' + err.message);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-fosroc-red text-white rounded-lg hover:bg-fosroc-red-dark transition-colors min-h-[44px] text-base sm:text-sm"
              >
                <FaSave /> {editingProduct ? 'Update' : 'Save'}
              </button>
              <button
                onClick={() => {
                  setShowProductModal(false);
                  setEditingProduct(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors min-h-[44px] text-base sm:text-sm"
              >
                <FaTimesCircle /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item History Modal */}
      {showItemHistoryModal && selectedItemForHistory && (
        <div className="fixed inset-0 bg-fosroc-red/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Activity History</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedItemForHistory.name}</p>
              </div>
              <button
                onClick={() => {
                  setShowItemHistoryModal(false);
                  setSelectedItemForHistory(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {(() => {
                const itemActivities = activityHistory.filter(activity => 
                  activity.itemName === selectedItemForHistory.name
                );
                
                if (itemActivities.length === 0) {
                  return (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <FaHistory className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-4" />
                      <p>No activity history found for this item.</p>
                    </div>
                  );
                }
                
                return (
                  <div className="space-y-4">
                    {itemActivities.map((activity) => {
                      const date = new Date(activity.timestamp);
                      const getActionColor = (type) => {
                        switch (type) {
                          case 'add': return 'bg-green-100 text-green-800 border-green-200';
                          case 'update': return 'bg-fosroc-red-lightest text-fosroc-red-dark border-fosroc-red-lighter';
                          case 'delete': return 'bg-red-100 text-red-800 border-red-200';
                          case 'stock_in': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
                          case 'stock_out': return 'bg-orange-100 text-orange-800 border-orange-200';
                          default: return 'bg-gray-100 text-gray-800 border-gray-200';
                        }
                      };
                      
                      return (
                        <div
                          key={activity.id}
                          className={`border-l-4 rounded-lg p-4 bg-white shadow-sm ${getActionColor(activity.type)}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getActionColor(activity.type)}`}>
                                {activity.action}
                              </span>
                              <span className="text-xs text-gray-500">
                                {date.toLocaleString()}
                              </span>
                            </div>
                            {activity.username && (
                              <span className="text-xs text-gray-500">
                                by {activity.username}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {activity.details}
                          </div>
                          {(activity.note || activity.reference) && (
                            <div className="mt-2 space-y-1">
                              {activity.note && (
                                <div className="text-sm">
                                  <span className="text-gray-500 dark:text-gray-400 font-medium">Note:</span>
                                  <span className="ml-2 text-gray-700 dark:text-gray-300">{activity.note}</span>
                                </div>
                              )}
                              {activity.reference && (
                                <div className="text-sm">
                                  <span className="text-gray-500 dark:text-gray-400 font-medium">Reference:</span>
                                  <span className="ml-2 text-gray-700 dark:text-gray-300">{activity.reference}</span>
                                </div>
                              )}
                            </div>
                          )}
                          {activity.quantityChange !== undefined && activity.quantityChange !== 0 && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                              <div className="flex-1">
                                <span className="text-gray-500 dark:text-gray-400">Old Quantity:</span>
                                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{activity.oldQuantity} {activity.unit}</span>
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-500 dark:text-gray-400">New Quantity:</span>
                                <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{activity.newQuantity} {activity.unit}</span>
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-500 dark:text-gray-400">Change:</span>
                                <span className={`ml-2 font-medium ${activity.quantityChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {activity.quantityChange > 0 ? '+' : ''}{activity.quantityChange} {activity.unit}
                                </span>
                              </div>
                            </div>
                          )}
                          {(activity.quantity !== undefined && activity.quantityChange === undefined) && (
                            <div className="text-sm mt-2 text-gray-600">
                              <span className="font-medium">Quantity:</span> {activity.quantity} {activity.unit}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <button
                onClick={() => {
                  setShowItemHistoryModal(false);
                  setSelectedItemForHistory(null);
                }}
                className="w-full px-4 py-3 sm:py-2 bg-fosroc-red text-white rounded-lg hover:bg-fosroc-red-dark transition-colors min-h-[44px] text-base sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock In/Out Modal */}
      {showStockModal && selectedItemForStock && (
        <div className="fixed inset-0 bg-fosroc-red/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-4 sm:p-6 my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {stockFormData.type === 'in' ? 'Stock In' : 'Stock Out'} - {selectedItemForStock.name}
              </h3>
              <button
                onClick={() => {
                  setShowStockModal(false);
                  setSelectedItemForStock(null);
                  setStockFormData({ type: 'in', quantity: '', note: '', reference: '' });
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Stock
                </label>
                <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {selectedItemForStock.quantity} {selectedItemForStock.unit}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity {stockFormData.type === 'in' ? 'to Add' : 'to Remove'} *
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={stockFormData.quantity}
                  onChange={(e) => setStockFormData({ ...stockFormData, quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base sm:text-sm"
                  placeholder={`Enter quantity in ${selectedItemForStock.unit}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Note *
                </label>
                <textarea
                  value={stockFormData.note}
                  onChange={(e) => setStockFormData({ ...stockFormData, note: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base sm:text-sm resize-none"
                  placeholder="Enter note (required)"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reference <span className="text-gray-500 dark:text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={stockFormData.reference}
                  onChange={(e) => setStockFormData({ ...stockFormData, reference: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base sm:text-sm"
                  placeholder="Enter reference (e.g., Invoice #, PO #, etc.)"
                />
              </div>
              {stockFormData.quantity && !isNaN(parseFloat(stockFormData.quantity)) && (
                <div className="p-3 bg-fosroc-red-lightest dark:bg-fosroc-red-dark/30 rounded-lg">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">New Quantity:</span>{' '}
                    <span className={stockFormData.type === 'in' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
                      {stockFormData.type === 'in'
                        ? selectedItemForStock.quantity + parseFloat(stockFormData.quantity || 0)
                        : Math.max(0, selectedItemForStock.quantity - parseFloat(stockFormData.quantity || 0))
                      } {selectedItemForStock.unit}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleStockSubmit}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg transition-colors min-h-[44px] text-base sm:text-sm ${
                  stockFormData.type === 'in'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 text-white'
                }`}
              >
                <FaSave /> {stockFormData.type === 'in' ? 'Add Stock' : 'Remove Stock'}
              </button>
              <button
                onClick={() => {
                  setShowStockModal(false);
                  setSelectedItemForStock(null);
                  setStockFormData({ type: 'in', quantity: '', note: '', reference: '' });
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors min-h-[44px] text-base sm:text-sm"
              >
                <FaTimesCircle /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-fosroc-red/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-4 sm:p-6 my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-fosroc-red' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">User Information</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Username: {user?.username}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Logged in as: Admin</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-full px-4 py-2 bg-fosroc-red text-white rounded-lg hover:bg-fosroc-red-dark transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-fosroc-red/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-4 sm:p-6 my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FaTimes />
              </button>
            </div>
            <ItemForm formData={formData} setFormData={setFormData} />
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSaveItem}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-fosroc-red text-white rounded-lg hover:bg-fosroc-red-dark transition-colors min-h-[44px] text-base sm:text-sm"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors min-h-[44px] text-base sm:text-sm"
              >
                <FaTimesCircle /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-fosroc-red/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-4 sm:p-6 my-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Item</h3>
              <button onClick={() => {
                setShowEditModal(false);
                setEditingItem(null);
              }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FaTimes />
              </button>
            </div>
            <ItemForm formData={formData} setFormData={setFormData} />
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSaveItem}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-fosroc-red text-white rounded-lg hover:bg-fosroc-red-dark transition-colors min-h-[44px] text-base sm:text-sm"
              >
                <FaSave /> Update
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingItem(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors min-h-[44px] text-base sm:text-sm"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</label>
          <input
            type="number"
            step="0.01"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Stock Level</label>
        <input
          type="number"
          step="0.01"
          value={formData.minStock}
          onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Alert when stock falls below this"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );
};

// Product Form Component
const ProductForm = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {productCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applications (one per line)</label>
        <textarea
          value={formData.applications}
          onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Basement waterproofing&#10;Terrace waterproofing&#10;Water tank protection"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter each application on a new line</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specifications</label>
        <input
          type="text"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Coverage: 1.5-2.0 kg/sqm per coat"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Packaging</label>
        <input
          type="text"
          value={formData.packaging}
          onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="20L, 200L"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fosroc-red focus:border-fosroc-red bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="https://example.com/product-image.jpg"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter a valid image URL. The image will be displayed on the products page.</p>
        {formData.imageUrl && (
          <div className="mt-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Preview:</p>
            <img 
              src={formData.imageUrl} 
              alt="Product preview" 
              className="w-full h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <p className="text-xs text-red-500 mt-1" style={{display: 'none'}}>Failed to load image. Please check the URL.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

