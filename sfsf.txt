// emrIntegrationService.ts

// --- TypeScript Interfaces for Mock EMR Data ---
interface EmrPatientData {
    patientInfo: {
        name: string;
        age: number;
        idNumber: string;
        chiefComplaint: string;
    };
    medications: string;
    recentLabs: {
        [key: string]: string | number;
    };
    vitals: {
        [key: string]: string | number;
    };
    notes: string;
}

// --- Mock EMR Database ---
const mockEmrDatabase: { [key: string]: EmrPatientData } = {
    "987654321": {
        patientInfo: {
            name: "ישראל ישראלי",
            age: 82,
            idNumber: "987654321",
            chiefComplaint: "קוצר נשימה והחמרה בבצקת ברגליים",
        },
        medications:,
        recentLabs: {
            "Sodium": 132, // mEq/L
            "Potassium": 3.4, // mEq/L
            "Creatinine": 1.8, // mg/dL
            "BUN": 35, // mg/dL
            "HemoglobinA1c": 7.8, // %
            "TSH": 3.2, // µIU/mL
            "VitaminD": 18 // ng/mL
        },
        vitals: {
            "Weight": 75, // kg
            "Height": 170, // cm
            "LyingBP": "145/80",
            "StandingBP": "120/70"
        },
        notes:
    }
};

// --- Mock API Fetch Function ---
export const fetchPatientDataFromEMR = (patientId: string): Promise<EmrPatientData> => {
    console.log(`Fetching data for patient ID: ${patientId} from mock EMR...`);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mockEmrDatabase[patientId]) {
                console.log("Data fetched successfully.");
                resolve(mockEmrDatabase[patientId]);
            } else {
                console.error("Patient not found in mock EMR.");
                reject(new Error("Patient not found"));
            }
        }, 1500); // Simulate network delay
    });
};