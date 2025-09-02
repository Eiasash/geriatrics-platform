import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { createDataSource, DataSource } from '../data';
import { createAuthProvider, AuthProvider, User } from '../auth';
import Dashboard from './components/Dashboard';
import NoteAnalyzer from './components/NoteAnalyzer';
import PacksImporter from './components/PacksImporter';
import LangToggle from './components/LangToggle';
import Calculators from './components/Calculators';
import Login from './components/Login';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import MedicationDatabase from './components/MedicationDatabase';
import ShiftHandoff from './components/ShiftHandoff';
import Analytics from './components/Analytics';
import AuditLogViewer from './components/AuditLogViewer';
import DemoMode from './components/DemoMode';
import Welcome from './components/Welcome';
import { Home, Calculator, FileText, Package, LogOut, Menu, X, Pill, ClipboardList, BarChart3, Shield, Printer } from 'lucide-react';
import { auditLogger } from '../services/auditLog';
import { PDFGenerator } from '../services/pdfGenerator';

function AppContent() {
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [authProvider, setAuthProvider] = useState<AuthProvider | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'he'>('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function initialize() {
      try {
        // Initialize auth
        const auth = await createAuthProvider();
        await auth.initialize();
        setAuthProvider(auth);

        // Listen to auth changes
        auth.onAuthStateChange((user) => {
          setUser(user);
          if (user) {
            auditLogger.logLogin(user.id, user.email || 'User', true);
          }
        });

        // Initialize data source
        const data = await createDataSource();
        await data.initialize();
        setDataSource(data);
      } catch (error) {
        console.error('Failed to initialize:', error);
      } finally {
        setLoading(false);
      }
    }
    initialize();
  }, []);

  const handleSignOut = async () => {
    if (authProvider && user) {
      auditLogger.logLogout(user.id, user.email || 'User');
      await authProvider.signOut();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && authProvider) {
    return <Login authProvider={authProvider} />;
  }

  const navigation = [
    { name: language === 'en' ? 'Dashboard' : 'לוח בקרה', href: '/', icon: Home },
    { name: language === 'en' ? 'Calculators' : 'מחשבונים', href: '/calculators', icon: Calculator },
    { name: language === 'en' ? 'Medications' : 'תרופות', href: '/medications', icon: Pill },
    { name: language === 'en' ? 'Shift Handoff' : 'העברת משמרת', href: '/handoff', icon: ClipboardList },
    { name: language === 'en' ? 'Note Analyzer' : 'מנתח הערות', href: '/notes', icon: FileText },
    { name: language === 'en' ? 'Analytics' : 'ניתוחים', href: '/analytics', icon: BarChart3 },
    { name: language === 'en' ? 'Data Packs' : 'חבילות נתונים', href: '/packs', icon: Package },
    { name: language === 'en' ? 'Audit Log' : 'יומן ביקורת', href: '/audit', icon: Shield },
  ];

  return (
    <>
      <div className={`min-h-screen bg-gray-50 ${language === 'he' ? 'rtl' : 'ltr'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 ${language === 'he' ? 'right-0' : 'left-0'} z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : language === 'he' ? 'translate-x-full' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <h1 className="text-xl font-bold text-gray-800">
                {language === 'en' ? 'Geriatrics Pro' : 'גריאטריה פרו'}
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`h-5 w-5 ${language === 'he' ? 'ml-3' : 'mr-3'}`} />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-4">
                <LangToggle language={language} onToggle={setLanguage} />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title={language === 'en' ? 'Sign out' : 'התנתק'}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Mobile header */}
          <div className="lg:hidden bg-white shadow-sm">
            <div className="flex items-center justify-between h-16 px-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">
                {language === 'en' ? 'Geriatrics Pro' : 'גריאטריה פרו'}
              </h1>
              <LangToggle language={language} onToggle={setLanguage} />
            </div>
          </div>

          {/* Page content */}
          <main className="p-4 lg:p-8">
            <Routes>
              <Route path="/" element={
                dataSource ? <Dashboard dataSource={dataSource} language={language} /> : <div>Loading...</div>
              } />
              <Route path="/calculators" element={
                <Calculators language={language} />
              } />
              <Route path="/medications" element={
                <MedicationDatabase language={language} />
              } />
              <Route path="/handoff" element={
                dataSource ? <ShiftHandoff dataSource={dataSource} language={language} /> : <div>Loading...</div>
              } />
              <Route path="/notes" element={
                dataSource ? <NoteAnalyzer dataSource={dataSource} language={language} /> : <div>Loading...</div>
              } />
              <Route path="/analytics" element={
                dataSource ? <Analytics dataSource={dataSource} language={language} /> : <div>Loading...</div>
              } />
              <Route path="/audit" element={
                <AuditLogViewer language={language} />
              } />
              <Route path="/packs" element={
                dataSource ? <PacksImporter dataSource={dataSource} language={language} /> : <div>Loading...</div>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <PWAInstallPrompt />
      {user && (
        <>
          <DemoMode 
            onNavigate={(path) => navigate(path)} 
            language={language} 
          />
          <Welcome />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}