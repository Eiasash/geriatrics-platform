// Clinical Calculators Module
const calculators = {
    // Clinical Frailty Scale
    cfs: {
        name: {
            he: "סולם שבריריות קלינית",
            en: "Clinical Frailty Scale"
        },
        fields: [
            {
                id: "mobility",
                label: { he: "ניידות", en: "Mobility" },
                type: "select",
                options: [
                    { value: 1, text: { he: "כשיר מאוד", en: "Very Fit" }},
                    { value: 2, text: { he: "בריא", en: "Well" }},
                    { value: 3, text: { he: "מסתדר", en: "Managing Well" }},
                    { value: 4, text: { he: "פגיע", en: "Vulnerable" }},
                    { value: 5, text: { he: "שברירי קל", en: "Mildly Frail" }},
                    { value: 6, text: { he: "שברירי בינוני", en: "Moderately Frail" }},
                    { value: 7, text: { he: "שברירי קשה", en: "Severely Frail" }},
                    { value: 8, text: { he: "שברירי קשה מאוד", en: "Very Severely Frail" }},
                    { value: 9, text: { he: "סופני", en: "Terminally Ill" }}
                ]
            },
            {
                id: "age",
                label: { he: "גיל", en: "Age" },
                type: "number",
                min: 65,
                max: 120
            },
            {
                id: "medications",
                label: { he: "מספר תרופות", en: "Number of Medications" },
                type: "number",
                min: 0,
                max: 30
            }
        ],
        calculate: function(values) {
            let score = parseInt(values.mobility) || 0;
            const age = parseInt(values.age) || 0;
            const meds = parseInt(values.medications) || 0;
            
            // Adjust score based on factors
            if (age > 80) score += 1;
            if (age > 90) score += 1;
            if (meds > 5) score += 1;
            if (meds > 10) score += 1;
            
            score = Math.min(score, 9);
            
            let interpretation = "";
            let recommendations = [];
            
            if (score <= 3) {
                interpretation = { 
                    he: "כשיר עד מסתדר היטב", 
                    en: "Fit to Managing Well" 
                };
                recommendations = {
                    he: ["המשך מעקב שגרתי", "עידוד פעילות גופנית", "מניעה ראשונית"],
                    en: ["Continue routine follow-up", "Encourage physical activity", "Primary prevention"]
                };
            } else if (score <= 5) {
                interpretation = { 
                    he: "פגיע עד שברירי קל", 
                    en: "Vulnerable to Mildly Frail" 
                };
                recommendations = {
                    he: ["הערכה גריאטרית מקיפה", "סקירת תרופות", "הערכת סיכון לנפילות"],
                    en: ["Comprehensive Geriatric Assessment", "Medication review", "Fall risk assessment"]
                };
            } else if (score <= 7) {
                interpretation = { 
                    he: "שברירי בינוני עד קשה", 
                    en: "Moderately to Severely Frail" 
                };
                recommendations = {
                    he: ["תמיכה רב-תחומית", "שיקול טיפול פליאטיבי", "תכנון טיפול מתקדם"],
                    en: ["Multidisciplinary support", "Consider palliative care", "Advance care planning"]
                };
            } else {
                interpretation = { 
                    he: "שברירי קשה מאוד עד סופני", 
                    en: "Very Severely Frail to Terminal" 
                };
                recommendations = {
                    he: ["טיפול תומך", "הנחיות מקדימות", "איכות חיים"],
                    en: ["Supportive care", "Advance directives", "Quality of life focus"]
                };
            }
            
            return {
                score: score,
                maxScore: 9,
                interpretation: interpretation,
                recommendations: recommendations,
                risk: score > 5 ? "high" : score > 3 ? "medium" : "low"
            };
        }
    },
    
    // Morse Fall Scale
    morse: {
        name: {
            he: "סולם Morse לנפילות",
            en: "Morse Fall Scale"
        },
        fields: [
            {
                id: "history",
                label: { he: "היסטוריה של נפילות", en: "History of Falls" },
                type: "select",
                options: [
                    { value: 0, text: { he: "לא", en: "No" }},
                    { value: 25, text: { he: "כן", en: "Yes" }}
                ]
            },
            {
                id: "secondary",
                label: { he: "אבחנה משנית", en: "Secondary Diagnosis" },
                type: "select",
                options: [
                    { value: 0, text: { he: "לא", en: "No" }},
                    { value: 15, text: { he: "כן", en: "Yes" }}
                ]
            },
            {
                id: "ambulatory",
                label: { he: "עזרי הליכה", en: "Ambulatory Aid" },
                type: "select",
                options: [
                    { value: 0, text: { he: "ללא/מיטה/כסא גלגלים", en: "None/Bed/Wheelchair" }},
                    { value: 15, text: { he: "קביים/מקל/הליכון", en: "Crutches/Cane/Walker" }},
                    { value: 30, text: { he: "נאחז ברהיטים", en: "Furniture" }}
                ]
            },
            {
                id: "iv",
                label: { he: "עירוי תוך ורידי", en: "IV/Heparin Lock" },
                type: "select",
                options: [
                    { value: 0, text: { he: "לא", en: "No" }},
                    { value: 20, text: { he: "כן", en: "Yes" }}
                ]
            },
            {
                id: "gait",
                label: { he: "הליכה", en: "Gait" },
                type: "select",
                options: [
                    { value: 0, text: { he: "תקין/מרותק למיטה", en: "Normal/Bedrest" }},
                    { value: 10, text: { he: "חלש", en: "Weak" }},
                    { value: 20, text: { he: "פגום", en: "Impaired" }}
                ]
            },
            {
                id: "mental",
                label: { he: "מצב מנטלי", en: "Mental Status" },
                type: "select",
                options: [
                    { value: 0, text: { he: "מודע ליכולותיו", en: "Oriented to own ability" }},
                    { value: 15, text: { he: "שוכח מגבלות", en: "Forgets limitations" }}
                ]
            }
        ],
        calculate: function(values) {
            const score = Object.values(values).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
            
            let interpretation, recommendations;
            
            if (score < 25) {
                interpretation = { 
                    he: "סיכון נמוך", 
                    en: "Low Risk" 
                };
                recommendations = {
                    he: ["טיפול סיעודי בסיסי", "סביבה בטוחה"],
                    en: ["Basic nursing care", "Safe environment"]
                };
            } else if (score < 45) {
                interpretation = { 
                    he: "סיכון בינוני", 
                    en: "Medium Risk" 
                };
                recommendations = {
                    he: ["יישום אמצעי מניעת נפילות", "הערכה תכופה", "חינוך משפחה"],
                    en: ["Implement fall prevention", "Frequent assessment", "Family education"]
                };
            } else {
                interpretation = { 
                    he: "סיכון גבוה", 
                    en: "High Risk" 
                };
                recommendations = {
                    he: ["כל אמצעי המניעה", "השגחה צמודה", "שיקול ריסון אלטרנטיבי"],
                    en: ["All prevention measures", "Close supervision", "Consider alternatives to restraints"]
                };
            }
            
            return {
                score: score,
                maxScore: 125,
                interpretation: interpretation,
                recommendations: recommendations,
                risk: score >= 45 ? "high" : score >= 25 ? "medium" : "low"
            };
        }
    },
    
    // MMSE
    mmse: {
        name: {
            he: "MMSE - בדיקה קוגניטיבית",
            en: "MMSE - Mini Mental State Exam"
        },
        fields: [
            {
                id: "orientation_time",
                label: { he: "התמצאות בזמן (5 נק')", en: "Orientation to Time (5 pts)" },
                type: "number",
                min: 0,
                max: 5
            },
            {
                id: "orientation_place",
                label: { he: "התמצאות במקום (5 נק')", en: "Orientation to Place (5 pts)" },
                type: "number",
                min: 0,
                max: 5
            },
            {
                id: "registration",
                label: { he: "רישום (3 נק')", en: "Registration (3 pts)" },
                type: "number",
                min: 0,
                max: 3
            },
            {
                id: "attention",
                label: { he: "קשב וחישוב (5 נק')", en: "Attention & Calculation (5 pts)" },
                type: "number",
                min: 0,
                max: 5
            },
            {
                id: "recall",
                label: { he: "היזכרות (3 נק')", en: "Recall (3 pts)" },
                type: "number",
                min: 0,
                max: 3
            },
            {
                id: "language",
                label: { he: "שפה (8 נק')", en: "Language (8 pts)" },
                type: "number",
                min: 0,
                max: 8
            },
            {
                id: "construction",
                label: { he: "בנייה חזותית (1 נק')", en: "Visual Construction (1 pt)" },
                type: "number",
                min: 0,
                max: 1
            }
        ],
        calculate: function(values) {
            const score = Object.values(values).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
            
            let interpretation, recommendations;
            
            if (score >= 24) {
                interpretation = { 
                    he: "קוגניציה תקינה", 
                    en: "Normal Cognition" 
                };
                recommendations = {
                    he: ["המשך מעקב שנתי"],
                    en: ["Continue annual screening"]
                };
            } else if (score >= 19) {
                interpretation = { 
                    he: "ירידה קוגניטיבית קלה", 
                    en: "Mild Cognitive Impairment" 
                };
                recommendations = {
                    he: ["הערכה נוירופסיכולוגית", "בדיקות מעבדה", "MRI מוח"],
                    en: ["Neuropsychological assessment", "Lab workup", "Brain MRI"]
                };
            } else if (score >= 10) {
                interpretation = { 
                    he: "דמנציה בינונית", 
                    en: "Moderate Dementia" 
                };
                recommendations = {
                    he: ["הערכה מקיפה", "תמיכה משפחתית", "שירותים סוציאליים"],
                    en: ["Comprehensive assessment", "Family support", "Social services"]
                };
            } else {
                interpretation = { 
                    he: "דמנציה קשה", 
                    en: "Severe Dementia" 
                };
                recommendations = {
                    he: ["טיפול תומך", "הסדרי אפוטרופסות", "שיקולים פליאטיביים"],
                    en: ["Supportive care", "Legal arrangements", "Palliative considerations"]
                };
            }
            
            return {
                score: score,
                maxScore: 30,
                interpretation: interpretation,
                recommendations: recommendations,
                risk: score < 19 ? "high" : score < 24 ? "medium" : "low"
            };
        }
    }
};