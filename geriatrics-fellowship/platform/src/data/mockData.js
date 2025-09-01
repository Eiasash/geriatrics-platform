// Mock data for geriatrics platform

export const mockPapers = [
  {
    id: 1,
    title: "Comprehensive Geriatric Assessment: Meta-Analysis of Randomized Controlled Trials",
    journal: "BMC Geriatrics",
    year: 2024,
    authors: ["Ellis G", "Whitehead MA", "O'Neill D"],
    abstract: "Comprehensive geriatric assessment reduces mortality and increases likelihood of living at home.",
    category: "Assessment"
  },
  {
    id: 2,
    title: "Falls Prevention in Community-Dwelling Older Adults: Updated Guidelines",
    journal: "Age and Ageing",
    year: 2023,
    authors: ["Montero-Odasso M", "van der Velde N", "Martin FC"],
    abstract: "Evidence-based recommendations for fall prevention interventions in older adults.",
    category: "Prevention"
  },
  {
    id: 3,
    title: "Polypharmacy in Geriatrics: Clinical Challenges and Management Strategies",
    journal: "Journal of the American Geriatrics Society",
    year: 2024,
    authors: ["Masnoon N", "Shakib S", "Kalisch-Ellett L"],
    abstract: "Systematic approach to medication review and deprescribing in older adults.",
    category: "Pharmacology"
  },
  {
    id: 4,
    title: "Delirium Prevention and Management in Hospitalized Older Adults",
    journal: "JAMA Internal Medicine",
    year: 2023,
    authors: ["Inouye SK", "Westendorp RGJ", "Saczynski JS"],
    abstract: "Evidence-based strategies for delirium prevention and early intervention.",
    category: "Acute Care"
  },
  {
    id: 5,
    title: "Frailty Assessment Tools: Systematic Review and Clinical Applications",
    journal: "The Lancet Healthy Longevity",
    year: 2024,
    authors: ["Fried LP", "Tangen CM", "Walston J"],
    abstract: "Comparison of frailty assessment tools and their clinical utility in geriatrics.",
    category: "Assessment"
  },
  {
    id: 6,
    title: "Dementia Care: Person-Centered Approaches and Family Support",
    journal: "Alzheimer's & Dementia",
    year: 2023,
    authors: ["Livingston G", "Huntley J", "Sommerlad A"],
    abstract: "Comprehensive approach to dementia care focusing on quality of life.",
    category: "Neurology"
  },
  {
    id: 7,
    title: "Anticoagulation in Atrial Fibrillation: Geriatric Considerations",
    journal: "European Heart Journal",
    year: 2024,
    authors: ["Lip GYH", "Banerjee A", "Boriani G"],
    abstract: "Risk-benefit analysis of anticoagulation in elderly patients with atrial fibrillation.",
    category: "Cardiology"
  },
  {
    id: 8,
    title: "Nutrition and Malnutrition in Older Adults: Screening and Intervention",
    journal: "Clinical Nutrition",
    year: 2023,
    authors: ["Cederholm T", "Jensen GL", "Correia MITD"],
    abstract: "Updated criteria for malnutrition diagnosis and nutritional interventions.",
    category: "Nutrition"
  },
  {
    id: 9,
    title: "Depression Screening and Treatment in Geriatric Primary Care",
    journal: "The American Journal of Geriatric Psychiatry",
    year: 2024,
    authors: ["Reynolds CF", "Cuijpers P", "Patel V"],
    abstract: "Evidence-based approaches to depression management in older adults.",
    category: "Psychiatry"
  },
  {
    id: 10,
    title: "End-of-Life Care: Advance Care Planning and Palliative Approaches",
    journal: "Journal of Palliative Medicine",
    year: 2023,
    authors: ["Bernacki RE", "Block SD", "American College of Physicians"],
    abstract: "Guidelines for advance care planning and palliative care integration.",
    category: "Palliative Care"
  }
];

