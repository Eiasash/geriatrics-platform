// Quick Console Test Script for Israeli Drug Database
// Copy and paste these into your browser console

console.log('=== Israeli Drug Database Test Suite ===\n');

// Test 1: Hebrew Search
console.log('1. Testing Hebrew Search for ריבוטריל:');
try {
    const rivotril = IsraeliDrugDatabase.searchHebrewMedication('ריבוטריל');
    console.log('✓ Found:', rivotril.genericName, rivotril.class);
} catch(e) {
    console.error('✗ Error:', e.message);
}

// Test 2: More Hebrew medications
console.log('\n2. Testing common Hebrew medications:');
const hebrewTests = ['אקמול', 'פרמין', 'קומדין', 'ואליום', 'אליקוויס'];
hebrewTests.forEach(med => {
    try {
        const result = IsraeliDrugDatabase.searchHebrewMedication(med);
        if (result.genericName) {
            console.log(`✓ ${med} → ${result.genericName}`);
        } else {
            console.log(`✗ ${med} not found`);
        }
    } catch(e) {
        console.log(`✗ ${med} error:`, e.message);
    }
});

// Test 3: Brand name search
console.log('\n3. Testing Brand Name Search:');
['Tritace', 'Norvasc', 'Zoloft', 'Augmentin'].forEach(brand => {
    const result = IsraeliDrugDatabase.getDrugInfo(brand);
    if (!result.error) {
        console.log(`✓ ${brand} → ${result.genericName} (${result.hebrewName})`);
    } else {
        console.log(`✗ ${brand} not found`);
    }
});

// Test 4: Dangerous interactions
console.log('\n4. Testing Dangerous Drug Interactions:');
const interactions = [
    ['warfarin', 'fluconazole'],
    ['warfarin', 'amiodarone'],
    ['metoprolol', 'verapamil'],
    ['sertraline', 'tramadol']
];

interactions.forEach(pair => {
    const result = IsraeliDrugDatabase.checkInteractions(pair);
    if (result.length > 0) {
        console.log(`⚠️ ${pair[0]} + ${pair[1]}:`, result[0].severity, '-', result[0].effect);
    }
});

// Test 5: STOPP Criteria
console.log('\n5. Testing STOPP Criteria:');
const stoppMeds = ['diazepam', 'omeprazole', 'metoclopramide'];
const stoppViolations = IsraeliDrugDatabase.checkSTOPPCriteria(stoppMeds);
console.log(`Found ${stoppViolations.length} STOPP violations for:`, stoppMeds);
stoppViolations.forEach(v => {
    console.log(`  - ${v.medication}: ${v.criteria.criteria}`);
});

// Test 6: Beers Criteria
console.log('\n6. Testing Beers Criteria:');
['clonazepam', 'diazepam', 'diphenhydramine', 'oxybutynin'].forEach(drug => {
    const beers = IsraeliDrugDatabase.checkBeersCriteria(drug);
    if (beers) {
        console.log(`⚠️ ${drug}:`, beers.severity, '-', beers.reason);
    }
});

// Test 7: Comprehensive Review
console.log('\n7. Testing Comprehensive Medication Review:');
const patient = {
    age: 78,
    medications: ['clonazepam', 'warfarin', 'metformin', 'omeprazole'],
    creatinine: 1.2,
    conditions: ['atrial fibrillation', 'diabetes'],
    gender: 'M'
};

const review = IsraeliDrugDatabase.performComprehensiveMedicationReview(patient);
console.log('Patient Review Summary:');
console.log(`  Age: ${review.patient.age}, eGFR: ${review.patient.eGFR} mL/min`);
console.log(`  Medications: ${review.patient.medicationCount}`);
console.log(`  Drug Interactions: ${review.interactions.length}`);
console.log(`  STOPP Violations: ${review.stoppViolations.length}`);
console.log(`  Beers Violations: ${review.beersViolations.length}`);
console.log(`  Priority Actions: ${review.priorityActions.length}`);

if (review.priorityActions.length > 0) {
    console.log('\n  Top Priority Actions:');
    review.priorityActions.slice(0, 3).forEach(action => {
        console.log(`    ${action.priority}. ${action.action} (${action.type})`);
    });
}

// Test 8: Sal Coverage
console.log('\n8. Testing Sal Coverage:');
['apixaban', 'rivaroxaban', 'empagliflozin', 'donepezil'].forEach(drug => {
    const coverage = IsraeliDrugDatabase.checkSalCoverage(drug);
    if (coverage && coverage.covered) {
        console.log(`✓ ${drug}: Covered -`, coverage.criteria);
    } else {
        console.log(`✗ ${drug}: Not covered or no info`);
    }
});

// Test 9: Alternative Suggestions
console.log('\n9. Testing Alternative Medication Suggestions:');
['diazepam', 'oxybutynin', 'diphenhydramine'].forEach(drug => {
    const alts = IsraeliDrugDatabase.suggestAlternatives(drug);
    if (alts) {
        console.log(`${drug} alternatives:`, alts.alternatives.slice(0, 3).join(', '));
    }
});

// Test 10: Database Statistics
console.log('\n10. Database Statistics:');
const stats = IsraeliDrugDatabase.generateReport();
console.log(`  Total Medications: ${stats.totalMedications}`);
console.log(`  Hebrew Mappings: ${stats.hebrewMappings}`);
console.log(`  Brand Names: ${stats.brandNames}`);
console.log(`  STOPP Criteria: ${stats.stoppCriteria}`);
console.log(`  START Criteria: ${stats.startCriteria}`);
console.log(`  Beers Criteria: ${stats.beersCriteria}`);
console.log(`  Sal Coverage Entries: ${stats.salCoverage}`);

console.log('\n=== All Tests Complete ===');
console.log('Database is ready for use!');
console.log('Try: IsraeliDrugDatabase.searchHebrewMedication("אקמול")');