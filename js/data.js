// Clinical Guidelines Data
const guidelinesData = [
    {
        id: "beers2023",
        title: {
            he: "קריטריוני Beers 2023",
            en: "Beers Criteria 2023"
        },
        category: "medications",
        updated: "2023",
        source: "AGS",
        content: {
            he: "תרופות שיש להימנע מהן בקשישים: בנזודיאזפינים, אנטיכולינרגיים, NSAIDs בסיכון גבוה",
            en: "Medications to avoid in elderly: Benzodiazepines, Anticholinergics, NSAIDs in high-risk patients"
        },
        tags: ["medications", "safety", "polypharmacy"]
    },
    {
        id: "stopp-start-v3",
        title: {
            he: "STOPP/START גרסה 3",
            en: "STOPP/START Version 3"
        },
        category: "medications",
        updated: "2023",
        source: "European",
        content: {
            he: "קריטריונים אירופאים לניהול תרופתי - STOPP: תרופות להפסקה, START: תרופות להתחלה",
            en: "European criteria - STOPP: medications to stop, START: medications to start"
        },
        tags: ["medications", "europe", "guidelines"]
    },
    {
        id: "fall-prevention",
        title: {
            he: "מניעת נפילות בקהילה",
            en: "Fall Prevention in Community"
        },
        category: "prevention",
        updated: "2024",
        source: "NICE",
        content: {
            he: "הערכה רב-תחומית, תרגילי כוח ושיווי משקל, התאמת סביבה, סקירת תרופות",
            en: "Multifactorial assessment, strength and balance exercises, environmental modifications, medication review"
        },
        tags: ["falls", "prevention", "community"]
    }
];

// Clinical Cases Data
const casesData = [
    {
        id: "case001",
        title: {
            he: "מטופלת עם נפילות חוזרות",
            en: "Patient with Recurrent Falls"
        },
        age: 82,
        gender: "F",
        category: "falls",
        presentation: {
            he: "אישה בת 82 עם 3 נפילות בחודש האחרון, נוטלת 8 תרופות",
            en: "82-year-old woman with 3 falls in the last month, taking 8 medications"
        },
        workup: {
            he: ["בדיקה פיזיקלית", "בדיקות מעבדה", "ECG", "הערכת תרופות"],
            en: ["Physical exam", "Lab tests", "ECG", "Medication review"]
        },
        diagnosis: {
            he: "היפוטנזיה אורתוסטטית + פוליפרמצ'י",
            en: "Orthostatic hypotension + Polypharmacy"
        },
        management: {
            he: ["הפסקת alpha blockers", "הפחתת מינון דיאורטיקה", "פיזיותרפיה"],
            en: ["Stop alpha blockers", "Reduce diuretics", "Physical therapy"]
        },
        pearls: {
            he: "תמיד בדוק לחץ דם בשכיבה ובעמידה בקשישים עם נפילות",
            en: "Always check orthostatic vital signs in elderly with falls"
        }
    },
    {
        id: "case002",
        title: {
            he: "דליריום בבית חולים",
            en: "Hospital Delirium"
        },
        age: 78,
        gender: "M",
        category: "delirium",
        presentation: {
            he: "גבר בן 78, אושפז עקב דלקת ריאות, מפתח בלבול חד",
            en: "78-year-old man, admitted for pneumonia, develops acute confusion"
        },
        workup: {
            he: ["CAM assessment", "בדיקות מעבדה מקיפות", "סקירת תרופות", "CT ראש"],
            en: ["CAM assessment", "Comprehensive labs", "Medication review", "Head CT"]
        },
        diagnosis: {
            he: "דליריום רב-גורמי",
            en: "Multifactorial Delirium"
        },
        management: {
            he: ["טיפול בזיהום", "הפסקת בנזודיאזפינים", "התמצאות", "ניידות מוקדמת"],
            en: ["Treat infection", "Stop benzodiazepines", "Reorientation", "Early mobilization"]
        },
        pearls: {
            he: "דליריום = חירום רפואי. חפש גורמים הפיכים",
            en: "Delirium = medical emergency. Look for reversible causes"
        }
    },
    {
        id: "case003",
        title: {
            he: "פוליפרמצ'י ותופעות לוואי",
            en: "Polypharmacy and Adverse Effects"
        },
        age: 85,
        gender: "F",
        category: "polypharmacy",
        presentation: {
            he: "אישה בת 85, 15 תרופות, סובלת מחולשה ובלבול",
            en: "85-year-old woman, 15 medications, presenting with weakness and confusion"
        },
        workup: {
            he: ["סקירת תרופות מקיפה", "STOPP/START", "בדיקות תפקודי כבד וכליות"],
            en: ["Comprehensive medication review", "STOPP/START", "Liver and kidney function"]
        },
        diagnosis: {
            he: "תופעות לוואי מצטברות מריבוי תרופות",
            en: "Cumulative adverse effects from polypharmacy"
        },
        management: {
            he: ["Deprescribing", "הפסקת 7 תרופות", "מעקב צמוד"],
            en: ["Deprescribing", "Stopped 7 medications", "Close monitoring"]
        },
        pearls: {
            he: "Start low, go slow - אבל גם: Stop slow when deprescribing",
            en: "Start low, go slow - but also: Stop slow when deprescribing"
        }
    }
];

