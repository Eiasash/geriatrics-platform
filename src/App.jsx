import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, getDocs, writeBatch, doc, setDoc, deleteDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { Search, Pill, BrainCircuit, ClipboardPlus, BookOpen, ChevronRight, X, AlertTriangle, Languages, Shield, PlusCircle, Trash2, Edit, Save, Calculator } from 'lucide-react';

// --- IMPORTANT: CONFIGURE FIREBASE USING ENVIRONMENT VARIABLES ---
// These keys will be set in the Netlify UI, not here.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// --- SET ADMIN PASSWORD ---
// Change this to your desired secure password
const ADMIN_PASSWORD = "geriatrics2024";

// --- DATABASE INITIALIZATION ---
let db;
try {
    if (firebaseConfig.apiKey) {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        db = getFirestore(app);
        signInAnonymously(auth).catch(error => console.error("Anonymous sign-in failed:", error));
    } else {
        console.warn("Firebase config is missing. App will run in offline mode.");
    }
} catch (e) {
    console.error("Firebase initialization failed. Check your environment variables.", e);
}

// --- MOCK DATA FOR INITIAL SEEDING ---
// This is only used if the database is empty.
const initialMedications = [
    { id: 'med1', name: 'Lisinopril', he_name: 'ליסינופריל', brand_names_il: 'טנסופריל, ליסופריל', class: 'ACE Inhibitor', he_class: 'מעכב ACE', indications: 'Hypertension, Heart Failure', he_indications: 'יתר לחץ דם, אי ספיקת לב', beers_criteria: 'Caution: Risk of hyperkalemia. Avoid use with other ACEi/ARBs.', renal_dosing: 'eGFR 10-30: Start 2.5mg. eGFR <10: Contraindicated.', interactions: ['spironolactone', 'potassium chloride'] },
    { id: 'med2', name: 'Metformin', he_name: 'מטפורמין', brand_names_il: 'גלוקומין, מטפורמין-טבע', class: 'Biguanide', he_class: 'ביגואניד', indications: 'Type 2 Diabetes', he_indications: 'סוכרת סוג 2', beers_criteria: 'Avoid if eGFR <30 mL/min. Use with caution 30-45.', renal_dosing: 'eGFR 30-45: Max 1000mg/day. eGFR <30: Contraindicated.', interactions: [] },
    { id: 'med3', name: 'Atorvastatin', he_name: 'אטורבסטטין', brand_names_il: 'ליפיטור, אטורבה', class: 'Statin', he_class: 'סטטין', indications: 'Hyperlipidemia', he_indications: 'היפרליפידמיה', beers_criteria: 'Monitor for myopathy. Use with caution with fibrates.', renal_dosing: 'No adjustment needed.', interactions: ['clarithromycin'] },
    { id: 'med4', name: 'Amlodipine', he_name: 'אמלודיפין', brand_names_il: 'נורווסק, אמלו', class: 'Calcium Channel Blocker', he_class: 'חוסם תעלות סידן', indications: 'Hypertension, Angina', he_indications: 'יתר לחץ דם, אנגינה', beers_criteria: 'May cause peripheral edema.', renal_dosing: 'No adjustment needed.', interactions: [] },
    { id: 'med5', name: 'Warfarin', he_name: 'וארפרין', brand_names_il: 'קומדין', class: 'Vitamin K Antagonist', he_class: 'אנטגוניסט לוויטמין K', indications: 'Atrial Fibrillation, VTE', he_indications: 'פרפור עליות, VTE', beers_criteria: 'High risk of bleeding. Requires frequent monitoring.', renal_dosing: 'No adjustment needed.', interactions: ['amiodarone', 'ciprofloxacin'] },
    // Add more medications to reach 50+
];
const initialBoardQuestions = [
    { id: 'q1', question_he: 'אישה בת 82 עם פסיכוזה הקשורה לדמנציה מתחילה טיפול בריספרידון. מהו הסיכון החשוב ביותר שיש לדון בו עם משפחתה?', options_he: ['א) עלייה במשקל', 'ב) עלייה בתמותה', 'ג) טרדיב דיסקינזיה', 'ד) היפרגליקמיה'], answer_he: 'ב) עלייה בתמותה', explanation_he: 'לתרופות אנטי-פסיכוטיות יש אזהרת קופסה שחורה לגבי סיכון מוגבר לתמותה מכל הסיבות.', source: 'FDA Black Box Warning, 2005' },
    { id: 'q2', question_he: 'גבר בן 78 עם CrCl של 25 מ"ל/דקה זקוק לטיפול ב-UTI. מאיזו אנטיביוטיקה יש להימנע?', options_he: ['א) ציפרופלוקסצין', 'ב) צפטריאקסון', 'ג) ניטרופורנטואין', 'ד) אמוקסיצילין'], answer_he: 'ג) ניטרופורנטואין', explanation_he: 'ניטרופורנטואין אינה מומלצת בחולים עם CrCl < 30 מ"ל/דקה בשל ריכוז לא מספק בשתן וסיכון מוגבר לרעילות.', source: 'Beers Criteria, AGS' },
    { id: 'q3', question_he: 'מהי התרופה הראשונה לטיפול באוסטאופורוזיס אצל אישה בת 75 ללא מחלות רקע משמעותיות?', options_he: ['א) אלנדרונט', 'ב) ראלוקסיפן', 'ג) קלציטונין', 'ד) דנוסומאב'], answer_he: 'א) אלנדרונט', explanation_he: 'ביספוספונטים פומיים, כמו אלנדרונט, הם קו הטיפול הראשון ברוב המקרים של אוסטאופורוזיס פוסט-מנופאוזלי.', source: 'AAFP Guidelines' },
    // Add more questions to reach 50+
];


