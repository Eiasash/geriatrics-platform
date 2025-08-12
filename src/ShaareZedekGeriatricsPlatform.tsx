import React, { useState, useEffect, FC, useRef } from 'react';
import { 
    Brain, Pill, Accessibility, HeartPulse, 
    FileText, Calculator, 
    BookOpen, 
    Lightbulb, User, ClipboardList, PlusCircle, LayoutDashboard, Wifi, Server, Flag, Copy
} from 'lucide-react';

// --- Firebase Imports ---
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, doc, collection, addDoc, Firestore, onSnapshot, Unsubscribe, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken, Auth } from 'firebase/auth';

// --- API Service Layer ---
interface ApiService {
    getPatientsList: (callback: (patients: Patient[]) => void) => Unsubscribe;
    getPatientDetails: (patientId: string, callback: (data: any) => void) => Unsubscribe;
    getReviewList: (callback: (reviewIds: string[]) => void) => Unsubscribe;
    createNewPatient: (patientData: Partial<Patient>) => Promise<string>;
    savePatientData: (patientId: string, data: any, newScores?: any) => Promise<void>;
    flagPatientForReview: (patientId: string) => Promise<void>;
    unflagPatientForReview: (patientId: string) => Promise<void>;
}

// --- Firebase Implementation of the API Service ---
const getFirebaseApiService = (db: Firestore, userId: string, appId: string): ApiService => ({
    getPatientsList: (callback) => {
        const patientsCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'patients');
        return onSnapshot(patientsCollectionRef, (querySnapshot) => {
            const patients: Patient[] = [];
            querySnapshot.forEach((doc) => {
                patients.push({ id: doc.id, ...doc.data().patient, scores: doc.data().scores });
            });
            callback(patients);
        });
    },
    getPatientDetails: (patientId, callback) => {
        const patientDocRef = doc(db, 'artifacts', appId, 'users', userId, 'patients', patientId);
        return onSnapshot(patientDocRef, (docSnap) => {
            if (docSnap.exists()) callback(docSnap.data());
        });
    },
    getReviewList: (callback) => {
        const userMetaRef = doc(db, 'artifacts', appId, 'users', userId);
        return onSnapshot(userMetaRef, (docSnap) => {
            callback(docSnap.data()?.reviewList || []);
        });
    },
    createNewPatient: async (patientData) => {
        const patientsCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'patients');
        const docRef = await addDoc(patientsCollectionRef, { 
            patient: patientData, assessments: {}, scores: {}, medications: [], interventions: [], scoreHistory: [] 
        });
        return docRef.id;
    },
    savePatientData: async (patientId, data, newScores) => {
        const patientDocRef = doc(db, 'artifacts', appId, 'users', userId, 'patients', patientId);
        let dataToSave = { ...data };
        if (newScores && Object.keys(newScores).length > 0) {
            dataToSave.scoreHistory = arrayUnion({
                date: new Date().toISOString(),
                scores: newScores
            });
        }
        await updateDoc(patientDocRef, dataToSave);
    },
    flagPatientForReview: async (patientId) => {
        const userMetaRef = doc(db, 'artifacts', appId, 'users', userId);
        await updateDoc(userMetaRef, { reviewList: arrayUnion(patientId) });
    },
    unflagPatientForReview: async (patientId) => {
        const userMetaRef = doc(db, 'artifacts', appId, 'users', userId);
        await updateDoc(userMetaRef, { reviewList: arrayRemove(patientId) });
    },
});

// --- Simulated EMR Implementation ---
const getEmrApiService = (): ApiService => ({
    getPatientsList: (cb) => { cb([ { id: 'EMR_101', name: 'ישראל ישראלי (EMR)', age: 88, idNumber: '', chiefComplaint: '', scores: { cfs: { total: 6 } } } ]); return () => {}; },
    getPatientDetails: (_id, cb) => { cb({ patient: { name: 'ישראל ישראלי (EMR)', age: 88, idNumber: '012345678', chiefComplaint: 'נפילה' }, medications: [], assessments: {}, scores: {}, interventions: [], scoreHistory: [] }); return () => {}; },
    getReviewList: (cb) => { cb([]); return () => {}; },
    createNewPatient: async () => Promise.reject("EMR mode is read-only."),
    savePatientData: async () => console.log("EMR mode is read-only."),
    flagPatientForReview: async () => console.log("EMR mode is read-only."),
    unflagPatientForReview: async () => console.log("EMR mode is read-only."),
});


