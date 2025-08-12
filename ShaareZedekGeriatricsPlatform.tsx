// ShaareZedekGeriatricsPlatform.tsx

// --- Add this import at the top ---
import { fetchPatientDataFromEMR } from './emrIntegrationService';
import { Search } from 'lucide-react'; // Also add 'Search' to the lucide-react import

//... (keep all existing interfaces and component code)...

const ShaareZedekGeriatricsPlatform: FC = () => {
    //... (keep all existing state declarations)...
    const [emrPatientId, setEmrPatientId] = useState<string>("987654321");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    //... (keep all existing data and useEffect hooks)...

    const handleLoadFromEMR = async () => {
        setIsLoading(true);
        setErrorMessage("");
        setInterventions(); // Clear previous interventions
        setScores({}); // Clear previous scores
        
        try {
            const data = await fetchPatientDataFromEMR(emrPatientId);

            // 1. Populate Patient Info
            setPatient(data.patientInfo);

            // 2. Populate Medication Module
            // In a real implementation, you would parse this list and cross-reference with STOPP/START
            const medicationText = data.medications.join('\n');
            // This is a simplified way to update the state for the textarea
            // A more robust solution would have a dedicated state for medications
            const medicationTextarea = document.querySelector('textarea[placeholder*="הזן כאן את רשימת התרופות"]');
            if (medicationTextarea) {
                (medicationTextarea as HTMLTextAreaElement).value = medicationText;
            }

            // 3. Pre-populate assessment fields based on EMR data (Data Mapping)
            let newAssessments: any = {};
            
            // Example: Map weight loss from notes to MNA-SF
            const weightLossNote = data.notes.find(note => note.includes("weight loss"));
            if (weightLossNote && weightLossNote.includes("5kg")) {
                newAssessments.mna = {...newAssessments.mna, weightLoss: '0' }; // >3kg loss
            }

            // Example: Map depression symptoms from notes to GDS-15
            const depressionNote = data.notes.find(note => note.includes("lost interest"));
            if (depressionNote) {
                newAssessments.gds = {...newAssessments.gds, q1: '1' }; // Dropped activities/interests
            }

            // Example: Map fall history to trigger a Tinetti POMA assessment
            // In a real app, you'd prompt the user to perform the POMA. Here we just log it.
            if (data.notes.some(note => note.includes("fall"))) {
                console.log("EMR data indicates history of falls. Recommend Tinetti POMA assessment.");
            }

            setAssessments(newAssessments);
            
            // In a real-world scenario, you would now have a partially filled form
            // and prompt the clinician to complete the remaining assessments.
            // For this demo, we'll just log a success message.
            console.log("EMR data loaded. Please complete remaining assessments.");

        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    // --- Inside the renderPatientInfo function, add the EMR loading section ---
    const renderPatientInfo = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">מידע על המטופל/ת</h2>
            
            {/* EMR Integration Section */}
            <div className="bg-slate-800 p-4 rounded-lg mb-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-2 text-slate-300">טעינת נתונים ממערכת הרשומה הרפואית</h3>
                <div className="flex items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="הזן מספר ת.ז. של מטופל/ת" 
                        value={emrPatientId}
                        onChange={e => setEmrPatientId(e.target.value)}
                        className="bg-slate-700 p-2 rounded w-full"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={handleLoadFromEMR}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-slate-500"
                        disabled={isLoading}
                    >
                        <Search size={20} />
                        {isLoading? "טוען..." : "טען נתונים"}
                    </button>
                </div>
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="שם מלא" value={patient.name} onChange={e => setPatient({...patient, name: e.target.value})} className="bg-slate-700 p-2 rounded" />
                <input type="number" placeholder="גיל" value={patient.age |

| ''} onChange={e => setPatient({...patient, age: parseInt(e.target.value)})} className="bg-slate-700 p-2 rounded" />
                <input type="text" placeholder="מספר תעודת זהות" value={patient.idNumber} onChange={e => setPatient({...patient, idNumber: e.target.value})} className="bg-slate-700 p-2 rounded" />
                <textarea placeholder="תלונה עיקרית" value={patient.chiefComplaint} onChange={e => setPatient({...patient, chiefComplaint: e.target.value})} className="bg-slate-700 p-2 rounded md:col-span-2 h-24" />
            </div>
        </div>
    );

    //... (rest of the component remains the same)...
};

export default ShaareZedekGeriatricsPlatform;
import React, { useState, useEffect, FC } from 'react';
import { 
    Brain, Pill, Accessibility, HeartPulse, 
    FileText, Users, AlertTriangle, Calculator, 
    Clock, Stethoscope, Activity, BookOpen, 
    Lightbulb, User, ClipboardList, ShieldCheck, Target
} from 'lucide-react';

// --- TypeScript Interfaces for Data Structure ---
interface Patient {
    name: string;
    age: number;
    idNumber: string;
    chiefComplaint: string;
}

interface Intervention {
    domain: string;
    priority: 'High' | 'Medium' | 'Low';
    action: string;
    rationale: string;
    reference?: string;
}

interface GeriatricPearl {
    id: number;
    pearl: string;
    source: string;
}

interface LandmarkArticle {
    title: string;
    author: string;
    journal: string;
    year: number;
    summary: string;
    url: string;
}

// --- Main Component ---
const ShaareZedekGeriatricsPlatform: FC = () => {
    const [activeModule, setActiveModule] = useState<string>('patientInfo');
    const [patient, setPatient] = useState<Patient>({ name: '', age: 0, idNumber: '', chiefComplaint: '' });
    const [assessments, setAssessments] = useState<any>({});
    const = useState<any>({});
    const [interventions, setInterventions] = useState<Intervention>();
    const [currentPearl, setCurrentPearl] = useState<GeriatricPearl | null>(null);

    // --- Landmark Articles & Geriatric Pearls Data ---
    const landmarkArticles: LandmarkArticle =;

    const geriatricPearls: GeriatricPearl =;

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * geriatricPearls.length);
        setCurrentPearl(geriatricPearls[randomIndex]);
    },);

    const handleAssessmentChange = (module: string, key: string, value: any) => {
        setAssessments((prev: any) => ({
          ...prev,
            [module]: {
              ...prev[module],
                [key]: value
            }
        }));
    };

    const calculateAllScores = () => {
        let newScores: any = {};

        // Mentation Scores
        if (assessments.moca) {
            newScores.moca = { total: Object.values(assessments.moca).reduce((sum: any, v) => sum + Number(v), 0) };
        }
        if (assessments.cam) {
            const { acuteOnset, inattention, disorganizedThinking, alteredConsciousness } = assessments.cam;
            newScores.cam = { positive: (acuteOnset && inattention) && (disorganizedThinking |

| alteredConsciousness) };
        }
        if (assessments.gds) {
            newScores.gds = { total: Object.values(assessments.gds).reduce((sum: any, v) => sum + Number(v), 0) };
        }

        // Mobility Scores
        if (assessments.barthel) {
            newScores.barthel = { total: Object.values(assessments.barthel).reduce((sum: any, v) => sum + Number(v), 0) };
        }
        if (assessments.iadl) {
            newScores.iadl = { total: Object.values(assessments.iadl).reduce((sum: any, v) => sum + Number(v), 0) };
        }
        if (assessments.tinetti) {
            const balanceScore = Object.values(assessments.tinetti.balance |

| {}).reduce((sum: any, v) => sum + Number(v), 0);
            const gaitScore = Object.values(assessments.tinetti.gait |

| {}).reduce((sum: any, v) => sum + Number(v), 0);
            newScores.tinetti = { balance: balanceScore, gait: gaitScore, total: balanceScore + gaitScore };
        }
        
        // What Matters Scores
        if (assessments.mna) {
            newScores.mna = { total: Object.values(assessments.mna).reduce((sum: any, v) => sum + Number(v), 0) };
        }
        if (assessments.cfs) {
            newScores.cfs = { total: Number(assessments.cfs.score) };
        }
        if (assessments.braden) {
            newScores.braden = { total: Object.values(assessments.braden).reduce((sum: any, v) => sum + Number(v), 0) };
        }

        setScores(newScores);
    };

    useEffect(() => {
        if (Object.keys(scores).length > 0) {
            generateInterventions();
        }
    }, [scores]);

    const generateInterventions = () => {
        const newInterventions: Intervention =;

        // Frailty Bundle
        if (scores.cfs?.total >= 5) {
            newInterventions.push({ domain: 'Frailty', priority: 'High', action: 'Initiate Frailty Care Bundle', rationale: 'CFS score ≥ 5 indicates frailty, a state of increased vulnerability.', reference: 'Rockwood K, et al. CMAJ. 2005.' });
            newInterventions.push({ domain: 'Frailty', priority: 'High', action: 'Perform full Comprehensive Geriatric Assessment (CGA)', rationale: 'Identify and address all contributing factors to frailty.', reference: 'IMA Syllabus' });
            newInterventions.push({ domain: 'Frailty', priority: 'Medium', action: 'Referral to Physiotherapy for resistance/balance program', rationale: 'Combat sarcopenia and improve function.', reference: 'Fried LP, et al. 2001.' });
            if (scores.mna?.total <= 11) {
                 newInterventions.push({ domain: 'Frailty', priority: 'High', action: 'Prioritize Nutrition/Dietitian consultation', rationale: 'Malnutrition is a key driver of frailty.', reference: 'Guigoz Y, et al. 1994.' });
            }
        }

        // Falls Bundle
        if (scores.tinetti?.total < 19) {
            newInterventions.push({ domain: 'Falls', priority: 'High', action: 'Initiate Falls Prevention Bundle', rationale: 'Tinetti POMA score < 19 indicates a high fall risk.', reference: 'Tinetti ME. 1986.' });
            newInterventions.push({ domain: 'Falls', priority: 'High', action: 'Medication review for high-risk drugs (psychotropics, antihypertensives)', rationale: 'Polypharmacy is a major contributor to falls.', reference: 'AGS Beers Criteria' });
            newInterventions.push({ domain: 'Falls', priority: 'Medium', action: 'Assess for orthostatic hypotension', rationale: 'A common reversible cause of falls.', reference: 'IMA Syllabus' });
            newInterventions.push({ domain: 'Falls', priority: 'Medium', action: 'Check Vitamin D level and/or recommend supplementation', rationale: 'Vitamin D is crucial for bone and muscle health.', reference: 'Israeli MoH Guidelines' });
            newInterventions.push({ domain: 'Falls', priority: 'Medium', action: 'Referral to Occupational Therapy for home safety evaluation', rationale: 'Mitigate environmental hazards.', reference: 'Tinetti ME, et al. NEJM. 1994.' });
        }

        // Delirium Alert
        if (scores.cam?.positive) {
            newInterventions.push({ domain: 'Mentation', priority: 'High', action: 'Initiate Delirium Workup', rationale: 'Positive CAM screen indicates delirium, a medical emergency.', reference: 'Inouye SK, et al. 1990.' });
            newInterventions.push({ domain: 'Mentation', priority: 'High', action: 'Review all medications for deliriogenic agents', rationale: 'Medications are a common precipitant of delirium.', reference: 'AGS Beers Criteria' });
            newInterventions.push({ domain: 'Mentation', priority: 'High', action: 'Order basic labs (CBC, electrolytes, BUN/Cr) and urinalysis', rationale: 'To identify infectious or metabolic causes.', reference: 'IMA Syllabus' });
        }
        
        // Depression Alert
        if (scores.gds?.total > 5) {
            newInterventions.push({ domain: 'Mentation', priority: 'Medium', action: 'Further evaluation for depression', rationale: 'GDS-15 score > 5 suggests depression.', reference: 'Sheikh JI, Yesavage JA. 1986.' });
        }

        // Cognitive Impairment
        if (scores.moca?.total < 26) {
            newInterventions.push({ domain: 'Mentation', priority: 'Medium', action: 'Consider further neuropsychological evaluation for cognitive impairment', rationale: 'MoCA score < 26 is suggestive of cognitive impairment.', reference: 'Nasreddine ZS, et al. 2005.' });
        }

        // Pressure Injury Risk
        if (scores.braden?.total <= 18) {
            newInterventions.push({ domain: 'Pressure Injury', priority: 'High', action: 'Initiate Pressure Injury Prevention (PIP) Bundle', rationale: 'Braden Scale score ≤ 18 indicates at-risk status.', reference: 'Braden BJ, Bergstrom N. 1987.' });
            if(assessments.braden?.mobility <= 2 |

| assessments.braden?.activity <= 2) {
                newInterventions.push({ domain: 'Pressure Injury', priority: 'Medium', action: 'Order pressure-redistributing support surface and implement turning schedule', rationale: 'Low mobility/activity scores on Braden scale.', reference: 'Israeli MoH Guidelines' });
            }
            if(assessments.braden?.nutrition <= 2) {
                newInterventions.push({ domain: 'Pressure Injury', priority: 'Medium', action: 'Recommend dietitian consult and high-protein supplements', rationale: 'Low nutrition score on Braden scale.', reference: 'Israeli MoH Guidelines' });
            }
        }

        // Palliative Care Trigger
        if (assessments.whatMatters?.surpriseQuestion === 'no') {
            newInterventions.push({ domain: 'Goals of Care', priority: 'High', action: 'Initiate Goals of Care Discussion', rationale: 'Clinician would not be surprised if patient died in the next year.', reference: 'Temel JS, et al. 2010.' });
            newInterventions.push({ domain: 'Goals of Care', priority: 'Medium', action: 'Consider Palliative Care consultation', rationale: 'To assist with symptom management and advance care planning.', reference: 'IMA Syllabus' });
        }

        setInterventions(newInterventions);
    };

    // --- Render Functions for each Module ---
    const renderPatientInfo = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">מידע על המטופל/ת</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="שם מלא" value={patient.name} onChange={e => setPatient({...patient, name: e.target.value})} className="bg-slate-700 p-2 rounded" />
                <input type="number" placeholder="גיל" value={patient.age |

| ''} onChange={e => setPatient({...patient, age: parseInt(e.target.value)})} className="bg-slate-700 p-2 rounded" />
                <input type="text" placeholder="מספר תעודת זהות" value={patient.idNumber} onChange={e => setPatient({...patient, idNumber: e.target.value})} className="bg-slate-700 p-2 rounded" />
                <textarea placeholder="תלונה עיקרית" value={patient.chiefComplaint} onChange={e => setPatient({...patient, chiefComplaint: e.target.value})} className="bg-slate-700 p-2 rounded md:col-span-2 h-24" />
            </div>
        </div>
    );

    const renderModule = () => {
        switch (activeModule) {
            case 'patientInfo': return renderPatientInfo();
            case 'mentation': return renderMentationModule();
            case 'mobility': return renderMobilityModule();
            case 'medication': return renderMedicationModule();
            case 'whatMatters': return renderWhatMattersModule();
            case 'learning': return renderLearningModule();
            default: return <p>בחר מודול מהתפריט</p>;
        }
    };
    
    const renderMentationModule = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2"><Brain /> Mentation (הכרה)</h2>
            {/* MoCA Assessment */}
            <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Montreal Cognitive Assessment (MoCA)</h3>
                {/* Simplified MoCA fields for demonstration */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <label>Visuospatial/Executive (5 pts): <input type="number" max="5" min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('moca', 'visuospatial', e.target.value)} /></label>
                    <label>Naming (3 pts): <input type="number" max="3" min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('moca', 'naming', e.target.value)} /></label>
                    <label>Memory (0 pts - no immediate points): <input type="text" placeholder="3 words" className="bg-slate-700 p-1 rounded" /></label>
                    <label>Attention (6 pts): <input type="number" max="6" min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('moca', 'attention', e.target.value)} /></label>
                    <label>Language (3 pts): <input type="number" max="3" min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('moca', 'language', e.target.value)} /></label>
                    <label>Abstraction (2 pts): <input type="number" max="2" min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('moca', 'abstraction', e.target.value)} /></label>
                    <label>Delayed Recall (5 pts): <input type="number" max="5" min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('moca', 'recall', e.target.value)} /></label>
                    <label>Orientation (6 pts): <input type="number" max="6" min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('moca', 'orientation', e.target.value)} /></label>
                </div>
            </div>
            {/* CAM Assessment */}
            <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Confusion Assessment Method (CAM)</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2"><input type="checkbox" onChange={e => handleAssessmentChange('cam', 'acuteOnset', e.target.checked)} /> 1. הופעה חריפה ומהלך תנודתי</label>
                    <label className="flex items-center gap-2"><input type="checkbox" onChange={e => handleAssessmentChange('cam', 'inattention', e.target.checked)} /> 2. הפרעה בקשב</label>
                    <label className="flex items-center gap-2"><input type="checkbox" onChange={e => handleAssessmentChange('cam', 'disorganizedThinking', e.target.checked)} /> 3. חשיבה לא מאורגנת</label>
                    <label className="flex items-center gap-2"><input type="checkbox" onChange={e => handleAssessmentChange('cam', 'alteredConsciousness', e.target.checked)} /> 4. שינוי ברמת ההכרה</label>
                </div>
            </div>
            {/* GDS-15 Assessment */}
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Geriatric Depression Scale (GDS-15)</h3>
                <p className="text-xs mb-2 text-slate-400">סמן 1 עבור כל תשובה המצביעה על דיכאון (מודגש)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {[
                        { q: "האם אתה שבע רצון מחייך?", a: "לא" },
                        { q: "האם הפחתת את רוב הפעילויות והתחביבים שלך?", a: "כן" },
                        { q: "האם אתה מרגיש שחייך ריקים?", a: "כן" },
                        { q: "האם אתה משתעמם לעיתים קרובות?", a: "כן" },
                        { q: "האם אתה במצב רוח טוב רוב הזמן?", a: "לא" },
                        { q: "האם אתה חושש שמשהו רע יקרה לך?", a: "כן" },
                        { q: "האם אתה מרגיש מאושר רוב הזמן?", a: "לא" },
                        { q: "האם אתה מרגיש חסר אונים לעיתים קרובות?", a: "כן" },
                        { q: "האם אתה מעדיף להישאר בבית?", a: "כן" },
                        { q: "האם יש לך יותר בעיות זיכרון מרוב האנשים?", a: "כן" },
                        { q: "האם אתה חושב שנפלא להיות בחיים?", a: "לא" },
                        { q: "האם אתה מרגיש חסר ערך?", a: "כן" },
                        { q: "האם אתה מרגיש מלא אנרגיה?", a: "לא" },
                        { q: "האם אתה מרגיש שמצבך חסר תקווה?", a: "כן" },
                        { q: "האם אתה חושב שמצבם של רוב האנשים טוב משלך?", a: "כן" },
                    ].map((item, index) => (
                        <label key={index} className="flex justify-between items-center">
                            <span>{index + 1}. {item.q} (תשובה מדאיגה: {item.a})</span>
                            <input type="number" min="0" max="1" className="bg-slate-700 w-12 p-1 rounded" onChange={e => handleAssessmentChange('gds', `q${index}`, e.target.value)} />
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMobilityModule = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2"><Accessibility /> Mobility (ניידות ותפקוד)</h2>
            {/* Barthel Index */}
            <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Barthel Index (ADL)</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    {[{label: 'האכלה', max: 10}, {label: 'רחצה', max: 5}, {label: 'טיפוח אישי', max: 5}, {label: 'הלבשה', max: 10}, {label: 'שליטה על סוגר שתן', max: 10}, {label: 'שליטה על סוגר צואה', max: 10}, {label: 'שימוש בשירותים', max: 10}, {label: 'מעברים (מיטה-כיסא)', max: 15}, {label: 'ניידות/הליכה', max: 15}, {label: 'עליית מדרגות', max: 10}].map(item => (
                        <label key={item.label}>{item.label} ({item.max} pts): <input type="number" max={item.max} min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('barthel', item.label, e.target.value)} /></label>
                    ))}
                </div>
            </div>
            {/* Lawton-Brody IADL Scale */}
            <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Lawton-Brody IADL Scale</h3>
                 <div className="grid grid-cols-2 gap-2 text-sm">
                    {[{label: 'שימוש בטלפון', max: 1}, {label: 'קניות', max: 1}, {label: 'הכנת אוכל', max: 1}, {label: 'עבודות בית', max: 1}, {label: 'כביסה', max: 1}, {label: 'נסיעות', max: 1}, {label: 'אחריות על תרופות', max: 1}, {label: 'ניהול כספים', max: 1}].map(item => (
                        <label key={item.label}>{item.label} ({item.max} pts): <input type="number" max={item.max} min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('iadl', item.label, e.target.value)} /></label>
                    ))}
                </div>
            </div>
            {/* Tinetti POMA */}
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Tinetti POMA (Gait & Balance)</h3>
                <div>
                    <h4 className="font-semibold text-slate-400 mt-2">Balance (max 16)</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {.map(item => (
                            <label key={item.label}>{item.label} ({item.max} pts): <input type="number" max={item.max} min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('tinetti', `balance.${item.label}`, e.target.value)} /></label>
                        ))}
                    </div>
                    <h4 className="font-semibold text-slate-400 mt-4">Gait (max 12)</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                         {.map(item => (
                            <label key={item.label}>{item.label} ({item.max} pts): <input type="number" max={item.max} min="0" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('tinetti', `gait.${item.label}`, e.target.value)} /></label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMedicationModule = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2"><Pill /> Medication (תרופות)</h2>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">רשימת תרופות</h3>
                <textarea placeholder="הזן כאן את רשימת התרופות המלאה, כולל מינונים..." className="w-full h-64 bg-slate-700 p-2 rounded" />
                <div className="mt-4">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        בדוק התאמה לפי קריטריוני STOPP/START ו-Beers (פונקציונליות עתידית)
                    </button>
                    <p className="text-xs text-slate-400 mt-2">
                        יש לבצע סקירת תרופות ידנית לאיתור תרופות שאינן מתאימות (PIMs) והשמטות טיפוליות (PPOs).
                    </p>
                </div>
            </div>
        </div>
    );

    const renderWhatMattersModule = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2"><HeartPulse /> What Matters (מה שחשוב למטופל/ת)</h2>
            {/* Goals of Care */}
            <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">מטרות הטיפול וערכים</h3>
                <textarea placeholder="תעד כאן את שיחת מטרות הטיפול: מה חשוב למטופל/ת? מהם הערכים והעדפות? תכנון טיפולי מקדים..." className="w-full h-32 bg-slate-700 p-2 rounded" />
                <div className="mt-2">
                    <label className="flex items-center gap-2">
                        שאלת ההפתעה: "האם תהיה מופתע אם מטופל זה ילך לעולמו בשנה הקרובה?"
                        <select className="bg-slate-700 p-1 rounded" onChange={e => handleAssessmentChange('whatMatters', 'surpriseQuestion', e.target.value)}>
                            <option value="">בחר</option>
                            <option value="yes">כן</option>
                            <option value="no">לא</option>
                        </select>
                    </label>
                </div>
            </div>
            {/* MNA-SF */}
            <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">Mini Nutritional Assessment - Short Form (MNA-SF)</h3>
                <div className="space-y-2 text-sm">
                    <label className="flex justify-between">ירידה בצריכת מזון ב-3 חודשים: <select className="bg-slate-700 p-1 rounded" onChange={e => handleAssessmentChange('mna', 'foodIntake', e.target.value)}><option value="2">אין ירידה</option><option value="1">ירידה בינונית</option><option value="0">ירידה חמורה</option></select></label>
                    <label className="flex justify-between">ירידה במשקל ב-3 חודשים: <select className="bg-slate-700 p-1 rounded" onChange={e => handleAssessmentChange('mna', 'weightLoss', e.target.value)}><option value="3">אין ירידה</option><option value="2">1-3 ק"ג</option><option value="1">לא יודע</option><option value="0">מעל 3 ק"ג</option></select></label>
                    <label className="flex justify-between">ניידות: <select className="bg-slate-700 p-1 rounded" onChange={e => handleAssessmentChange('mna', 'mobility', e.target.value)}><option value="2">יוצא מהבית</option><option value="1">מוגבל לבית</option><option value="0">מרותק למיטה/כיסא</option></select></label>
                    <label className="flex justify-between">סטרס פסיכולוגי או מחלה חריפה ב-3 חודשים: <select className="bg-slate-700 p-1 rounded" onChange={e => handleAssessmentChange('mna', 'stress', e.target.value)}><option value="2">לא</option><option value="0">כן</option></select></label>
                    <label className="flex justify-between">בעיות נוירופסיכולוגיות: <select className="bg-slate-700 p-1 rounded" onChange={e => handleAssessmentChange('mna', 'neuro', e.target.value)}><option value="2">אין</option><option value="1">דמנציה קלה</option><option value="0">דמנציה/דיכאון חמורים</option></select></label>
                    <label className="flex justify-between">BMI: <select className="bg-slate-700 p-1 rounded" onChange={e => handleAssessmentChange('mna', 'bmi', e.target.value)}><option value="3">23 ומעלה</option><option value="2">21-23</option><option value="1">19-21</option><option value="0">פחות מ-19</option></select></label>
                </div>
            </div>
            {/* Clinical Frailty Scale & Braden Scale */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2 text-slate-300">Clinical Frailty Scale (CFS)</h3>
                    <select className="w-full bg-slate-700 p-2 rounded" onChange={e => handleAssessmentChange('cfs', 'score', e.target.value)}>
                        {.map(item => <option key={item.val} value={item.val}>{item.text}</option>)}
                    </select>
                </div>
                 <div className="bg-slate-900 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2 text-slate-300">Braden Scale (Pressure Injury Risk)</h3>
                    <div className="space-y-1 text-sm">
                        {.map(item => (
                            <label key={item.label} className="flex justify-between">{item.label}: <input type="number" max={item.max} min="1" className="bg-slate-700 w-16 p-1 rounded" onChange={e => handleAssessmentChange('braden', item.label, e.target.value)} /></label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLearningModule = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2"><BookOpen /> מנוע למידה ושינון</h2>
            {/* Geriatric Pearl */}
            <div className="bg-slate-900 p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h3 className="text-xl font-semibold mb-2 text-yellow-400 flex items-center gap-2"><Lightbulb /> פנינת היום בגריאטריה</h3>
                <p className="text-slate-300">{currentPearl?.pearl}</p>
                <p className="text-xs text-slate-500 text-right mt-2">- {currentPearl?.source}</p>
            </div>
            {/* Landmark Literature */}
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-300">ספריית מאמרים מכוננים</h3>
                <ul className="space-y-2">
                    {landmarkArticles.map((article, index) => (
                        <li key={index} className="border-b border-slate-700 pb-2">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-400 hover:underline">{article.title}</a>
                            <p className="text-sm text-slate-400">{article.author} ({article.year}) - {article.journal}</p>
                            <p className="text-xs text-slate-500 mt-1">{article.summary}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    // --- Main Layout ---
    const navItems =;

    return (
        <div className="bg-slate-950 text-white min-h-screen font-sans flex flex-col md:flex-row" dir="rtl">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-900 p-4 flex flex-col border-l border-slate-700">
                <h1 className="text-2xl font-bold text-white mb-2">פלטפורמה גריאטרית</h1>
                <p className="text-sm text-slate-400 mb-6">מרכז רפואי שערי צדק</p>
                <nav className="flex flex-col gap-2">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveModule(id)}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors text-right ${activeModule === id? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                        >
                            <Icon size={20} />
                            {label}
                        </button>
                    ))}
                </nav>
                 <div className="mt-auto">
                    <button onClick={calculateAllScores} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">
                        <Calculator size={20} />
                        חשב ציונים והפק המלצות
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {renderModule()}
            </main>

            {/* Results Panel */}
            <aside className="w-full md:w-96 bg-slate-900 p-6 border-r border-slate-700 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2"><ClipboardList /> ציונים והתערבויות</h2>
                
                {/* Scores Display */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">סיכום ציונים</h3>
                    <div className="bg-slate-800 p-3 rounded-lg text-sm space-y-1">
                        {Object.keys(scores).length === 0 && <p className="text-slate-400">יש למלא הערכות וללחוץ על כפתור החישוב.</p>}
                        {scores.moca && <p>MoCA: <span className="font-mono text-yellow-400">{scores.moca.total} / 30</span></p>}
                        {scores.cam && <p>CAM: <span className={`font-mono ${scores.cam.positive? 'text-red-500' : 'text-green-400'}`}>{scores.cam.positive? 'חיובי לדליריום' : 'שלילי'}</span></p>}
                        {scores.gds && <p>GDS-15: <span className="font-mono text-yellow-400">{scores.gds.total} / 15</span></p>}
                        {scores.barthel && <p>Barthel: <span className="font-mono text-yellow-400">{scores.barthel.total} / 100</span></p>}
                        {scores.iadl && <p>IADL: <span className="font-mono text-yellow-400">{scores.iadl.total} / 8</span></p>}
                        {scores.tinetti && <p>Tinetti POMA: <span className="font-mono text-yellow-400">{scores.tinetti.total} / 28</span> (B: {scores.tinetti.balance}, G: {scores.tinetti.gait})</p>}
                        {scores.mna && <p>MNA-SF: <span className="font-mono text-yellow-400">{scores.mna.total} / 14</span></p>}
                        {scores.cfs && <p>Clinical Frailty Scale: <span className="font-mono text-yellow-400">{scores.cfs.total} / 9</span></p>}
                        {scores.braden && <p>Braden Scale: <span className="font-mono text-yellow-400">{scores.braden.total} / 23</span></p>}
                    </div>
                </div>

                {/* Interventions Display */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">המלצות להתערבות</h3>
                    <div className="space-y-3">
                        {interventions.length === 0 && <p className="text-slate-400 text-sm">לא נוצרו המלצות אוטומטיות.</p>}
                        {interventions.map((int, index) => (
                            <div key={index} className={`p-3 rounded-lg border-l-4 ${
                                int.priority === 'High'? 'border-red-500 bg-red-900/20' : 
                                int.priority === 'Medium'? 'border-yellow-500 bg-yellow-900/20' : 
                                'border-blue-500 bg-blue-900/20'
                            }`}>
                                <p className="font-bold text-slate-100">{int.action}</p>
                                <p className="text-sm text-slate-300">{int.rationale}</p>
                                <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                                    <span>תחום: {int.domain}</span>
                                    <span className={`font-semibold ${
                                        int.priority === 'High'? 'text-red-400' : 
                                        int.priority === 'Medium'? 'text-yellow-400' : 
                                        'text-blue-400'
                                    }`}>עדיפות: {int.priority}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default ShaareZedekGeriatricsPlatform;
