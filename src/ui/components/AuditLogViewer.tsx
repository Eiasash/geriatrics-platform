import React, { useState, useEffect } from 'react';
import { Shield, Download, Filter, Search, AlertTriangle, Info, AlertCircle, XCircle } from 'lucide-react';
import { auditLogger, AuditLog } from '../../services/auditLog';

interface AuditLogViewerProps {
  language: 'en' | 'he';
}

export default function AuditLogViewer({ language }: AuditLogViewerProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadLogs();
    // Refresh logs every 5 seconds
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, categoryFilter, severityFilter, dateFilter]);

  const loadLogs = () => {
    const allLogs = auditLogger.getLogs({ limit: 1000 });
    setLogs(allLogs);
  };

  const filterLogs = () => {
    let filtered = [...logs];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        log.userName.toLowerCase().includes(term) ||
        log.action.toLowerCase().includes(term) ||
        log.resource.toLowerCase().includes(term) ||
        (log.details && JSON.stringify(log.details).toLowerCase().includes(term))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(log => log.category === categoryFilter);
    }

    // Severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter(log => log.severity === severityFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let startDate: Date;
      
      switch (dateFilter) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          startDate = new Date(0);
      }
      
      filtered = filtered.filter(log => new Date(log.timestamp) >= startDate);
    }

    setFilteredLogs(filtered);
  };

  const exportLogs = () => {
    const data = auditLogger.exportLogs('csv');
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'error':
        return 'bg-red-50 text-red-700';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700';
      default:
        return 'bg-blue-50 text-blue-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'auth':
        return 'bg-purple-100 text-purple-800';
      case 'clinical':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-orange-100 text-orange-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-indigo-600" />
            {language === 'en' ? 'Audit Log' : 'יומן ביקורת'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {language === 'en' 
              ? 'Track all system activities and security events'
              : 'מעקב אחר כל פעילויות המערכת ואירועי אבטחה'}
          </p>
        </div>

        <button
          onClick={exportLogs}
          className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Export CSV' : 'ייצוא CSV'}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'en' ? 'Search logs...' : 'חפש ביומן...'}
              className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">{language === 'en' ? 'All Categories' : 'כל הקטגוריות'}</option>
            <option value="auth">{language === 'en' ? 'Authentication' : 'אימות'}</option>
            <option value="clinical">{language === 'en' ? 'Clinical' : 'קליני'}</option>
            <option value="data">{language === 'en' ? 'Data Access' : 'גישה לנתונים'}</option>
            <option value="admin">{language === 'en' ? 'Admin' : 'מנהל'}</option>
            <option value="system">{language === 'en' ? 'System' : 'מערכת'}</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">{language === 'en' ? 'All Severities' : 'כל הרמות'}</option>
            <option value="info">{language === 'en' ? 'Info' : 'מידע'}</option>
            <option value="warning">{language === 'en' ? 'Warning' : 'אזהרה'}</option>
            <option value="error">{language === 'en' ? 'Error' : 'שגיאה'}</option>
            <option value="critical">{language === 'en' ? 'Critical' : 'קריטי'}</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">{language === 'en' ? 'All Time' : 'כל הזמן'}</option>
            <option value="today">{language === 'en' ? 'Today' : 'היום'}</option>
            <option value="week">{language === 'en' ? 'Last 7 Days' : '7 ימים אחרונים'}</option>
            <option value="month">{language === 'en' ? 'This Month' : 'החודש'}</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">
            {language === 'en' 
              ? `${filteredLogs.length} entries found`
              : `נמצאו ${filteredLogs.length} רשומות`}
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Timestamp' : 'זמן'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'User' : 'משתמש'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Action' : 'פעולה'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Resource' : 'משאב'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Category' : 'קטגוריה'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Severity' : 'חומרה'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {language === 'en' ? 'No audit logs found' : 'לא נמצאו רשומות ביקורת'}
                  </td>
                </tr>
              ) : (
                filteredLogs.slice(0, 100).map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        {log.resource}
                        {log.resourceId && (
                          <span className="text-gray-500 text-xs block">
                            ID: {log.resourceId}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(log.category)}`}>
                        {log.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getSeverityIcon(log.severity)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length > 100 && (
          <div className="px-6 py-3 bg-gray-50 border-t text-sm text-gray-600 text-center">
            {language === 'en' 
              ? `Showing 100 of ${filteredLogs.length} entries`
              : `מציג 100 מתוך ${filteredLogs.length} רשומות`}
          </div>
        )}
      </div>
    </div>
  );
}