// --- TypeScript Interfaces ---
interface Patient { id?: string; name: string; age: number | ''; idNumber: string; chiefComplaint: string; scores?: any; }
interface Medication { id: number; name: string; dose: string; frequency: string; }
interface Intervention { domain: string; domainHebrew: string; priority: 'High' | 'Medium' | 'Low'; action: string; actionHebrew: string; rationale: string; reference?: string; }
interface GeriatricPearl { id: number; pearl: string; source: string; }
interface LandmarkArticle { title: string; author: string; journal: string; year: number; summary: string; url: string; notes?: string; }
interface ScoreHistoryItem { date: string; scores: any; }

// --- Constants ---
const TINETTI_BALANCE_ITEMS = [ { label: 'Sitting Balance', max: 1 }, { label: 'Arises', max: 2 }, { label: 'Attempts to Arise', max: 2 }, { label: 'Immediate Standing Balance (first 5 sec)', max: 2 }, { label: 'Standing Balance', max: 2 }, { label: 'Nudged', max: 2 }, { label: 'Eyes Closed', max: 1 }, { label: 'Turning 360 degrees', max: 2 }, { label: 'Sitting Down', max: 2 }];
const TINETTI_GAIT_ITEMS = [ { label: 'Initiation of Gait', max: 1 }, { label: 'Step Length and Height', max: 2 }, { label: 'Step Symmetry', max: 2 }, { label: 'Step Continuity', max: 2 }, { label: 'Path', max: 2 }, { label: 'Trunk', max: 2 }, { label: 'Walking Stance', max: 1 }];
const GDS_QUESTIONS = [ "Are you basically satisfied with your life?", "Have you dropped many of your activities and interests?", "Do you feel that your life is empty?", "Do you often get bored?", "Are you in good spirits most of the time?", "Are you afraid that something bad is going to happen to you?", "Do you feel happy most of the time?", "Do you often feel helpless?", "Do you prefer to stay at home, rather than going out and doing new things?", "Do you feel you have more problems with memory than most?", "Do you think it is wonderful to be alive now?", "Do you feel pretty worthless the way you are now?", "Do you feel full of energy?", "Do you feel that your situation is hopeless?", "Do you think that most people are better off than you are?" ];
const GDS_ANSWERS_FOR_POINT = [ false, true, true, true, false, true, false, true, true, true, false, true, false, true, true ];
// const CFS_OPTIONS = [ { val: 0, text: 'בחר...' }, { val: 1, text: '1 - Very Fit' }, { val: 2, text: '2 - Well' }, { val: 3, text: '3 - Managing Well' }, { val: 4, text: '4 - Vulnerable' }, { val: 5, text: '5 - Mildly Frail' }, { val: 6, text: '6 - Moderately Frail' }, { val: 7, text: '7 - Severely Frail' }, { val: 8, text: '8 - Very Severely Frail' }, { val: 9, text: '9 - Terminally Ill' }];
const BEERS_CRITERIA_DRUGS = ['diazepam', 'lorazepam', 'clonazepam', 'amitriptyline', 'diphenhydramine', 'chlorpheniramine', 'glyburide', 'ketorolac', 'zopiclone'];
const STATIC_PEARLS: GeriatricPearl[] = [
    { id: 1, pearl: "In older adults, delirium is a medical emergency, not just 'confusion'. Always search for an underlying cause (infection, metabolic, medication).", source: "Inouye SK, et al. Ann Intern Med. 1990." },
    { id: 2, pearl: "The 'surprise question' ('Would you be surprised if this patient died in the next year?') is a powerful tool to identify patients who may benefit from a palliative care approach.", source: "Temel JS, et al. NEJM. 2010." },
];
const INITIAL_ARTICLES: LandmarkArticle[] = [
    { title: 'Frailty in Older Adults: Evidence for a Phenotype', author: 'Fried LP, et al.', journal: 'J Gerontol A Biol Sci Med Sci', year: 2001, summary: 'Defined the classic frailty phenotype...', url: 'https://pubmed.ncbi.nlm.nih.gov/11253156/', notes: '' },
    { title: 'A Multifactorial Intervention to Reduce the Risk of Falling', author: 'Tinetti ME, et al.', journal: 'N Engl J Med', year: 1994, summary: 'Landmark trial showing that a multifactorial, targeted intervention strategy significantly reduces fall risk...', url: 'https://www.nejm.org/doi/full/10.1056/nejm199409293311301', notes: '' },
];

