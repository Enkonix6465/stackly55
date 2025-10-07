import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../components/language-selector";
import { ThemeToggle } from "../components/theme-toggle";
import { getCurrentUser, logoutUser } from "../utils/auth";
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Activity, 
  Search, 
  Filter,
  Download,
  LogOut,
  Settings,
  BarChart3,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Clock,
  FileText,
  PieChart,
  LineChart
} from "lucide-react";

function getUsersFromLocalStorage() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function getLoggedInUser() {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDark, setIsDark] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [showExploreData, setShowExploreData] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState('overview');

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const allUsers = getUsersFromLocalStorage();
    // Remove any admin users from the users list to prevent them from appearing
    const regularUsers = allUsers.filter(user => 
      user.id !== 'admin' && !user.isAdmin && user.role !== 'admin'
    );
    
    // If we found admin users in the list, clean them up
    if (allUsers.length !== regularUsers.length) {
      localStorage.setItem("users", JSON.stringify(regularUsers));
    }
    
    setUsers(regularUsers);
    setLoggedInUser(getLoggedInUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleDeleteUser = (user) => {
    // Prevent admin from deleting themselves or other admins
    if (user.id === 'admin' || user.isAdmin || user.role === 'admin') {
      alert('Cannot delete admin users');
      return;
    }
    
    setUserToDelete(user);
    setShowDeleteConfirm(true);
    setEditingUserId(null); // Exit edit mode when deleting
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      // Double-check protection against admin deletion
      if (userToDelete.id === 'admin' || userToDelete.isAdmin || userToDelete.role === 'admin') {
        alert('Cannot delete admin users');
        setShowDeleteConfirm(false);
        setUserToDelete(null);
        return;
      }
      
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(user => {
    // Exclude admin users from the list
    if (user.id === 'admin' || user.isAdmin || user.role === 'admin') {
      return false;
    }
    
    const matchesSearch = user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "active" && user.loginTime) ||
                         (filterStatus === "inactive" && !user.loginTime);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalUsers: users.filter(u => u.id !== 'admin' && !u.isAdmin && u.role !== 'admin').length,
    activeUsers: users.filter(u => u.loginTime && u.id !== 'admin' && !u.isAdmin && u.role !== 'admin').length,
    newRegistrations: users.filter(u => {
      const regDate = new Date(u.createdAt || Date.now());
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return regDate > weekAgo && u.id !== 'admin' && !u.isAdmin && u.role !== 'admin';
    }).length
  };

  // Data analysis functions
  const getRegistrationTrends = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last30Days.map(date => {
      const count = users.filter(user => {
        const userDate = new Date(user.createdAt || Date.now()).toISOString().split('T')[0];
        return userDate === date && user.id !== 'admin' && !user.isAdmin && user.role !== 'admin';
      }).length;
      return { date, count };
    });
  };

  const getActivityData = () => {
    const now = new Date();
    const last24Hours = users.filter(user => {
      if (!user.loginTime || user.id === 'admin' || user.isAdmin || user.role === 'admin') return false;
      const loginTime = new Date(user.loginTime);
      return (now - loginTime) < 24 * 60 * 60 * 1000;
    }).length;

    const lastWeek = users.filter(user => {
      if (!user.loginTime || user.id === 'admin' || user.isAdmin || user.role === 'admin') return false;
      const loginTime = new Date(user.loginTime);
      return (now - loginTime) < 7 * 24 * 60 * 60 * 1000;
    }).length;

    return {
      last24Hours,
      lastWeek,
      totalActive: stats.activeUsers
    };
  };

  const exportData = (format) => {
    const dataToExport = users.filter(u => u.id !== 'admin' && !u.isAdmin && u.role !== 'admin');
    
    if (format === 'csv') {
      const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Login Time', 'Logout Time', 'Status', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(user => [
          user.id,
          user.firstName || '',
          user.lastName || '',
          user.email || '',
          user.loginTime ? new Date(user.loginTime).toISOString() : '',
          user.logoutTime ? new Date(user.logoutTime).toISOString() : '',
          user.loginTime ? 'Active' : 'Inactive',
          user.createdAt ? new Date(user.createdAt).toISOString() : ''
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users_data_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users_data_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
          : 'bg-gradient-to-br from-slate-50 via-red-50 to-red-50'
      }`}
    >
      {/* Header - Updated */}
      <header className={`${isDark ? 'bg-black/70 border-white/30' : 'bg-white/70 border-black/20'} backdrop-blur-md border-b shadow-lg sticky top-0 z-50 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Right side - Language selector, theme toggle and user menu */}
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                variant="default"
                className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30' : 'text-black/80 hover:text-black hover:bg-black/10 border-black/20'} border rounded-md h-9 w-9`}
              />
              <ThemeToggle className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30' : 'text-black/80 hover:text-black hover:bg-black/10 border-black/20'} border rounded-md h-9 w-9`} />
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogout}
                  className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-white/80 hover:text-red-300 hover:bg-red-900/20' : 'text-slate-600 hover:text-red-600 hover:bg-red-50'}`}
                  title={t('nav.logout')}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {t('admin.welcome')}
          </h2>
          <p className={isDark ? 'text-red-300' : 'text-red-600'}>
            {t('admin.overview')}
          </p>
          
          {/* Admin Info Section */}
          {loggedInUser && (loggedInUser.role === 'admin' || loggedInUser.isAdmin) && (
            <div className={`mt-4 p-4 border rounded-lg ${isDark ? 'bg-gradient-to-r from-red-900/30 to-red-800/30 border-red-600/40' : 'bg-gradient-to-r from-red-50 to-red-50 border-red-200'}`}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                  <UserCheck className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-red-200' : 'text-red-800'}`}>Admin Account</h3>
                  <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                    Logged in as: {loggedInUser.firstName} {loggedInUser.lastName} ({loggedInUser.email})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${isDark ? 'bg-gray-800/50 border-gray-700/60' : 'bg-white border-slate-200/60'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  {t('admin.totalUsers')}
                </p>
                <p className={`text-3xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {stats.totalUsers}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                <Users className={`h-6 w-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${isDark ? 'bg-gray-800/50 border-gray-700/60' : 'bg-white border-slate-200/60'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  {t('admin.activeUsers')}
                </p>
                <p className={`text-3xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {stats.activeUsers}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-emerald-800/50' : 'bg-emerald-100'}`}>
                <UserCheck className={`h-6 w-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${isDark ? 'bg-gray-800/50 border-gray-700/60' : 'bg-white border-slate-200/60'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  {t('admin.newRegistrations')}
                </p>
                <p className={`text-3xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {stats.newRegistrations}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                <UserPlus className={`h-6 w-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* User Management Section */}
        <div className={`rounded-xl shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800/50 border-gray-700/60' : 'bg-white border-slate-200/60'}`}>
          {/* Section Header */}
          <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700/60 bg-gray-800/30' : 'border-slate-200/60 bg-slate-50/50'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-slate-800'}`}>
                  {t('admin.userManagement')}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  {t('admin.users')}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowExploreData(true)}
                  className="btn-animate-strong flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-sm transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
                >
                  <BarChart3 className="h-3 w-3" />
                  <span>{t('admin.actions.exploreData')}</span>
                </button>
                <button 
                  onClick={() => exportData('csv')}
                  className="btn-animate-strong flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-sm transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
                >
                  <Download className="h-3 w-3" />
                  <span>{t('admin.actions.export')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700/60 bg-gray-800/30' : 'border-slate-200/60 bg-white'}`}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    placeholder={t('admin.filters.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600/60 text-white placeholder-gray-400' : 'border-slate-300 bg-white text-black'}`}
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isDark ? 'bg-gray-700/50 border-gray-600/60 text-white' : 'border-slate-300 bg-white text-black'}`}
                >
                  <option value="all">{t('admin.filters.all')}</option>
                  <option value="active">{t('admin.filters.active')}</option>
                  <option value="inactive">{t('admin.filters.inactive')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-slate-200'}`}>
              <thead className={isDark ? 'bg-gray-800/50' : 'bg-slate-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                    {t('admin.userDetails.id')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                    {t('admin.userDetails.name')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                    {t('admin.userDetails.email')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                    {t('admin.userDetails.loginTime')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                    {t('admin.userDetails.logoutTime')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                    {t('admin.userDetails.status')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                    {t('admin.userDetails.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'bg-gray-800/30 divide-gray-700' : 'bg-white divide-slate-200'}`}>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`transition-colors ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-slate-50'}`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {user.id?.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {user.email}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {user.loginTime ? new Date(user.loginTime).toLocaleString() : '-'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {user.logoutTime ? new Date(user.logoutTime).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.loginTime 
                          ? (isDark ? 'bg-emerald-800/50 text-emerald-300' : 'bg-emerald-100 text-emerald-800')
                          : (isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-slate-100 text-slate-800')
                      }`}>
                        {user.loginTime ? t('admin.filters.active') : t('admin.filters.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {editingUserId === user.id ? (
                          // Edit mode - show delete button and cancel
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleDeleteUser(user)}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'text-red-600 hover:text-red-900 hover:bg-red-50'}`}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>{t('admin.actions.delete')}</span>
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className={`px-2 py-1 rounded-md transition-colors ${isDark ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                              {t('admin.editMode.cancel')}
                            </button>
                          </div>
                        ) : (
                          // Normal mode - show edit button
                          <button 
                            onClick={() => handleEditUser(user)}
                            className={`px-2 py-1 rounded-md transition-colors ${isDark ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                          >
                            {t('admin.actions.edit')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className={`mx-auto h-12 w-12 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
              <h3 className={`mt-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-slate-900'}`}>
                {searchTerm || filterStatus !== 'all' ? 'No users found' : 'No users yet'}
              </h3>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Users will appear here once they register.'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                <AlertTriangle className={`h-6 w-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                {t('admin.deleteConfirm.title')}
              </h3>
            </div>
            
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {t('admin.deleteConfirm.message', { 
                name: userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : '' 
              })}
            </p>
            
            <div className="flex space-x-3 justify-end">
              <button
                onClick={cancelDeleteUser}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
              >
                {t('admin.deleteConfirm.cancel')}
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {t('admin.deleteConfirm.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explore Data Modal */}
      {showExploreData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                    <BarChart3 className={`h-6 w-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                      {t('admin.exploreData.title')}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {t('admin.exploreData.subtitle')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExploreData(false)}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chart Type Selector */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700 bg-gray-800/30' : 'border-slate-200 bg-slate-50/50'}`}>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedChartType('overview')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChartType === 'overview'
                      ? (isDark ? 'bg-red-600 text-white' : 'bg-red-500 text-white')
                      : (isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  {t('admin.exploreData.overview')}
                </button>
                <button
                  onClick={() => setSelectedChartType('trends')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChartType === 'trends'
                      ? (isDark ? 'bg-red-600 text-white' : 'bg-red-500 text-white')
                      : (isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  <LineChart className="h-4 w-4 inline mr-2" />
                  {t('admin.exploreData.trends')}
                </button>
                <button
                  onClick={() => setSelectedChartType('activity')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedChartType === 'activity'
                      ? (isDark ? 'bg-red-600 text-white' : 'bg-red-500 text-white')
                      : (isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  <Activity className="h-4 w-4 inline mr-2" />
                  {t('admin.exploreData.activity')}
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {selectedChartType === 'overview' && (
                <div className="space-y-6">
                  {/* Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                          <Users className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {t('admin.totalUsers')}
                          </p>
                          <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            {stats.totalUsers}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                          <UserCheck className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {t('admin.activeUsers')}
                          </p>
                          <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            {stats.activeUsers}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                          <UserPlus className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {t('admin.newRegistrations')}
                          </p>
                          <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            {stats.newRegistrations}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simple Bar Chart Representation */}
                  <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                      {t('admin.exploreData.userDistribution')}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                          {t('admin.filters.active')}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-32 rounded-full h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${(stats.activeUsers / stats.totalUsers) * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {stats.activeUsers}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                          {t('admin.filters.inactive')}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-32 rounded-full h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div 
                              className={`h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}
                              style={{ width: `${((stats.totalUsers - stats.activeUsers) / stats.totalUsers) * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {stats.totalUsers - stats.activeUsers}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedChartType === 'trends' && (
                <div className="space-y-6">
                  <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                      {t('admin.exploreData.registrationTrends')}
                    </h4>
                    <div className="space-y-2">
                      {getRegistrationTrends().slice(-7).map((trend, index) => (
                        <div key={trend.date} className="flex items-center justify-between">
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {new Date(trend.date).toLocaleDateString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className={`w-24 rounded-full h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                              <div 
                                className="bg-red-500 h-2 rounded-full" 
                                style={{ width: `${Math.max((trend.count / Math.max(...getRegistrationTrends().map(t => t.count))) * 100, 5)}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                              {trend.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedChartType === 'activity' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                          <Clock className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {t('admin.exploreData.last24Hours')}
                          </p>
                          <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            {getActivityData().last24Hours}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                          <Calendar className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {t('admin.exploreData.lastWeek')}
                          </p>
                          <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            {getActivityData().lastWeek}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-100'}`}>
                          <Activity className={`h-5 w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {t('admin.exploreData.totalActive')}
                          </p>
                          <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            {getActivityData().totalActive}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200 bg-slate-50/50'}`}>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => exportData('csv')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>{t('admin.exploreData.exportCSV')}</span>
                  </button>
                  <button
                    onClick={() => exportData('json')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>{t('admin.exploreData.exportJSON')}</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowExploreData(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
                >
                  {t('admin.exploreData.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}