// Quiz Questions Data
const questionsData = [
    {
        id: "q001",
        category: "assessment",
        question: {
            he: "מהו הכלי המועדף להערכת שבריריות?",
            en: "What is the preferred tool for frailty assessment?"
        },
        options: [
            { he: "Clinical Frailty Scale", en: "Clinical Frailty Scale" },
            { he: "Fried Phenotype", en: "Fried Phenotype" },
            { he: "FRAIL Scale", en: "FRAIL Scale" },
            { he: "כל התשובות נכונות", en: "All answers are correct" }
        ],
        correct: 3,
        explanation: {
            he: "כל הכלים תקפים, הבחירה תלויה בסיטואציה הקלינית",
            en: "All tools are valid, choice depends on clinical situation"
        }
    },
    {
        id: "q002",
        category: "pharmacology",
        question: {
            he: "איזו תרופה אינה מומלצת לקשישים לפי Beers?",
            en: "Which medication is not recommended for elderly per Beers?"
        },
        options: [
            { he: "Metformin", en: "Metformin" },
            { he: "Diazepam", en: "Diazepam" },
            { he: "Lisinopril", en: "Lisinopril" },
            { he: "Simvastatin", en: "Simvastatin" }
        ],
        correct: 1,
        explanation: {
            he: "בנזודיאזפינים ארוכי טווח כמו Diazepam מעלים סיכון לנפילות ובלבול",
            en: "Long-acting benzodiazepines like Diazepam increase fall and confusion risk"
        }
    },
    {
        id: "q003",
        category: "syndromes",
        question: {
            he: "מהו הגורם השכיח ביותר לדליריום בקשישים?",
            en: "What is the most common cause of delirium in elderly?"
        },
        options: [
            { he: "זיהום", en: "Infection" },
            { he: "תרופות", en: "Medications" },
            { he: "התייבשות", en: "Dehydration" },
            { he: "כל הגורמים שכיחים באותה מידה", en: "All causes are equally common" }
        ],
        correct: 0,
        explanation: {
            he: "זיהום, במיוחד UTI ודלקת ריאות, הם הגורמים השכיחים ביותר",
            en: "Infection, especially UTI and pneumonia, are the most common causes"
        }
    }
];

// Resources Data
const resourcesData = {
    articles: [
        {
            title: "Comprehensive Geriatric Assessment",
            author: "Ellis G, et al.",
            journal: "BMJ 2011",
            link: "https://www.bmj.com/content/343/bmj.d6553"
        },
        {
            title: "Frailty in Elderly People",
            author: "Clegg A, et al.",
            journal: "Lancet 2013",
            link: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(12)62167-9"
        }
    ],
    videos: [
        {
            title: "How to Perform a CGA",
            duration: "15:23",
            source: "YouTube - GeriEd",
            link: "https://youtube.com/watch?v=example"
        },
        {
            title: "MMSE Administration",
            duration: "12:45",
            source: "MedEd Portal",
            link: "https://www.mededportal.org/example"
        }
    ],
    books: [
        {
            title: "Hazzard's Geriatric Medicine and Gerontology",
            edition: "8th Edition",
            year: 2022
        },
        {
            title: "Brocklehurst's Textbook of Geriatric Medicine",
            edition: "8th Edition",
            year: 2023
        }
    ],
    websites: [
        {
            name: "American Geriatrics Society",
            url: "https://www.americangeriatrics.org",
            description: "Guidelines, tools, and resources"
        },
        {
            name: "Israeli Geriatrics Society",
            url: "https://www.geriatrics.org.il",
            description: "Local guidelines and Hebrew resources"
        }
    ]
};

// Medications Database
const medicationsDB = {
    beers: [
        {
            drug: "Diazepam",
            class: "Benzodiazepine",
            concern: "Increased risk of cognitive impairment, falls",
            recommendation: "Avoid",
            alternatives: ["Short-acting if needed", "Non-pharmacological approaches"]
        },
        {
            drug: "Amitriptyline",
            class: "Tricyclic Antidepressant",
            concern: "Anticholinergic effects, orthostatic hypotension",
            recommendation: "Avoid",
            alternatives: ["SSRI", "SNRI", "Mirtazapine"]
        },
        {
            drug: "Diphenhydramine",
            class: "First-generation antihistamine",
            concern: "Confusion, dry mouth, constipation",
            recommendation: "Avoid",
            alternatives: ["Loratadine", "Cetirizine", "Fexofenadine"]
        }
    ],
    stopp: [
        {
            criteria: "A1",
            description: "Any drug without evidence-based indication",
            action: "Review and discontinue if no clear indication"
        },
        {
            criteria: "D5",
            description: "Benzodiazepines for ≥4 weeks",
            action: "Taper and discontinue"
        },
        {
            criteria: "K1",
            description: "Benzodiazepines in patients with falls",
            action: "Discontinue immediately"
        }
    ],
    start: [
        {
            criteria: "A1",
            description: "Vitamin D in housebound patients",
            action: "Start Vitamin D 800-1000 IU daily"
        },
        {
            criteria: "E5",
            description: "Bone anti-resorptive therapy in osteoporosis",
            action: "Consider bisphosphonates"
        }
    ]
};