// --- ROUTING ---
const App = () => {
    const [route, setRoute] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => setRoute(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setRoute(path);
    };

    if (route.startsWith('/admin')) {
        return <AdminPanel navigate={navigate} />;
    }
    return <MainApp navigate={navigate} />;
};


// --- MAIN APPLICATION ---
const MainApp = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState('meds');
    const [lang, setLang] = useState('he');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [medications, setMedications] = useState([]);
    const [boardQuestions, setBoardQuestions] = useState([]);

    useEffect(() => {
        if (!db) {
            setError("Database not configured. Check Firebase keys.");
            setIsLoading(false);
            return;
        }

        const seedAndFetch = async () => {
            try {
                const medsRef = collection(db, "medications");
                const medsSnapshot = await getDocs(medsRef);
                if (medsSnapshot.empty) {
                    console.log("Database empty, seeding data...");
                    const batch = writeBatch(db);
                    initialMedications.forEach(med => {
                        const { id, ...data } = med;
                        const docRef = doc(db, "medications", id);
                        batch.set(docRef, { ...data, last_updated: serverTimestamp() });
                    });
                    initialBoardQuestions.forEach(q => {
                        const { id, ...data } = q;
                        const docRef = doc(db, "boardQuestions", id);
                        batch.set(docRef, data);
                    });
                    await batch.commit();
                }
            } catch (err) {
                console.error("Error seeding database:", err);
                setError("Failed to seed initial data.");
            }

            const unsubMeds = onSnapshot(collection(db, "medications"), 
                (snapshot) => setMedications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))),
                (err) => { console.error(err); setError("Failed to load medications."); }
            );
            const unsubQuestions = onSnapshot(collection(db, "boardQuestions"), 
                (snapshot) => setBoardQuestions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))),
                (err) => { console.error(err); setError("Failed to load questions."); }
            );

            setIsLoading(false);
            return () => {
                unsubMeds();
                unsubQuestions();
            };
        };

        seedAndFetch();
    }, []);

    const toggleLang = () => setLang(prev => (prev === 'he' ? 'en' : 'he'));

    const t = {
        he: { title: "פלטפורמת גריאטריה", meds: "מדריך תרופות", review: "שאלות חזרה", tools: "כלים קליניים", admin: "ניהול" },
        en: { title: "Geriatrics Platform", meds: "Medication Guide", review: "Board Review", tools: "Clinical Tools", admin: "Admin" }
    };

    const renderContent = () => {
        if (isLoading) return <div className="text-center p-10">Loading...</div>;
        if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
        switch (activeTab) {
            case 'meds': return <MedicationGuide medications={medications} lang={lang} />;
            case 'review': return <BoardReview questions={boardQuestions} lang={lang} />;
            case 'tools': return <ClinicalTools medications={medications} lang={lang} />;
            default: return <MedicationGuide medications={medications} lang={lang} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans" dir={lang === 'he' ? 'rtl' : 'ltr'}>
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-800 mx-3">{t[lang].title}</h1>
                        </div>
                        <nav className="flex items-center space-x-2">
                            <button onClick={() => setActiveTab('meds')} className={activeTab === 'meds' ? 'bg-blue-600 text-white px-3 py-2 rounded-md' : 'px-3 py-2'}>{t[lang].meds}</button>
                            <button onClick={() => setActiveTab('review')} className={activeTab === 'review' ? 'bg-blue-600 text-white px-3 py-2 rounded-md' : 'px-3 py-2'}>{t[lang].review}</button>
                            <button onClick={() => setActiveTab('tools')} className={activeTab === 'tools' ? 'bg-blue-600 text-white px-3 py-2 rounded-md' : 'px-3 py-2'}>{t[lang].tools}</button>
                            <button onClick={toggleLang} className="p-2 rounded-full hover:bg-gray-200"><Languages /></button>
                            <button onClick={() => navigate('/admin')} className="p-2 rounded-full hover:bg-gray-200"><Shield /></button>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>
        </div>
    );
};

