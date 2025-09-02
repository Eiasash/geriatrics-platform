import React, { useState, useEffect } from 'react';
import { DataSource, Patient, Task } from '../../data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ClipboardList, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface DashboardProps {
  dataSource: DataSource;
  language: 'en' | 'he';
}

export default function Dashboard({ dataSource, language }: DashboardProps) {
  const [roster, setRoster] = useState<Patient[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [rosterData, tasksData] = await Promise.all([
        dataSource.getRoster(),
        dataSource.getTasks()
      ]);
      setRoster(rosterData);
      setTasks(tasksData);
      if (rosterData.length > 0) {
        setSelectedPatient(rosterData[0]);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    await dataSource.updateTask(taskId, { status: 'completed' });
    await loadData();
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const stats = [
    {
      name: language === 'en' ? 'Total Patients' : 'סה״כ מטופלים',
      value: roster.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: language === 'en' ? 'Pending Tasks' : 'משימות ממתינות',
      value: pendingTasks.length,
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      name: language === 'en' ? 'Completed Today' : 'הושלמו היום',
      value: completedTasks.length,
      icon: CheckCircle2,
      color: 'bg-green-500'
    },
    {
      name: language === 'en' ? 'Critical' : 'קריטי',
      value: pendingTasks.filter(t => t.priority === 'high').length,
      icon: AlertCircle,
      color: 'bg-red-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Dashboard' : 'לוח בקרה'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' ? 'Overview of patients and tasks' : 'סקירה של מטופלים ומשימות'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={language === 'he' ? 'mr-4' : 'ml-4'}>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MMSE Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'en' ? 'MMSE Trends' : 'מגמות MMSE'}
            </h2>
            <select
              value={selectedPatient?.id || ''}
              onChange={(e) => {
                const patient = roster.find(p => p.id === e.target.value);
                setSelectedPatient(patient || null);
              }}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {roster.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {language === 'en' ? 'Bed' : 'מיטה'} {patient.bed}
                </option>
              ))}
            </select>
          </div>

          {selectedPatient && selectedPatient.mmse && selectedPatient.mmse.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={selectedPatient.mmse}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 30]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  name={language === 'en' ? 'MMSE Score' : 'ציון MMSE'}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              {language === 'en' ? 'No MMSE data available' : 'אין נתוני MMSE זמינים'}
            </div>
          )}
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Pending Tasks' : 'משימות ממתינות'}
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pendingTasks.length > 0 ? (
              pendingTasks.map(task => (
                <div key={task.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <button
                    onClick={() => handleTaskComplete(task.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    <div className="w-5 h-5 border-2 border-gray-300 rounded hover:border-blue-500 transition-colors" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{task.patientName}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.time}
                      {task.notes && (
                        <span className="ml-3">• {task.notes}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                {language === 'en' ? 'No pending tasks' : 'אין משימות ממתינות'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Patient Roster */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'en' ? 'Patient Roster' : 'רשימת מטופלים'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Name' : 'שם'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Age' : 'גיל'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Ward/Bed' : 'מחלקה/מיטה'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Latest MMSE' : 'MMSE אחרון'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'en' ? 'Diagnoses' : 'אבחנות'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roster.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.ward} / {patient.bed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.mmse && patient.mmse.length > 0 
                      ? patient.mmse[patient.mmse.length - 1].score 
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {patient.diagnoses.slice(0, 2).map((dx, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded">
                          {dx}
                        </span>
                      ))}
                      {patient.diagnoses.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                          +{patient.diagnoses.length - 2}
                        </span>
                      )}
                    </div>
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