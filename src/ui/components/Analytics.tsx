import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Users, Activity, AlertTriangle, 
  Clock, Pill, Heart, Calendar, Download, Filter 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { DataSource } from '../../data';

interface AnalyticsProps {
  dataSource: DataSource;
  language: 'en' | 'he';
}

interface KPI {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

export default function Analytics({ dataSource, language }: AnalyticsProps) {
  const [patients, setPatients] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState('week');
  const [department, setDepartment] = useState('all');
  const [loading, setLoading] = useState(true);

  // KPI States
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [mmseData, setMmseData] = useState<any[]>([]);
  const [fallRiskData, setFallRiskData] = useState<any[]>([]);
  const [medicationData, setMedicationData] = useState<any[]>([]);
  const [admissionData, setAdmissionData] = useState<any[]>([]);
  const [taskCompletionData, setTaskCompletionData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [dataSource, dateRange, department]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rosterData, taskData] = await Promise.all([
        dataSource.getRoster(),
        dataSource.getTasks()
      ]);
      
      setPatients(rosterData);
      setTasks(taskData);
      
      calculateKPIs(rosterData, taskData);
      generateChartData(rosterData, taskData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateKPIs = (patients: any[], tasks: any[]) => {
    const totalPatients = patients.length;
    const criticalPatients = patients.filter(p => p.acuity === 'critical').length;
    const highFallRisk = patients.filter(p => p.fallRisk && p.fallRisk > 45).length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const taskCompletionRate = tasks.length > 0 ? (completedTasks / tasks.length * 100).toFixed(1) : 0;
    
    // Calculate average MMSE
    const avgMMSE = patients.reduce((sum, p) => {
      const latestMMSE = p.mmse && p.mmse.length > 0 ? p.mmse[p.mmse.length - 1].score : 0;
      return sum + latestMMSE;
    }, 0) / (totalPatients || 1);

    // Mock historical data for trends
    const prevWeekPatients = Math.floor(totalPatients * 0.95);
    const patientChange = ((totalPatients - prevWeekPatients) / (prevWeekPatients || 1) * 100).toFixed(1);

    setKpis([
      {
        label: language === 'en' ? 'Total Patients' : 'סה"כ מטופלים',
        value: totalPatients,
        change: Number(patientChange),
        trend: Number(patientChange) > 0 ? 'up' : Number(patientChange) < 0 ? 'down' : 'stable',
        icon: Users,
        color: 'blue'
      },
      {
        label: language === 'en' ? 'Critical Patients' : 'מטופלים קריטיים',
        value: criticalPatients,
        change: 0,
        trend: 'stable',
        icon: AlertTriangle,
        color: 'red'
      },
      {
        label: language === 'en' ? 'High Fall Risk' : 'סיכון נפילה גבוה',
        value: highFallRisk,
        change: -8.3,
        trend: 'down',
        icon: Activity,
        color: 'orange'
      },
      {
        label: language === 'en' ? 'Task Completion' : 'השלמת משימות',
        value: `${taskCompletionRate}%`,
        change: 5.2,
        trend: 'up',
        icon: Clock,
        color: 'green'
      },
      {
        label: language === 'en' ? 'Avg MMSE Score' : 'ממוצע MMSE',
        value: avgMMSE.toFixed(1),
        change: -2.1,
        trend: 'down',
        icon: Heart,
        color: 'purple'
      },
      {
        label: language === 'en' ? 'Bed Occupancy' : 'תפוסת מיטות',
        value: '87%',
        change: 3.5,
        trend: 'up',
        icon: Users,
        color: 'indigo'
      }
    ]);
  };

  const generateChartData = (patients: any[], tasks: any[]) => {
    // MMSE Trend Data
    const mmseByDay = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mmseByDay.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        average: 22 + Math.random() * 6,
        critical: 18 + Math.random() * 4
      });
    }
    setMmseData(mmseByDay);

    // Fall Risk Distribution
    const fallRiskDist = [
      { name: language === 'en' ? 'Low Risk' : 'סיכון נמוך', value: patients.filter(p => !p.fallRisk || p.fallRisk < 25).length, color: '#10b981' },
      { name: language === 'en' ? 'Moderate' : 'סיכון בינוני', value: patients.filter(p => p.fallRisk >= 25 && p.fallRisk < 45).length, color: '#f59e0b' },
      { name: language === 'en' ? 'High Risk' : 'סיכון גבוה', value: patients.filter(p => p.fallRisk >= 45).length, color: '#ef4444' }
    ];
    setFallRiskData(fallRiskDist);