// --- ADMIN PANEL ---
const AdminPanel = ({ navigate }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Password" />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
                    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                    <button type="button" onClick={() => navigate('/')} className="w-full bg-gray-200 text-gray-800 p-2 rounded mt-4 hover:bg-gray-300">Go to Main Site</button>
                </form>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={() => navigate('/')} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">Go to Main Site</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MedicationManager />
                <QuestionManager />
            </div>
        </div>
    );
};

// --- ADMIN CRUD COMPONENTS ---
const MedicationManager = () => {
    const [medications, setMedications] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentMed, setCurrentMed] = useState(null);

    useEffect(() => {
        if (!db) return;
        const unsub = onSnapshot(collection(db, "medications"), (snapshot) => {
            setMedications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsub;
    }, []);

    const handleEdit = (med) => {
        setCurrentMed(med);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setCurrentMed(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this medication?")) {
            await deleteDoc(doc(db, "medications", id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage Medications</h2>
                <button onClick={handleAddNew} className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"><PlusCircle /></button>
            </div>
            {isFormOpen && <MedicationForm currentMed={currentMed} onDone={() => setIsFormOpen(false)} />}
            <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                {medications.map(med => (
                    <div key={med.id} className="p-3 bg-gray-50 rounded flex justify-between items-center">
                        <span className="font-semibold">{med.name} ({med.he_name})</span>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(med)} className="p-2 text-blue-600 hover:text-blue-800"><Edit /></button>
                            <button onClick={() => handleDelete(med.id)} className="p-2 text-red-600 hover:text-red-800"><Trash2 /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MedicationForm = ({ currentMed, onDone }) => {
    const [formData, setFormData] = useState(currentMed || {});
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const medId = currentMed ? currentMed.id : doc(collection(db, "medications")).id;
        const dataToSave = { ...formData, last_updated: serverTimestamp() };
        await setDoc(doc(db, "medications", medId), dataToSave, { merge: true });
        onDone();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-gray-50 space-y-3">
            <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name (English)" className="w-full p-2 border rounded" required />
            <input name="he_name" value={formData.he_name || ''} onChange={handleChange} placeholder="Name (Hebrew)" className="w-full p-2 border rounded" required />
            {/* Add all other fields as inputs/textareas */}
            <textarea name="beers_criteria" value={formData.beers_criteria || ''} onChange={handleChange} placeholder="Beers Criteria" className="w-full p-2 border rounded" />
            <div className="flex space-x-2">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save</button>
                <button type="button" onClick={onDone} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
            </div>
        </form>
    );
};

const QuestionManager = () => { /* Similar structure to MedicationManager */ return <div></div>; };


// --- CLINICAL TOOLS & CALCULATORS ---
const ClinicalTools = ({ medications, lang }) => {
    const [activeTool, setActiveTool] = useState(null);
    const tools = [
        { id: 'beers', name: 'Beers Criteria Tool', he_name: 'כלי קריטריוני Beers' },
        { id: 'interaction', name: 'Interaction Checker', he_name: 'בדיקת אינטראקציות' },
        { id: 'crcl', name: 'Cockcroft-Gault (CrCl)', he_name: 'חישוב פינוי קריאטינין' },
    ];
    
    const renderTool = () => {
        switch(activeTool) {
            case 'beers': return <BeersCriteriaTool medications={medications} lang={lang} />;
            case 'interaction': return <InteractionChecker medications={medications} lang={lang} />;
            case 'crcl': return <CockcroftGaultCalculator lang={lang} />;
            default: return null;
        }
    };

    if (activeTool) {
        return (
            <div>
                <button onClick={() => setActiveTool(null)} className="mb-4 bg-gray-200 py-2 px-4 rounded">
                    &larr; {lang === 'he' ? 'חזרה' : 'Back'}
                </button>
                {renderTool()}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(tool => (
                <button key={tool.id} onClick={() => setActiveTool(tool.id)} className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                    <Calculator className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="text-xl font-bold">{lang === 'he' ? tool.he_name : tool.name}</h3>
                </button>
            ))}
        </div>
    );
};

const BeersCriteriaTool = ({ medications, lang }) => {
    const [selectedMeds, setSelectedMeds] = useState([]);
    const [age, setAge] = useState(65);

    const toggleMed = (medId) => {
        setSelectedMeds(prev => 
            prev.includes(medId) ? prev.filter(id => id !== medId) : [...prev, medId]
        );
    };

    const flaggedMeds = medications.filter(med => 
        selectedMeds.includes(med.id) && med.beers_criteria
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{lang === 'he' ? 'בדיקת תרופות לפי קריטריוני Beers' : 'Beers Criteria Check'}</h2>
            <div className="mb-4">
                <label className="block font-semibold mb-1">{lang === 'he' ? 'גיל המטופל' : 'Patient Age'}</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} className="p-2 border rounded w-full" />
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-2">{lang === 'he' ? 'בחר תרופות' : 'Select Medications'}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2 border rounded">
                    {medications.map(med => (
                        <label key={med.id} className={`p-2 rounded cursor-pointer ${selectedMeds.includes(med.id) ? 'bg-blue-200' : 'bg-gray-100'}`}>
                            <input type="checkbox" checked={selectedMeds.includes(med.id)} onChange={() => toggleMed(med.id)} className="mr-2" />
                            {lang === 'he' ? med.he_name : med.name}
                        </label>
                    ))}
                </div>
            </div>
            {age >= 65 && flaggedMeds.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-red-600 mb-2"><AlertTriangle className="inline-block mr-2" />{lang === 'he' ? 'אזהרות' : 'Warnings'}</h3>
                    <ul className="space-y-2 list-disc pl-5">
                        {flaggedMeds.map(med => (
                            <li key={med.id}>
                                <strong className="font-semibold">{lang === 'he' ? med.he_name : med.name}:</strong> {med.beers_criteria}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const InteractionChecker = ({ medications, lang }) => { /* ... */ return <div></div>; };
const CockcroftGaultCalculator = ({ lang }) => { /* ... */ return <div></div>; };


// --- OTHER COMPONENTS (MedicationGuide, BoardReview) ---
const MedicationGuide = ({ medications, lang }) => { /* ... */ return <div>Medication Guide</div>; };
const BoardReview = ({ questions, lang }) => { /* ... */ return <div>Board Review</div>; };


export default App;
