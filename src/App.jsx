import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, getDocs, writeBatch, doc, setDoc, deleteDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { Search, Pill, Brain, BookOpen, Shield, Settings, Home, ChevronRight, Plus, Trash2, Edit, Calculator, Languages } from 'lucide-react';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const ADMIN_PASSWORD = "geriatrics2024";

let db;
try {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  db = getFirestore(app);
  signInAnonymously(auth).catch(error => console.error("Auth failed:", error));
} catch (e) {
  console.error("Firebase init failed:", e);
}

const initialMedications = [
  { id: 'med1', name: 'Apixaban', he_name: 'אליקוויס', dosing: '5mg BID, reduce if 2+ criteria', class: 'DOAC' },
  { id: 'med2', name: 'Metformin', he_name: 'מטפורמין', dosing: '500mg BID, stop if eGFR<30', class: 'Biguanide' },
  { id: 'med3', name: 'Donepezil', he_name: 'אריספט', dosing: '5mg HS x4wk then 10mg', class: 'ChEI' }
];

const initialQuestions = [
  { id: 'q1', question: '85yo woman with confusion x2d. T 37.2, BP 105/60, HR 110. UA: LE+, nitrites+. Diagnosis?', 
    options: ['UTI with delirium', 'Stroke', 'Dementia', 'Subdural'], answer: 0 }
];