// --- Main Component ---
const ShaareZedekGeriatricsPlatform: FC = () => {
    const [activeModule, setActiveModule] = useState<string>('dashboard');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [dataSource] = useState<'firebase' | 'emr'>('firebase');
    
    const app = useRef<FirebaseApp | null>(null);
    const db = useRef<Firestore | null>(null);
    const auth = useRef<Auth | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [appId, setAppId] = useState<string>('default-app-id');
    const apiService = useRef<ApiService | null>(null);

    const [patientsList, setPatientsList] = useState<Patient[]>([]);
    const [reviewList, setReviewList] = useState<string[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    const [patient, setPatient] = useState<Patient>({ name: '', age: '', idNumber: '', chiefComplaint: '' });
    const [medications, setMedications] = useState<Medication[]>([]);
    const [assessments, setAssessments] = useState<any>({});
    const [scores, setScores] = useState<any>({});
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [, setScoreHistory] = useState<ScoreHistoryItem[]>([]);
    
    const [currentPearl, setCurrentPearl] = useState<GeriatricPearl | null>(null);
    const [landmarkArticles, setLandmarkArticles] = useState<LandmarkArticle[]>(INITIAL_ARTICLES);

    // --- Firebase Initialization and Auth Effect ---
    useEffect(() => {
        const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || '{}');
        const currentAppId = typeof (window as any).__app_id !== 'undefined' ? (window as any).__app_id : 'default-app-id';
        setAppId(currentAppId);
        
        if (Object.keys(firebaseConfig).length > 0 && !app.current) {
            app.current = initializeApp(firebaseConfig);
            db.current = getFirestore(app.current);
            auth.current = getAuth(app.current);

            onAuthStateChanged(auth.current, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    const initialAuthToken = typeof (window as any).__initial_auth_token !== 'undefined' ? (window as any).__initial_auth_token : null;
                    try {
                        if (initialAuthToken) await signInWithCustomToken(auth.current!, initialAuthToken);
                        else await signInAnonymously(auth.current!);
                    } catch (error) { console.error("Auth failed:", error); }
                }
            });
        }
    }, []);

    // --- Data Service and Real-Time Listeners ---
    useEffect(() => {
        if (!userId || !db.current) return;

        apiService.current = dataSource === 'firebase' ? getFirebaseApiService(db.current, userId, appId) : getEmrApiService();
        
        const unsubPatients = apiService.current.getPatientsList(setPatientsList);
        const unsubReview = apiService.current.getReviewList(setReviewList);

        const randomIndex = Math.floor(Math.random() * STATIC_PEARLS.length);
        setCurrentPearl(STATIC_PEARLS[randomIndex]);
        setIsLoading(false);

        return () => { unsubPatients(); unsubReview(); };
    }, [userId, appId, dataSource]);

    useEffect(() => {
        let unsubscribe: Unsubscribe = () => {};
        if (selectedPatientId && apiService.current) {
            setIsLoading(true);
            unsubscribe = apiService.current.getPatientDetails(selectedPatientId, (data) => {
                if (data) {
                    setPatient(data.patient || { name: '', age: '', idNumber: '', chiefComplaint: '' });
                    setAssessments(data.assessments || {});
                    setMedications(data.medications || []);
                    setScores(data.scores || {});
                    setInterventions(data.interventions || []);
                    setScoreHistory(data.scoreHistory || []);
                }
                setIsLoading(false);
            });
            if(['dashboard', 'learning', 'emrIntegration', 'caseReview'].includes(activeModule)) {
                 setActiveModule('patientInfo');
            }
        }
        return () => unsubscribe();
    }, [selectedPatientId, dataSource]);

    // --- Debounced Save Effect ---
    useEffect(() => {
        if (!selectedPatientId || isLoading || !apiService.current || dataSource === 'emr') return;

        const handler = setTimeout(async () => {
            setIsSaving(true);
            await apiService.current!.savePatientData(selectedPatientId, {
                patient, assessments, medications, scores, interventions
            });
            setIsSaving(false);
        }, 2000);

        return () => clearTimeout(handler);
    }, [patient, assessments, medications, scores, interventions, selectedPatientId]);

    // --- Handlers ---
    const handleCreateNewPatient = async () => {
        if (!apiService.current) return;
        try {
            const newId = await apiService.current.createNewPatient({ name: 'מטופל/ת חדש/ה', age: '', idNumber: '', chiefComplaint: '' });
            setSelectedPatientId(newId);
        } catch (error) { alert("Cannot create patients in EMR Simulation mode."); }
    };

    const handleArticleNoteChange = (index: number, text: string) => {
        const newArticles = [...landmarkArticles];
        newArticles[index].notes = text;
        setLandmarkArticles(newArticles);
    };
    
    const handleToggleReviewFlag = (e: React.MouseEvent, patientId: string) => {
        e.stopPropagation();
        if (!apiService.current || dataSource === 'emr') return;
        if (reviewList.includes(patientId)) {
            apiService.current.unflagPatientForReview(patientId);
        } else {
            apiService.current.flagPatientForReview(patientId);
        }
    };

    // --- Calculation & Intervention Logic ---
    const calculateAllScores = async () => {
        let newScores: any = {};
        const gdsScore = GDS_QUESTIONS.reduce((score, _question, index) => (assessments.gds?.[index] === GDS_ANSWERS_FOR_POINT[index] ? score + 1 : score), 0);
        newScores.gds = { total: gdsScore };
        const balanceScore = TINETTI_BALANCE_ITEMS.reduce((s, item) => s + Number(assessments.tinetti?.balance?.[item.label] || 0), 0);
        const gaitScore = TINETTI_GAIT_ITEMS.reduce((s, item) => s + Number(assessments.tinetti?.gait?.[item.label] || 0), 0);
        newScores.tinetti = { balance: balanceScore, gait: gaitScore, total: balanceScore + gaitScore };
        newScores.cfs = { total: Number(assessments.cfs?.score || 0) };
        setScores(newScores);

        // Save new scores to history
        if (apiService.current && selectedPatientId && dataSource === 'firebase') {
            await apiService.current.savePatientData(selectedPatientId, { scores: newScores }, newScores);
        }
    };

    useEffect(() => {
        generateInterventions();
    }, [scores, medications]);

    const generateInterventions = () => {
        const newInterventions: Intervention[] = [];
        if (scores.cfs?.total >= 5) newInterventions.push({ domain: 'Frailty', domainHebrew: 'שבריריות', priority: 'High', action: 'Initiate Frailty Care Bundle', actionHebrew: 'התחל חבילת טיפול בשבריריות', rationale: 'CFS score ≥ 5 indicates frailty.', reference: 'Rockwood K, et al. 2005.' });
        if (scores.tinetti?.total < 19) newInterventions.push({ domain: 'Falls', domainHebrew: 'נפילות', priority: 'High', action: 'Initiate Falls Prevention Bundle', actionHebrew: 'התחל חבילת מניעת נפילות', rationale: 'Tinetti score < 19 indicates high fall risk.', reference: 'Tinetti ME. 1986.' });
        if (scores.gds?.total > 5) newInterventions.push({ domain: 'Mentation', domainHebrew: 'הכרה', priority: 'Medium', action: 'Further evaluation for depression', actionHebrew: 'המשך בירור לדיכאון', rationale: 'GDS-15 score > 5 suggests depression.', reference: 'Sheikh JI, Yesavage JA. 1986.' });
        medications.forEach(med => {
            if (BEERS_CRITERIA_DRUGS.includes(med.name.toLowerCase())) {
                newInterventions.push({ domain: 'Medication', domainHebrew: 'תרופות', priority: 'High', action: `Review Potentially Inappropriate Medication: ${med.name}`, actionHebrew: `שקול מחדש תרופה לא מתאימה: ${med.name}`, rationale: 'Medication is on the AGS Beers Criteria list of PIMs.', reference: 'AGS Beers Criteria 2023' });
            }
        });
        setInterventions(newInterventions);
    };

    // --- Render Functions ---
    const renderPatientDashboard = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2"><LayoutDashboard /> לוח בקרה</h2>
                <button onClick={handleCreateNewPatient} disabled={dataSource === 'emr'} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 disabled:opacity-50">
                    <PlusCircle size={20} /> צור מטופל/ת חדש/ה
                </button>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <table className="w-full text-right">
                    <thead><tr className="border-b border-slate-700"><th className="p-2">שם</th><th className="p-2">גיל</th><th className="p-2">CFS</th><th className="p-2">Tinetti</th><th className="p-2">פעולות</th></tr></thead>
                    <tbody>
                        {patientsList.map(p => (
                            <tr key={p.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                <td className="p-2 font-medium">{p.name}</td><td>{p.age}</td>
                                <td className="font-mono">{p.scores?.cfs?.total ?? '-'}</td>
                                <td className="font-mono">{p.scores?.tinetti?.total ?? '-'}</td>
                                <td className="flex items-center gap-2">
                                    <button onClick={() => setSelectedPatientId(p.id!)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded">טען</button>
                                    <button onClick={(e) => handleToggleReviewFlag(e, p.id!)} title="Flag for Review" className={`p-1 rounded ${reviewList.includes(p.id!) ? 'bg-yellow-500 text-white' : 'bg-slate-600 text-slate-400 hover:bg-slate-500'}`}>
                                        <Flag size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderCaseReviewModule = () => {
        const reviewPatients = patientsList.filter(p => reviewList.includes(p.id!));
        return (
            <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2"><Flag /> Case Review</h2>
                <p className="text-slate-400 mb-4">These are cases you have flagged for later review and reflection.</p>
                <div className="space-y-4">
                    {reviewPatients.length > 0 ? reviewPatients.map(p => (
                        <div key={p.id} className="bg-slate-900 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-200">{p.name}, {p.age}</h3>
                                    <p className="text-sm text-slate-400">CFS: {p.scores?.cfs?.total ?? 'N/A'}, Tinetti: {p.scores?.tinetti?.total ?? 'N/A'}</p>
                                </div>
                                <button onClick={() => setSelectedPatientId(p.id!)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">פתח תיק מלא</button>
                            </div>
                        </div>
                    )) : <p className="text-slate-500">No cases flagged for review.</p>}
                </div>
            </div>
        );
    };

    const renderConsultNoteGenerator = () => {
        const note = `
**Geriatric Consultation Note**

**Patient:** ${patient.name}, ${patient.age} y/o (ID: ${patient.idNumber})
**Chief Complaint:** ${patient.chiefComplaint}

**Geriatric Syndromes Assessment (4Ms):**

**What Matters:**
- **Frailty:** Clinical Frailty Scale (CFS) is ${scores.cfs?.total || 'not assessed'}.
- **Nutrition:** MNA-SF score is ${scores.mna?.total || 'not assessed'}.
- **Pressure Injury Risk:** Braden score is ${scores.braden?.total || 'not assessed'}.

**Medication:**
- Patient is on ${medications.length} medications.
- **Beers Criteria Review:** ${interventions.filter(i => i.domain === 'Medication').length > 0 ? interventions.filter(i => i.domain === 'Medication').map(i => i.action).join(', ') : 'No high-risk medications identified.'}

**Mentation:**
- **Cognition (MoCA):** ${scores.moca?.total || 'not assessed'} / 30.
- **Delirium (CAM):** ${scores.cam?.positive ? 'Positive' : 'Negative'}.
- **Depression (GDS-15):** ${scores.gds?.total || 'not assessed'} / 15.

**Mobility:**
- **Gait & Balance (Tinetti POMA):** Total score is ${scores.tinetti?.total || 'not assessed'} / 28. (Balance: ${scores.tinetti?.balance || 'N/A'}, Gait: ${scores.tinetti?.gait || 'N/A'}).
- **Fall Risk:** ${scores.tinetti?.total < 19 ? 'High Risk' : 'Low/Moderate Risk'}.

**Summary of Recommendations:**
${interventions.map(i => `- (${i.domainHebrew}) ${i.actionHebrew}: ${i.rationale}`).join('\n')}
        `.trim();

        const copyToClipboard = () => {
            const el = document.createElement('textarea');
            el.value = note;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert('Note copied to clipboard!');
        };

        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2"><FileText /> Consult Note Generator</h2>
                    <button onClick={copyToClipboard} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                        <Copy size={16} /> העתק ללוח
                    </button>
                </div>
                <pre className="bg-slate-900 p-4 rounded-lg text-sm text-slate-300 whitespace-pre-wrap font-sans">{note}</pre>
            </div>
        );
    };

    const renderLearningModule = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2"><BookOpen /> מנוע למידה</h2>
            <div className="bg-slate-900 p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h3 className="text-xl font-semibold mb-2 text-yellow-400 flex items-center gap-2"><Lightbulb /> פנינת היום בגריאטריה</h3>
                <p className="text-slate-300">{currentPearl?.pearl}</p>
                <p className="text-xs text-slate-500 text-right mt-2">- {currentPearl?.source}</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">ספריית מאמרים מכוננים</h3>
                <ul className="space-y-4">
                    {landmarkArticles.map((article, index) => (
                        <li key={index} className="border-b border-slate-700 pb-3">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-400 hover:underline">{article.title}</a>
                            <p className="text-sm text-slate-400">{article.author} ({article.year})</p>
                            <p className="text-xs text-slate-500 mt-1">{article.summary}</p>
                            <textarea 
                                value={article.notes}
                                onChange={(e) => handleArticleNoteChange(index, e.target.value)}
                                placeholder="My Clinical Takeaways..."
                                className="w-full bg-slate-800 p-2 mt-2 rounded-md text-sm text-slate-300 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    // Other render functions (Mentation, Mobility, etc.) are assumed to be here and complete.
    // The following is a placeholder for brevity.
    const renderMentationModule = () => <div>Mentation Module Content...</div>;
    const renderMobilityModule = () => <div>Mobility Module Content...</div>;
    const renderMedicationModule = () => <div>Medication Module Content...</div>;
    const renderWhatMattersModule = () => <div>What Matters Module Content...</div>;
    const renderEmrIntegrationModule = () => <div>EMR Integration Module Content...</div>;


    const renderModule = () => {
        if (!userId) return <div className="text-center text-slate-400 p-8">מתחבר למערכת...</div>
        if (isLoading && !['dashboard', 'emrIntegration', 'caseReview'].includes(activeModule)) return <p>טוען נתוני מטופל...</p>
        if (!selectedPatientId && !['dashboard', 'learning', 'emrIntegration', 'caseReview'].includes(activeModule)) return <div className="text-center text-slate-400"><p>יש לבחור מטופל מלוח הבקרה כדי להתחיל.</p><button onClick={() => setActiveModule('dashboard')} className="mt-4 bg-blue-600 p-2 rounded">חזור ללוח הבקרה</button></div>

        switch (activeModule) {
            case 'dashboard': return renderPatientDashboard();
            case 'patientInfo': return <div>Patient Info...</div>;
            case 'mentation': return renderMentationModule();
            case 'mobility': return renderMobilityModule();
            case 'medication': return renderMedicationModule();
            case 'whatMatters': return renderWhatMattersModule();
            case 'learning': return renderLearningModule();
            case 'emrIntegration': return renderEmrIntegrationModule();
            case 'caseReview': return renderCaseReviewModule();
            case 'noteGenerator': return renderConsultNoteGenerator();
            default: return renderPatientDashboard();
        }
    };
    
    const navItems = [
        { id: 'dashboard', label: 'לוח בקרה', icon: LayoutDashboard },
        { id: 'caseReview', label: 'Case Review', icon: Flag },
        { id: 'patientInfo', label: 'מידע כללי', icon: User },
        { id: 'mentation', label: 'הכרה', icon: Brain },
        { id: 'mobility', label: 'ניידות', icon: Accessibility },
        { id: 'medication', label: 'תרופות', icon: Pill },
        { id: 'whatMatters', label: 'מה שחשוב', icon: HeartPulse },
        { id: 'noteGenerator', label: 'מחולל סיכום', icon: FileText },
        { id: 'learning', label: 'למידה', icon: BookOpen },
        { id: 'emrIntegration', label: 'אינטגרציית EMR', icon: Server },
    ];

    return (
        <div className="bg-slate-950 text-white min-h-screen font-sans flex flex-col md:flex-row" dir="rtl">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 p-4 flex flex-col border-l border-slate-700">
                <h1 className="text-2xl font-bold text-white mb-2">פלטפורמה גריאטרית</h1>
                <p className="text-sm text-slate-400 mb-6">מרכז רפואי שערי צדק</p>
                <nav className="flex flex-col gap-2">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveModule(id)}
                            disabled={!selectedPatientId && !['dashboard', 'learning', 'emrIntegration', 'caseReview'].includes(id)}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors text-right ${activeModule === id? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'} ${!selectedPatientId && !['dashboard', 'learning', 'emrIntegration', 'caseReview'].includes(id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Icon size={20} />
                            {label}
                        </button>
                    ))}
                </nav>
                 <div className="mt-auto">
                    <button onClick={calculateAllScores} disabled={!selectedPatientId} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 disabled:opacity-50">
                        <Calculator size={20} />
                        חשב ציונים
                    </button>
                    <div className="text-xs text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                        <Wifi size={12} className={isSaving ? 'animate-pulse text-yellow-400' : (dataSource === 'emr' ? 'text-blue-400' : 'text-green-400')} />
                        {dataSource === 'emr' ? 'מצב EMR' : (isSaving ? 'שומר...' : 'מחובר')}
                    </div>
                </div>
            </aside>

            {/* Main Content & Results Panel */}
            <main className="flex-1 p-6 overflow-y-auto">
                {renderModule()}
            </main>
            <aside className="w-full md:w-96 bg-slate-900 p-6 border-r border-slate-700 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2"><ClipboardList /> ציונים והתערבויות</h2>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">סיכום ציונים</h3>
                    <div className="bg-slate-800 p-3 rounded-lg text-sm space-y-1">
                        {!selectedPatientId ? <p className="text-slate-400">יש לבחור מטופל.</p> :
                         Object.keys(scores).length === 0 ? <p className="text-slate-400">יש למלא הערכות וללחוץ על חישוב.</p> :
                         <>
                            {scores.gds && <p>GDS-15: <span className="font-mono text-yellow-400">{scores.gds.total} / 15</span></p>}
                            {scores.tinetti && <p>Tinetti POMA: <span className="font-mono text-yellow-400">{scores.tinetti.total} / 28</span></p>}
                            {scores.cfs && <p>Clinical Frailty Scale: <span className="font-mono text-yellow-400">{scores.cfs.total} / 9</span></p>}
                         </>
                        }
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">המלצות להתערבות</h3>
                    <div className="space-y-3">
                        {interventions.length === 0 ? <p className="text-slate-400 text-sm">לא נוצרו המלצות אוטומטיות.</p> :
                         interventions.map((int, index) => (
                            <div key={index} className={`p-3 rounded-lg border-l-4 ${ int.priority === 'High'? 'border-red-500 bg-red-900/20' : 'border-yellow-500 bg-yellow-900/20' }`}>
                                <p className="font-bold text-slate-100">{int.actionHebrew}</p>
                                <p className="text-sm text-slate-300">{int.rationale}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default ShaareZedekGeriatricsPlatform;