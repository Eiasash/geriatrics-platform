import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Users, HeartPulse, Stethoscope, Pill, BookOpen, Calendar, CheckSquare, Phone, GraduationCap } from 'lucide-react';
import Education from './components/Education';

// Main Application Component - Consolidated Dashboard
export default function App() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Chart management for dashboard
    useEffect(() => {
        if (activeSection === 'dashboard' && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            
            // Create chart if Chart.js is available
            if (window.Chart) {
                chartInstance.current = new window.Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Patient Admissions',
                            data: [65, 59, 80, 81, 56, 55],
                            backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [activeSection]);

    // Dashboard Section
    const renderDashboard = () => (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600">Total Patients</h2>
                    <p className="text-3xl font-bold text-blue-600">128</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600">Average Stay</h2>
                    <p className="text-3xl font-bold text-green-600">12.4 Days</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600">Open Consults</h2>
                    <p className="text-3xl font-bold text-yellow-600">15</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600">Critical Alerts</h2>
                    <p className="text-3xl font-bold text-red-600">3</p>
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Patient Admissions Overview</h2>
                <div className="h-96">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
    
    // Patients Section
    const renderPatients = () => (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Patient Management</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">101</td>
                            <td className="px-6 py-4 whitespace-nowrap">Sarah Cohen</td>
                            <td className="px-6 py-4 whitespace-nowrap">82</td>
                            <td className="px-6 py-4">CHF Exacerbation</td>
                            <td className="px-6 py-4">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Monitoring
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">102</td>
                            <td className="px-6 py-4 whitespace-nowrap">David Levy</td>
                            <td className="px-6 py-4 whitespace-nowrap">78</td>
                            <td className="px-6 py-4">Pneumonia</td>
                            <td className="px-6 py-4">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Stable
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">103</td>
                            <td className="px-6 py-4 whitespace-nowrap">Rachel Goldberg</td>
                            <td className="px-6 py-4 whitespace-nowrap">89</td>
                            <td className="px-6 py-4">Fall, Hip Fracture</td>
                            <td className="px-6 py-4">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Critical
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Clinical Analysis Section
    const renderClinicalAnalysis = () => (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Clinical Analysis</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Frailty Calculator</h3>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Grip Strength (kg)</span>
                            <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter value"/>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Walking Speed (m/s)</span>
                            <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter value"/>
                        </label>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                            Calculate Frailty Score
                        </button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">CHA2DS2-VASc Score</h3>
                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300"/>
                            <span className="ml-2">Congestive Heart Failure</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300"/>
                            <span className="ml-2">Hypertension</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300"/>
                            <span className="ml-2">Age ≥ 75 years</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300"/>
                            <span className="ml-2">Diabetes Mellitus</span>
                        </label>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4">
                            Calculate Risk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Antibiotics Section
    const renderAntibiotics = () => (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Antibiotics Guide</h1>
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="mb-4">
                        <input 
                            type="search" 
                            className="w-full px-4 py-2 border rounded-lg" 
                            placeholder="Search antibiotics..."
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">Amoxicillin</h3>
                            <p className="text-sm text-gray-600 mb-2">Broad-spectrum penicillin antibiotic</p>
                            <p className="text-sm"><strong>Geriatric Dose:</strong> 250-500mg q8h</p>
                            <p className="text-sm text-yellow-600">⚠️ Adjust for CrCl < 30</p>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">Ciprofloxacin</h3>
                            <p className="text-sm text-gray-600 mb-2">Fluoroquinolone antibiotic</p>
                            <p className="text-sm"><strong>Geriatric Dose:</strong> 250-500mg q12h</p>
                            <p className="text-sm text-red-600">⚠️ Risk of tendon rupture in elderly</p>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">Ceftriaxone</h3>
                            <p className="text-sm text-gray-600 mb-2">Third-generation cephalosporin</p>
                            <p className="text-sm"><strong>Geriatric Dose:</strong> 1-2g daily</p>
                            <p className="text-sm text-green-600">✓ No dose adjustment needed</p>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">Vancomycin</h3>
                            <p className="text-sm text-gray-600 mb-2">Glycopeptide antibiotic</p>
                            <p className="text-sm"><strong>Geriatric Dose:</strong> 15-20mg/kg q8-12h</p>
                            <p className="text-sm text-yellow-600">⚠️ Monitor levels closely</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    // Protocols Section
    const renderProtocols = () => (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Clinical Protocols</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Fall Prevention Protocol</h3>
                    <p className="text-gray-600 text-sm">Comprehensive guidelines for preventing falls in elderly patients</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Delirium Management</h3>
                    <p className="text-gray-600 text-sm">Evidence-based approach to delirium prevention and treatment</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Polypharmacy Review</h3>
                    <p className="text-gray-600 text-sm">Systematic medication review process for elderly patients</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Pressure Ulcer Prevention</h3>
                    <p className="text-gray-600 text-sm">Best practices for preventing pressure injuries</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Nutrition Assessment</h3>
                    <p className="text-gray-600 text-sm">Malnutrition screening and intervention protocols</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-semibold mb-2">Discharge Planning</h3>
                    <p className="text-gray-600 text-sm">Comprehensive discharge checklist and coordination</p>
                </div>
            </div>
        </div>
    );

    // Schedule Section
    const renderSchedule = () => (
         <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">On-Call Schedule</h1>
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="grid grid-cols-7 gap-4 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center font-semibold text-gray-700">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                        <div className="border rounded p-2 min-h-[100px]">
                            <p className="text-sm font-semibold">Dr. Cohen</p>
                            <p className="text-xs text-gray-600">Day Shift</p>
                        </div>
                        <div className="border rounded p-2 min-h-[100px]">
                            <p className="text-sm font-semibold">Dr. Levy</p>
                            <p className="text-xs text-gray-600">Night Shift</p>
                        </div>
                        <div className="border rounded p-2 min-h-[100px]">
                            <p className="text-sm font-semibold">Dr. Goldberg</p>
                            <p className="text-xs text-gray-600">Day Shift</p>
                        </div>
                        <div className="border rounded p-2 min-h-[100px]">
                            <p className="text-sm font-semibold">Dr. Shapiro</p>
                            <p className="text-xs text-gray-600">Day Shift</p>
                        </div>
                        <div className="border rounded p-2 min-h-[100px]">
                            <p className="text-sm font-semibold">Dr. Ben-David</p>
                            <p className="text-xs text-gray-600">Night Shift</p>
                        </div>
                        <div className="border rounded p-2 min-h-[100px] bg-blue-50">
                            <p className="text-sm font-semibold text-blue-700">You</p>
                            <p className="text-xs text-blue-600">On-Call 24h</p>
                        </div>
                        <div className="border rounded p-2 min-h-[100px]">
                            <p className="text-sm font-semibold">Dr. Mizrachi</p>
                            <p className="text-xs text-gray-600">Day Shift</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Tasks Section
    const renderTasks = () => (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Tasks & Reminders</h1>
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center p-3 border rounded-lg">
                            <input type="checkbox" className="rounded border-gray-300 mr-3"/>
                            <div className="flex-1">
                                <p className="font-medium">Review Mrs. Cohen's medication list</p>
                                <p className="text-sm text-gray-500">Due today at 2:00 PM</p>
                            </div>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">High</span>
                        </div>
                        <div className="flex items-center p-3 border rounded-lg">
                            <input type="checkbox" className="rounded border-gray-300 mr-3"/>
                            <div className="flex-1">
                                <p className="font-medium">Complete discharge summary for Room 102</p>
                                <p className="text-sm text-gray-500">Due today at 4:00 PM</p>
                            </div>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                        </div>
                        <div className="flex items-center p-3 border rounded-lg">
                            <input type="checkbox" className="rounded border-gray-300 mr-3" checked/>
                            <div className="flex-1 line-through text-gray-400">
                                <p className="font-medium">Order labs for new admission</p>
                                <p className="text-sm">Completed</p>
                            </div>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Done</span>
                        </div>
                    </div>
                    <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                        + Add New Task
                    </button>
                </div>
            </div>
        </div>
    );

    // Contacts Section
    const renderContacts = () => (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Contacts Directory</h1>
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="mb-4">
                        <input 
                            type="search" 
                            className="w-full px-4 py-2 border rounded-lg" 
                            placeholder="Search contacts..."
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="border-b pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Emergency Department</p>
                                    <p className="text-sm text-gray-600">24/7 Hotline</p>
                                </div>
                                <p className="text-lg font-bold text-blue-600">*6911</p>
                            </div>
                        </div>
                        <div className="border-b pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Pharmacy</p>
                                    <p className="text-sm text-gray-600">Main Hospital</p>
                                </div>
                                <p className="text-lg font-bold text-blue-600">*6420</p>
                            </div>
                        </div>
                        <div className="border-b pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Laboratory</p>
                                    <p className="text-sm text-gray-600">Results & Urgent Tests</p>
                                </div>
                                <p className="text-lg font-bold text-blue-600">*6350</p>
                            </div>
                        </div>
                        <div className="border-b pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Radiology</p>
                                    <p className="text-sm text-gray-600">X-Ray, CT, MRI</p>
                                </div>
                                <p className="text-lg font-bold text-blue-600">*6280</p>
                            </div>
                        </div>
                        <div className="border-b pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Social Services</p>
                                    <p className="text-sm text-gray-600">Discharge Planning</p>
                                </div>
                                <p className="text-lg font-bold text-blue-600">*6510</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Navigation Item Component
    const NavItem = ({ icon, label, section, isActive }) => (
        <button
            onClick={() => setActiveSection(section)}
            className={`flex items-center w-full text-left p-3 my-1 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            {icon}
            <span className="ml-4 font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row" dir="ltr">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-white shadow-md flex-shrink-0">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-blue-700">Shaare Zedek</h1>
                    <p className="text-sm text-gray-600">Geriatrics Department</p>
                </div>
                <nav className="p-4">
                    <NavItem icon={<BarChart size={20} />} label="Dashboard" section="dashboard" isActive={activeSection === 'dashboard'} />
                    <NavItem icon={<Users size={20} />} label="Patients" section="patients" isActive={activeSection === 'patients'} />
                    <NavItem icon={<HeartPulse size={20} />} label="Clinical Analysis" section="clinical" isActive={activeSection === 'clinical'} />
                    <NavItem icon={<Pill size={20} />} label="Antibiotics" section="antibiotics" isActive={activeSection === 'antibiotics'} />
                    <NavItem icon={<BookOpen size={20} />} label="Protocols" section="protocols" isActive={activeSection === 'protocols'} />
                    <NavItem icon={<Calendar size={20} />} label="Schedule" section="schedule" isActive={activeSection === 'schedule'} />
                    <NavItem icon={<CheckSquare size={20} />} label="Tasks" section="tasks" isActive={activeSection === 'tasks'} />
                    <NavItem icon={<Phone size={20} />} label="Contacts" section="contacts" isActive={activeSection === 'contacts'} />
                    <NavItem icon={<GraduationCap size={20} />} label="Education" section="education" isActive={activeSection === 'education'} />
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {activeSection === 'dashboard' && renderDashboard()}
                {activeSection === 'patients' && renderPatients()}
                {activeSection === 'clinical' && renderClinicalAnalysis()}
                {activeSection === 'antibiotics' && renderAntibiotics()}
                {activeSection === 'protocols' && renderProtocols()}
                {activeSection === 'schedule' && renderSchedule()}
                {activeSection === 'tasks' && renderTasks()}
                {activeSection === 'contacts' && renderContacts()}
                {activeSection === 'education' && <Education />}
            </main>
        </div>
    );
}