export const mockGuidelines = [
  {
    id: 1,
    title: "2019 American Geriatrics Society Beers Criteria Update",
    organization: "American Geriatrics Society",
    year: 2019,
    category: "Medication Safety",
    description: "Evidence-based recommendations for potentially inappropriate medications in older adults",
    impact: "High",
    url: "https://geriatricscareonline.org/beers"
  },
  {
    id: 2,
    title: "WHO Guidelines on Integrated Care for Older People (ICOPE)",
    organization: "World Health Organization",
    year: 2017,
    category: "Care Management",
    description: "Guidelines for person-centered assessment and care coordination",
    impact: "High"
  },
  {
    id: 3,
    title: "USPSTF Falls Prevention in Community-Dwelling Older Adults",
    organization: "US Preventive Services Task Force",
    year: 2018,
    category: "Prevention",
    description: "Evidence-based recommendations for fall prevention interventions",
    impact: "High"
  },
  {
    id: 4,
    title: "Practice Guidelines for Dementia Care",
    organization: "American Academy of Neurology",
    year: 2020,
    category: "Neurology",
    description: "Guidelines for diagnosis and management of dementia",
    impact: "High"
  },
  {
    id: 5,
    title: "NICE Guidelines: Delirium Prevention and Management",
    organization: "National Institute for Health and Care Excellence",
    year: 2019,
    category: "Acute Care",
    description: "Evidence-based strategies for delirium prevention and management",
    impact: "High"
  },
  {
    id: 6,
    title: "Geriatric Emergency Medicine Guidelines",
    organization: "American College of Emergency Physicians",
    year: 2021,
    category: "Emergency Medicine",
    description: "Best practices for emergency care of older adults",
    impact: "Medium"
  },
  {
    id: 7,
    title: "Osteoporosis Prevention and Treatment Guidelines",
    organization: "National Osteoporosis Foundation",
    year: 2022,
    category: "Bone Health",
    description: "Guidelines for osteoporosis screening and fracture prevention",
    impact: "High"
  },
  {
    id: 8,
    title: "Hypertension Management in Older Adults",
    organization: "American Heart Association",
    year: 2020,
    category: "Cardiology",
    description: "Blood pressure targets and treatment recommendations for elderly patients",
    impact: "High"
  }
];

export const mockDrugs = [
  {
    id: 1,
    name: "Warfarin",
    category: "Anticoagulant",
    interactions: ["Aspirin", "Amiodarone", "Omeprazole"],
    elderlyConsiderations: "Start with lower doses, monitor INR frequently",
    renalAdjustment: "No dose adjustment needed for renal function"
  },
  {
    id: 2,
    name: "Digoxin",
    category: "Cardiac Glycoside",
    interactions: ["Furosemide", "Amiodarone", "Quinidine"],
    elderlyConsiderations: "Reduce dose by 50% in elderly, monitor levels",
    renalAdjustment: "Reduce dose if CrCl < 60 ml/min"
  },
  {
    id: 3,
    name: "Metformin",
    category: "Antidiabetic",
    interactions: ["Contrast agents", "Alcohol"],
    elderlyConsiderations: "Monitor renal function, avoid if eGFR < 30",
    renalAdjustment: "Contraindicated if eGFR < 30 ml/min/1.73m²"
  },
  {
    id: 4,
    name: "Furosemide",
    category: "Loop Diuretic",
    interactions: ["Digoxin", "Lithium", "NSAIDs"],
    elderlyConsiderations: "Monitor electrolytes, risk of dehydration",
    renalAdjustment: "Monitor kidney function, may need dose adjustment"
  },
  {
    id: 5,
    name: "Zolpidem",
    category: "Hypnotic",
    interactions: ["CNS depressants", "Alcohol"],
    elderlyConsiderations: "Reduce dose to 5mg, high fall risk - AVOID if possible",
    renalAdjustment: "Use with caution in renal impairment"
  }
];

// Clinical Pearls
export const clinicalPearls = [
  "Start LOW, go SLOW with medications in elderly patients",
  "Delirium often presents as hypoactive rather than hyperactive",
  "UTIs rarely cause confusion without fever in elderly",
  "Falls risk increases significantly with >4 medications",
  "Polypharmacy defined as >5 chronic medications",
  "Check vision and hearing in all geriatric assessments",
  "Depression in elderly often presents as cognitive complaints",
  "Atypical presentations are typical in geriatrics",
  "Consider medication-induced causes for new symptoms",
  "Functional status is often more important than diagnosis"
];

export default {
  mockPapers,
  mockGuidelines,
  mockDrugs,
  clinicalPearls
};