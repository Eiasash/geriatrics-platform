import React from 'react';

const App = () => {
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('meds');

  const medications = [
    { id: 1, name: 'Apixaban (Eliquis)', dose: '5mg BID', class: 'DOAC' },
    { id: 2, name: 'Metformin', dose: '500mg BID', class: 'Diabetes' },
    { id: 3, name: 'Donepezil (Aricept)', dose: '5-10mg QHS', class: 'Dementia' }
  ];

  if (showAdmin && password !== 'geriatrics2024') {
    return (
      <div style={{padding:'20px', textAlign:'center'}}>
        <h2>Admin Login</h2>
        <input 
          type="password" 
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          style={{padding:'10px', margin:'10px'}}
        />
        <button onClick={() => setShowAdmin(false)} style={{padding:'10px 20px'}}>
          Back
        </button>
      </div>
    );
  }

  if (showAdmin && password === 'geriatrics2024') {
    return (
      <div style={{padding:'20px'}}>
        <h1>Admin Panel</h1>
        <p>Admin features would go here</p>
        <button onClick={() => {setShowAdmin(false); setPassword('');}} style={{padding:'10px 20px'}}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{fontFamily:'Arial, sans-serif'}}>
      <header style={{backgroundColor:'#2563eb', color:'white', padding:'20px'}}>
        <h1 style={{margin:0}}>Geriatrics Platform</h1>
        <nav style={{marginTop:'10px'}}>
          <button onClick={() => setActiveTab('meds')} style={{marginRight:'10px', padding:'5px 10px'}}>
            Medications
          </button>
          <button onClick={() => setActiveTab('tools')} style={{marginRight:'10px', padding:'5px 10px'}}>
            Tools
          </button>
          <button onClick={() => setShowAdmin(true)} style={{padding:'5px 10px'}}>
            Admin
          </button>
        </nav>
      </header>
      
      <main style={{padding:'20px'}}>
        {activeTab === 'meds' && (
          <div>
            <h2>Medication Guide</h2>
            {medications.map(med => (
              <div key={med.id} style={{padding:'10px', margin:'10px 0', backgroundColor:'#f3f4f6', borderRadius:'5px'}}>
                <strong>{med.name}</strong>
                <div>Class: {med.class}</div>
                <div>Dose: {med.dose}</div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'tools' && (
          <div>
            <h2>Clinical Tools</h2>
            <p>Calculators and tools will go here</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
