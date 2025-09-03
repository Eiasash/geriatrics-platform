// Medical Knowledge Graph - Connects medical concepts for intelligent reasoning
// Provides context-aware medical relationships and concept mapping

export class MedicalKnowledgeGraph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
    this.relationships = {
      TREATS: 'treats',
      CAUSES: 'causes',
      TRIGGERED_BY: 'triggered_by',
      WORSENED_BY: 'worsened_by',
      CONTRAINDICATED_WITH: 'contraindicated_with',
      INTERACTS_WITH: 'interacts_with',
      REQUIRES_MONITORING: 'requires_monitoring',
      INDICATES: 'indicates',
      ASSOCIATED_WITH: 'associated_with',
      PRECEDES: 'precedes',
      PREVENTS: 'prevents',
      DIAGNOSED_BY: 'diagnosed_by'
    };
    
    this.buildGraph();
  }

  // Initialize the medical knowledge graph
  buildGraph() {
    this.addMedicalConcepts();
    this.buildRelationships();
  }

  // Add medical concepts (nodes)
  addMedicalConcepts() {
    // Medications
    this.addNode('warfarin', 'medication', {
      class: 'anticoagulant',
      mechanism: 'vitamin K antagonist',
      monitoring: ['INR', 'bleeding signs'],
      interactions: 'many',
      geriatricRisk: 'high'
    });

    this.addNode('metformin', 'medication', {
      class: 'biguanide',
      mechanism: 'reduces glucose production',
      contraindication: 'GFR <30',
      sideEffects: ['GI upset', 'B12 deficiency'],
      geriatricRisk: 'low'
    });

    this.addNode('haloperidol', 'medication', {
      class: 'antipsychotic',
      indication: 'delirium, agitation',
      sideEffects: ['EPS', 'QT prolongation'],
      geriatricDose: '0.25-0.5mg',
      geriatricRisk: 'moderate'
    });

    this.addNode('digoxin', 'medication', {
      class: 'cardiac glycoside',
      mechanism: 'Na-K ATPase inhibitor',
      monitoring: ['digoxin level', 'K+', 'Mg++', 'kidney function'],
      toxicity: 'narrow therapeutic window',
      geriatricRisk: 'high'
    });

    this.addNode('furosemide', 'medication', {
      class: 'loop diuretic',
      mechanism: 'blocks Na-K-2Cl transporter',
      monitoring: ['electrolytes', 'kidney function', 'hearing'],
      sideEffects: ['hypokalemia', 'hyponatremia', 'ototoxicity'],
      geriatricRisk: 'moderate'
    });

    this.addNode('benzodiazepines', 'medication', {
      class: 'anxiolytic/sedative',
      beers: 'avoid in elderly',
      risks: ['falls', 'confusion', 'dependence'],
      alternatives: ['trazodone', 'melatonin'],
      geriatricRisk: 'high'
    });

    // Conditions
    this.addNode('atrial_fibrillation', 'condition', {
      prevalence: 'increases with age',
      complications: ['stroke', 'heart failure'],
      management: ['rate control', 'rhythm control', 'anticoagulation'],
      scoring: 'CHA2DS2-VASc, HAS-BLED'
    });

    this.addNode('delirium', 'condition', {
      prevalence: '20-30% hospitalized elderly',
      types: ['hyperactive', 'hypoactive', 'mixed'],
      causes: ['infection', 'medications', 'metabolic', 'hypoxia'],
      assessment: 'CAM criteria',
      prevention: 'non-pharmacological preferred'
    });

    this.addNode('heart_failure', 'condition', {
      types: ['HFrEF', 'HFpEF'],
      staging: 'ACC/AHA stages A-D',
      management: ['ACE/ARB', 'beta-blockers', 'diuretics'],
      monitoring: ['weight', 'symptoms', 'kidney function']
    });

    this.addNode('diabetes_mellitus', 'condition', {
      types: ['type 1', 'type 2'],
      targets: 'A1C <7% (or <8% if frail)',
      complications: ['cardiovascular', 'nephropathy', 'retinopathy', 'neuropathy'],
      geriatricGoals: 'individualized based on life expectancy'
    });

    this.addNode('chronic_kidney_disease', 'condition', {
      stages: 'G1-G5 based on GFR',
      complications: ['anemia', 'bone disease', 'cardiovascular'],
      monitoring: ['GFR', 'proteinuria', 'electrolytes'],
      medications: 'dose adjustment required'
    });

    this.addNode('falls', 'geriatric_syndrome', {
      prevalence: '30% annually in >65',
      riskFactors: ['medications', 'vision', 'balance', 'environment'],
      assessment: ['Morse Fall Scale', 'Timed Up and Go'],
      prevention: ['exercise', 'vitamin D', 'environmental modifications']
    });

    // Laboratory values
    this.addNode('INR', 'lab_value', {
      normal: '0.8-1.2',
      therapeutic: '2.0-3.0 (most indications)',
      monitoring: 'warfarin therapy',
      target: 'depends on indication'
    });

    this.addNode('creatinine', 'lab_value', {
      normal: '0.6-1.2 mg/dL',
      formula: 'Cockcroft-Gault for elderly',
      significance: 'kidney function marker',
      medication: 'dose adjustment guide'
    });

    this.addNode('hemoglobin', 'lab_value', {
      normal: '12-16 g/dL (female), 14-18 g/dL (male)',
      elderly: 'may be lower baseline',
      significance: 'anemia marker',
      causes: ['iron deficiency', 'chronic disease', 'bleeding']
    });

    // Assessments/Scores
    this.addNode('CAM', 'assessment', {
      fullName: 'Confusion Assessment Method',
      purpose: 'delirium diagnosis',
      criteria: '4 features, algorithm (1 AND 2) AND (3 OR 4)',
      sensitivity: 'high',
      specificity: 'high'
    });

    this.addNode('CHADS2VASc', 'assessment', {
      purpose: 'stroke risk in atrial fibrillation',
      range: '0-9 points',
      interpretation: '≥2 = anticoagulation recommended',
      companion: 'HAS-BLED for bleeding risk'
    });

    this.addNode('MMSE', 'assessment', {
      fullName: 'Mini-Mental State Exam',
      purpose: 'cognitive screening',
      range: '0-30 points',
      interpretation: '<24 suggests cognitive impairment',
      limitations: 'education and language dependent'
    });

    // Symptoms
    this.addNode('confusion', 'symptom', {
      differential: ['delirium', 'dementia', 'depression'],
      assessment: 'acute vs chronic onset',
      workup: ['infection', 'metabolic', 'medication review'],
      urgent: 'if acute onset'
    });

    this.addNode('shortness_of_breath', 'symptom', {
      differential: ['heart failure', 'COPD', 'PE', 'anemia'],
      assessment: ['vital signs', 'oxygen saturation', 'chest X-ray'],
      urgent: 'if severe or acute onset'
    });
  }

  // Build relationships between concepts
  buildRelationships() {
    // Medication relationships
    this.connect('warfarin', 'atrial_fibrillation', this.relationships.TREATS);
    this.connect('warfarin', 'INR', this.relationships.REQUIRES_MONITORING);
    this.connect('warfarin', 'bleeding', this.relationships.CAUSES);
    this.connect('warfarin', 'falls', this.relationships.ASSOCIATED_WITH);

    this.connect('metformin', 'diabetes_mellitus', this.relationships.TREATS);
    this.connect('metformin', 'chronic_kidney_disease', this.relationships.CONTRAINDICATED_WITH);
    this.connect('metformin', 'creatinine', this.relationships.REQUIRES_MONITORING);

    this.connect('haloperidol', 'delirium', this.relationships.TREATS);
    this.connect('haloperidol', 'agitation', this.relationships.TREATS);
    this.connect('haloperidol', 'QT_prolongation', this.relationships.CAUSES);

    this.connect('benzodiazepines', 'delirium', this.relationships.WORSENED_BY);
    this.connect('benzodiazepines', 'falls', this.relationships.CAUSES);
    this.connect('benzodiazepines', 'confusion', this.relationships.CAUSES);

    this.connect('digoxin', 'heart_failure', this.relationships.TREATS);
    this.connect('digoxin', 'atrial_fibrillation', this.relationships.TREATS);
    this.connect('digoxin', 'chronic_kidney_disease', this.relationships.REQUIRES_MONITORING);

    // Condition relationships
    this.connect('atrial_fibrillation', 'stroke', this.relationships.CAUSES);
    this.connect('atrial_fibrillation', 'CHADS2VASc', this.relationships.DIAGNOSED_BY);
    this.connect('atrial_fibrillation', 'heart_failure', this.relationships.ASSOCIATED_WITH);

    this.connect('delirium', 'infection', this.relationships.TRIGGERED_BY);
    this.connect('delirium', 'medications', this.relationships.TRIGGERED_BY);
    this.connect('delirium', 'hypoxia', this.relationships.TRIGGERED_BY);
    this.connect('delirium', 'CAM', this.relationships.DIAGNOSED_BY);
    this.connect('delirium', 'confusion', this.relationships.INDICATES);

    this.connect('diabetes_mellitus', 'chronic_kidney_disease', this.relationships.CAUSES);
    this.connect('diabetes_mellitus', 'heart_failure', this.relationships.ASSOCIATED_WITH);
    this.connect('diabetes_mellitus', 'stroke', this.relationships.ASSOCIATED_WITH);

    this.connect('chronic_kidney_disease', 'anemia', this.relationships.CAUSES);
    this.connect('chronic_kidney_disease', 'bone_disease', this.relationships.CAUSES);
    this.connect('chronic_kidney_disease', 'creatinine', this.relationships.INDICATES);

    // Symptom relationships
    this.connect('confusion', 'delirium', this.relationships.INDICATES);
    this.connect('confusion', 'dementia', this.relationships.INDICATES);
    this.connect('confusion', 'MMSE', this.relationships.DIAGNOSED_BY);

    this.connect('shortness_of_breath', 'heart_failure', this.relationships.INDICATES);
    this.connect('shortness_of_breath', 'COPD', this.relationships.INDICATES);

    // Falls relationships
    this.connect('falls', 'medications', this.relationships.CAUSED_BY);
    this.connect('falls', 'orthostatic_hypotension', this.relationships.CAUSED_BY);
    this.connect('falls', 'visual_impairment', this.relationships.CAUSED_BY);

    // Assessment relationships
    this.connect('CAM', 'delirium', this.relationships.DIAGNOSES);
    this.connect('CHADS2VASc', 'stroke_risk', this.relationships.INDICATES);
    this.connect('MMSE', 'cognitive_impairment', this.relationships.INDICATES);

    // Geriatric syndromes
    this.connect('polypharmacy', 'falls', this.relationships.CAUSES);
    this.connect('polypharmacy', 'confusion', this.relationships.CAUSES);
    this.connect('polypharmacy', 'drug_interactions', this.relationships.CAUSES);
  }

  // Add a node to the graph
  addNode(id, type, properties = {}) {
    this.nodes.set(id, {
      id,
      type,
      properties,
      connections: new Set()
    });
  }

  // Connect two nodes with a relationship
  connect(fromId, toId, relationship) {
    const edgeId = `${fromId}-${relationship}-${toId}`;
    
    this.edges.set(edgeId, {
      from: fromId,
      to: toId,
      relationship,
      weight: 1.0
    });

    // Add to node connections
    if (this.nodes.has(fromId)) {
      this.nodes.get(fromId).connections.add(edgeId);
    }
    if (this.nodes.has(toId)) {
      this.nodes.get(toId).connections.add(edgeId);
    }
  }

  // Find related concepts
  getRelatedConcepts(termId, depth = 2, visited = new Set()) {
    if (!this.nodes.has(termId) || visited.has(termId) || depth <= 0) {
      return [];
    }

    visited.add(termId);
    const related = [];
    const node = this.nodes.get(termId);

    // Get directly connected concepts
    for (const edgeId of node.connections) {
      const edge = this.edges.get(edgeId);
      if (!edge) continue;

      const relatedId = edge.from === termId ? edge.to : edge.from;
      const relatedNode = this.nodes.get(relatedId);
      
      if (relatedNode && !visited.has(relatedId)) {
        related.push({
          id: relatedId,
          type: relatedNode.type,
          relationship: edge.relationship,
          properties: relatedNode.properties,
          distance: 1
        });

        // Recursively get related concepts
        const deeper = this.getRelatedConcepts(relatedId, depth - 1, new Set(visited));
        related.push(...deeper.map(r => ({ ...r, distance: r.distance + 1 })));
      }
    }

    return related;
  }

  // Find concepts by type
  getConceptsByType(type) {
    return Array.from(this.nodes.values()).filter(node => node.type === type);
  }

  // Find path between two concepts
  findPath(fromId, toId, maxDepth = 4) {
    if (!this.nodes.has(fromId) || !this.nodes.has(toId)) {
      return null;
    }

    const queue = [{ id: fromId, path: [fromId], depth: 0 }];
    const visited = new Set();

    while (queue.length > 0) {
      const { id, path, depth } = queue.shift();

      if (id === toId) {
        return this.buildPathDetails(path);
      }

      if (depth >= maxDepth || visited.has(id)) {
        continue;
      }

      visited.add(id);
      const node = this.nodes.get(id);

      for (const edgeId of node.connections) {
        const edge = this.edges.get(edgeId);
        const nextId = edge.from === id ? edge.to : edge.from;

        if (!visited.has(nextId)) {
          queue.push({
            id: nextId,
            path: [...path, nextId],
            depth: depth + 1
          });
        }
      }
    }

    return null;
  }

  // Build detailed path information
  buildPathDetails(path) {
    const details = [];

    for (let i = 0; i < path.length - 1; i++) {
      const fromId = path[i];
      const toId = path[i + 1];
      
      // Find the edge between these nodes
      const node = this.nodes.get(fromId);
      for (const edgeId of node.connections) {
        const edge = this.edges.get(edgeId);
        if ((edge.from === fromId && edge.to === toId) || 
            (edge.from === toId && edge.to === fromId)) {
          details.push({
            from: fromId,
            to: toId,
            relationship: edge.relationship,
            fromNode: this.nodes.get(fromId),
            toNode: this.nodes.get(toId)
          });
          break;
        }
      }
    }

    return {
      path,
      details,
      length: path.length - 1
    };
  }

  // Get clinical context for a concept
  getClinicalContext(termId) {
    const node = this.nodes.get(termId);
    if (!node) return null;

    const context = {
      concept: node,
      relatedMedications: [],
      relatedConditions: [],
      assessments: [],
      monitoring: [],
      contraindications: []
    };

    const related = this.getRelatedConcepts(termId, 2);

    for (const rel of related) {
      switch (rel.type) {
        case 'medication':
          if (rel.relationship === this.relationships.TREATS) {
            context.relatedMedications.push({
              name: rel.id,
              relationship: 'treatment',
              properties: rel.properties
            });
          }
          break;
        case 'condition':
          context.relatedConditions.push({
            name: rel.id,
            relationship: rel.relationship,
            properties: rel.properties
          });
          break;
        case 'assessment':
          context.assessments.push({
            name: rel.id,
            relationship: rel.relationship,
            properties: rel.properties
          });
          break;
        case 'lab_value':
          if (rel.relationship === this.relationships.REQUIRES_MONITORING) {
            context.monitoring.push({
              parameter: rel.id,
              properties: rel.properties
            });
          }
          break;
      }
    }

    return context;
  }

  // Suggest clinical considerations based on input
  suggestConsiderations(concepts) {
    const suggestions = new Set();

    for (const concept of concepts) {
      const related = this.getRelatedConcepts(concept, 2);
      
      for (const rel of related) {
        if (rel.relationship === this.relationships.REQUIRES_MONITORING) {
          suggestions.add(`Monitor ${rel.id} when using ${concept}`);
        } else if (rel.relationship === this.relationships.CONTRAINDICATED_WITH) {
          suggestions.add(`${concept} contraindicated with ${rel.id}`);
        } else if (rel.relationship === this.relationships.INTERACTS_WITH) {
          suggestions.add(`Check for interaction: ${concept} + ${rel.id}`);
        } else if (rel.relationship === this.relationships.WORSENED_BY) {
          suggestions.add(`${rel.id} may worsen ${concept}`);
        }
      }
    }

    return Array.from(suggestions);
  }

  // Find similar cases based on concept overlap
  findSimilarCases(inputConcepts, threshold = 0.3) {
    // This would be used to find similar clinical scenarios
    // Implementation would depend on having a case database
    return [];
  }

  // Get concept details
  getConceptDetails(conceptId) {
    const node = this.nodes.get(conceptId);
    if (!node) return null;

    return {
      id: conceptId,
      type: node.type,
      properties: node.properties,
      connections: node.connections.size,
      related: this.getRelatedConcepts(conceptId, 1).slice(0, 10) // Top 10 related
    };
  }

  // Export graph for visualization or analysis
  exportGraph() {
    return {
      nodes: Array.from(this.nodes.entries()),
      edges: Array.from(this.edges.entries()),
      statistics: {
        totalNodes: this.nodes.size,
        totalEdges: this.edges.size,
        nodeTypes: this.getNodeTypeDistribution(),
        relationshipTypes: this.getRelationshipDistribution()
      }
    };
  }

  getNodeTypeDistribution() {
    const distribution = {};
    for (const node of this.nodes.values()) {
      distribution[node.type] = (distribution[node.type] || 0) + 1;
    }
    return distribution;
  }

  getRelationshipDistribution() {
    const distribution = {};
    for (const edge of this.edges.values()) {
      distribution[edge.relationship] = (distribution[edge.relationship] || 0) + 1;
    }
    return distribution;
  }
}

export default MedicalKnowledgeGraph;