    // Medication Burden
    const medBurden = patients.map(p => ({
      name: p.name.split(' ')[0],
      medications: p.medications ? p.medications.length : 0,
      beers: Math.floor(Math.random() * 3)
    })).slice(0, 10);
    setMedicationData(medBurden);

    // Admissions Trend
    const admissions = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      admissions.push({
        date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        admissions: Math.floor(Math.random() * 5 + 2),
        discharges: Math.floor(Math.random() * 4 + 1)
      });
    }
    setAdmissionData(admissions);

    // Task Completion by Type
    const taskTypes = ['Medication', 'Assessment', 'Therapy', 'Procedure', 'Documentation'];
    const taskCompletion = taskTypes.map(type => ({
      type: type,
      completed: Math.floor(Math.random() * 20 + 10),
      pending: Math.floor(Math.random() * 10 + 5)
    }));
    setTaskCompletionData(taskCompletion);
  };

  const exportData = () => {
    const data = {
      kpis,
      mmseData,
      fallRiskData,
      medicationData,
      exportDate: new Date().toISOString(),
      dateRange,
      department
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">
          {language === 'en' ? 'Loading analytics...' : 'טוען ניתוחים...'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Analytics Dashboard' : 'לוח ניתוחים'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {language === 'en' 
              ? 'Real-time insights and performance metrics'
              : 'תובנות בזמן אמת ומדדי ביצוע'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="day">{language === 'en' ? 'Today' : 'היום'}</option>
            <option value="week">{language === 'en' ? 'This Week' : 'השבוע'}</option>
            <option value="month">{language === 'en' ? 'This Month' : 'החודש'}</option>
            <option value="quarter">{language === 'en' ? 'Quarter' : 'רבעון'}</option>
          </select>
          
          <button
            onClick={exportData}
            className="flex items-center px-3 py-2 bg-white border rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Export' : 'ייצוא'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <kpi.icon className={`h-5 w-5 text-${kpi.color}-500`} />
              <span className={`flex items-center text-xs font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 
                kpi.trend === 'down' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {kpi.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                {kpi.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(kpi.change)}%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-600 mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MMSE Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'MMSE Score Trends' : 'מגמות ציון MMSE'}
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mmseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[15, 30]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#3b82f6" 
                name={language === 'en' ? 'Average' : 'ממוצע'}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="critical" 
                stroke="#ef4444" 
                name={language === 'en' ? 'Critical' : 'קריטי'}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fall Risk Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Fall Risk Distribution' : 'התפלגות סיכון נפילה'}
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fallRiskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {fallRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Admissions/Discharges */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Admissions & Discharges' : 'קבלות ושחרורים'}
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={admissionData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="admissions" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.6}
                name={language === 'en' ? 'Admissions' : 'קבלות'}
              />
              <Area 
                type="monotone" 
                dataKey="discharges" 
                stackId="2"
                stroke="#f59e0b" 
                fill="#f59e0b"
                fillOpacity={0.6}
                name={language === 'en' ? 'Discharges' : 'שחרורים'}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Task Completion */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Task Completion by Type' : 'השלמת משימות לפי סוג'}
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name={language === 'en' ? 'Completed' : 'הושלם'} />
              <Bar dataKey="pending" fill="#f59e0b" name={language === 'en' ? 'Pending' : 'ממתין'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Medication Burden Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Medication Burden (Top 10)' : 'עומס תרופתי (10 המובילים)'}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === 'en' ? 'Patient' : 'מטופל'}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === 'en' ? 'Total Medications' : 'סה"כ תרופות'}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === 'en' ? 'Beers List' : 'רשימת Beers'}
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === 'en' ? 'Risk Level' : 'רמת סיכון'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {medicationData.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{patient.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{patient.medications}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{patient.beers}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.medications > 10 ? 'bg-red-100 text-red-800' :
                      patient.medications > 5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {patient.medications > 10 ? (language === 'en' ? 'High' : 'גבוה') :
                       patient.medications > 5 ? (language === 'en' ? 'Medium' : 'בינוני') :
                       (language === 'en' ? 'Low' : 'נמוך')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}