const App = () => {
  const [route, setRoute] = useState('/');
  const [activeTab, setActiveTab] = useState('meds');
  const [lang, setLang] = useState('en');
  const [medications, setMedications] = useState(initialMedications);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  useEffect(() => {
    if (!db) return;
    
    const loadData = async () => {
      try {
        const medsSnapshot = await getDocs(collection(db, "medications"));
        if (medsSnapshot.empty && initialMedications.length > 0) {
          const batch = writeBatch(db);
          initialMedications.forEach(med => {
            batch.set(doc(db, "medications", med.id), med);
          });
          await batch.commit();
        } else {
          setMedications(medsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        console.error("DB error:", err);
      }
    };
    
    loadData();
  }, []);

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setRoute('/admin');
    }
  };

  if (route === '/admin' && !isAdmin) {
    return (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'20px', minHeight:'100vh', backgroundColor:'#f3f4f6'}}>
        <h2>Admin Login</h2>
        <input 
          type="password" 
          value={adminPass} 
          onChange={(e) => setAdminPass(e.target.value)}
          placeholder="Password"
          style={{padding:'10px', margin:'10px', border:'1px solid #ccc', borderRadius:'5px'}}
        />
        <button onClick={handleAdminLogin} style={{padding:'10px 20px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>
          Login
        </button>
        <button onClick={() => setRoute('/')} style={{marginTop:'10px', padding:'10px 20px', backgroundColor:'#6b7280', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>
          Back to Main
        </button>
      </div>
    );
  }

  if (route === '/admin' && isAdmin) {
    return (
      <div style={{padding:'20px', backgroundColor:'#f3f4f6', minHeight:'100vh'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <h1>Admin Panel</h1>
          <button onClick={() => {setRoute('/'); setIsAdmin(false);}} style={{padding:'10px 20px', backgroundColor:'#6b7280', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>
            Back to Site
          </button>
        </div>
        <div style={{backgroundColor:'white', padding:'20px', borderRadius:'10px', marginBottom:'20px'}}>
          <h2>Medications: {medications.length}</h2>
          <p>Add/edit functionality here</p>
        </div>
        <div style={{backgroundColor:'white', padding:'20px', borderRadius:'10px'}}>
          <h2>Questions: {questions.length}</h2>
          <p>Add/edit functionality here</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh', backgroundColor:'#f3f4f6'}}>
      <header style={{backgroundColor:'white', boxShadow:'0 1px 3px rgba(0,0,0,0.1)', position:'sticky', top:0, zIndex:10}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
          <h1 style={{fontSize:'24px', fontWeight:'bold', color:'#1f2937', margin:0}}>Geriatrics Platform</h1>
          <nav style={{display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap'}}>
            <button 
              onClick={() => setActiveTab('meds')} 
              style={{
                padding:'8px 16px', 
                backgroundColor: activeTab === 'meds' ? '#3b82f6' : 'transparent',
                color: activeTab === 'meds' ? 'white' : '#4b5563',
                border:'none', 
                borderRadius:'5px', 
                cursor:'pointer'
              }}
            >
              Medications
            </button>
            <button 
              onClick={() => setActiveTab('quiz')} 
              style={{
                padding:'8px 16px', 
                backgroundColor: activeTab === 'quiz' ? '#3b82f6' : 'transparent',
                color: activeTab === 'quiz' ? 'white' : '#4b5563',
                border:'none', 
                borderRadius:'5px', 
                cursor:'pointer'
              }}
            >
              Board Review
            </button>
            <button 
              onClick={() => setActiveTab('tools')} 
              style={{
                padding:'8px 16px', 
                backgroundColor: activeTab === 'tools' ? '#3b82f6' : 'transparent',
                color: activeTab === 'tools' ? 'white' : '#4b5563',
                border:'none', 
                borderRadius:'5px', 
                cursor:'pointer'
              }}
            >
              Clinical Tools
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'he' : 'en')} style={{padding:'8px', backgroundColor:'#f3f4f6', border:'none', borderRadius:'5px', cursor:'pointer'}}>
              {lang === 'en' ? 'עב' : 'EN'}
            </button>
            <button onClick={() => setRoute('/admin')} style={{padding:'8px', backgroundColor:'#f3f4f6', border:'none', borderRadius:'5px', cursor:'pointer'}}>
              <Shield size={20} />
            </button>
          </nav>
        </div>
      </header>

      <main style={{maxWidth:'1200px', margin:'0 auto', padding:'20px'}}>
        {activeTab === 'meds' && (
          <div style={{backgroundColor:'white', padding:'20px', borderRadius:'10px'}}>
            <h2 style={{fontSize:'20px', fontWeight:'bold', marginBottom:'16px'}}>Medication Guide</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
              {medications.map(med => (
                <div key={med.id} style={{padding:'12px', backgroundColor:'#f9fafb', borderRadius:'5px', border:'1px solid #e5e7eb'}}>
                  <div style={{fontWeight:'bold'}}>{med.name} ({med.he_name})</div>
                  <div style={{fontSize:'14px', color:'#6b7280', marginTop:'4px'}}>Class: {med.class}</div>
                  <div style={{fontSize:'14px', color:'#6b7280'}}>Dosing: {med.dosing}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div style={{backgroundColor:'white', padding:'20px', borderRadius:'10px'}}>
            <h2 style={{fontSize:'20px', fontWeight:'bold', marginBottom:'16px'}}>Board Review Questions</h2>
            {questions.map((q, idx) => (
              <div key={q.id} style={{marginBottom:'20px', padding:'16px', backgroundColor:'#f9fafb', borderRadius:'5px'}}>
                <div style={{fontWeight:'bold', marginBottom:'10px'}}>Q{idx+1}: {q.question}</div>
                {q.options.map((opt, i) => (
                  <div key={i} style={{padding:'8px', marginLeft:'20px'}}>
                    {String.fromCharCode(65+i)}) {opt}
                  </div>
                ))}
                <details style={{marginTop:'10px'}}>
                  <summary style={{cursor:'pointer', color:'#3b82f6'}}>Show Answer</summary>
                  <div style={{marginTop:'8px', padding:'8px', backgroundColor:'#dbeafe', borderRadius:'3px'}}>
                    Answer: {String.fromCharCode(65+q.answer)}) {q.options[q.answer]}
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tools' && (
          <div style={{backgroundColor:'white', padding:'20px', borderRadius:'10px'}}>
            <h2 style={{fontSize:'20px', fontWeight:'bold', marginBottom:'16px'}}>Clinical Tools</h2>
            <div style={{display:'grid', gap:'10px'}}>
              <button style={{padding:'16px', backgroundColor:'#f3f4f6', border:'1px solid #e5e7eb', borderRadius:'5px', textAlign:'left', cursor:'pointer'}}>
                <Calculator style={{display:'inline', marginRight:'8px'}} size={20} />
                Cockcroft-Gault Calculator
              </button>
              <button style={{padding:'16px', backgroundColor:'#f3f4f6', border:'1px solid #e5e7eb', borderRadius:'5px', textAlign:'left', cursor:'pointer'}}>
                <Calculator style={{display:'inline', marginRight:'8px'}} size={20} />
                Beers Criteria Checker
              </button>
              <button style={{padding:'16px', backgroundColor:'#f3f4f6', border:'1px solid #e5e7eb', borderRadius:'5px', textAlign:'left', cursor:'pointer'}}>
                <Calculator style={{display:'inline', marginRight:'8px'}} size={20} />
                FRAX Score
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
