-- Enhanced Supabase Schema for Geriatrics Platform
-- This replaces the previous schema with more comprehensive tables

-- Core entities
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn text UNIQUE,
  first_name text,
  last_name text,
  sex text CHECK (sex IN ('M','F') OR sex IS NULL),
  dob date,
  admission_date date,
  discharge_date date,
  room_number text,
  primary_diagnosis text,
  secondary_diagnoses text[],
  allergies text[],
  code_status text,
  insurance_info jsonb,
  emergency_contact jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mmse_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  score int CHECK (score BETWEEN 0 AND 30),
  assessed_at date NOT NULL DEFAULT now(),
  assessed_by text,
  notes text,
  details jsonb, -- Detailed breakdown of each section
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS meds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  generic_name text NOT NULL,
  brand_names text[],
  hebrew_name text,
  acb_score int CHECK (acb_score BETWEEN 0 AND 3),
  beers_category text,
  beers_warning text,
  drug_class text,
  indication text,
  contraindications text[],
  side_effects jsonb,
  interactions jsonb DEFAULT '[]'::jsonb, -- [{with:"warfarin", note:"↑bleeding risk", severity:"major"}]
  dosing_geriatric jsonb,
  monitoring_parameters text[],
  cost_tier text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS patient_meds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  med_id uuid REFERENCES meds(id),
  dose text,
  route text,
  freq text,
  started_on date,
  stopped_on date,
  active boolean DEFAULT true,
  indication text,
  prescriber text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'morse_fall', 'tug', 'frail', 'cam', 'braden', 'moca'
  score numeric,
  risk_level text,
  details jsonb,
  assessed_at timestamptz DEFAULT now(),
  assessed_by text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  priority text CHECK (priority IN ('low','medium','high','urgent')) DEFAULT 'low',
  due_date timestamptz,
  status text CHECK (status IN ('todo','in_progress','done','cancelled')) DEFAULT 'todo',
  assigned_to text,
  created_by text,
  completed_at timestamptz,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shift_handoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  shift_date date NOT NULL,
  shift_type text CHECK (shift_type IN ('day','evening','night')),
  from_nurse text,
  to_nurse text,
  report jsonb, -- Structured handoff data
  alerts text[],
  pending_tasks text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clinical_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  note_type text, -- 'progress', 'admission', 'discharge', 'consult'
  note_text text NOT NULL,
  author text,
  specialty text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vital_signs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  bp_systolic int,
  bp_diastolic int,
  heart_rate int,
  temperature numeric,
  resp_rate int,
  o2_sat int,
  blood_glucose int,
  pain_score int,
  weight numeric,
  recorded_at timestamptz DEFAULT now(),
  recorded_by text
);

CREATE TABLE IF NOT EXISTS lab_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  test_name text NOT NULL,
  value text,
  unit text,
  reference_range text,
  abnormal boolean DEFAULT false,
  critical boolean DEFAULT false,
  collected_at timestamptz,
  resulted_at timestamptz DEFAULT now(),
  notes text
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id bigserial PRIMARY KEY,
  ts timestamptz DEFAULT now(),
  actor text,    -- user email or system
  category text, -- 'auth','patient','med','calc','export','admin','ai'
  severity text, -- 'info','warn','error','critical'
  action text,
  details jsonb,
  ip_address inet,
  user_agent text
);

-- AI/Analytics tables
CREATE TABLE IF NOT EXISTS insights_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  type text, -- 'fall_risk','readmission','mmse_trend','med_interaction','care_plan'
  score numeric,
  risk_band text,
  payload jsonb,
  recommendations text[],
  computed_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '24 hours'),
  model_version text
);

CREATE TABLE IF NOT EXISTS prediction_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name text UNIQUE NOT NULL,
  model_type text, -- 'fall_risk', 'readmission', 'cognitive_decline'
  version text,
  accuracy numeric,
  parameters jsonb,
  training_date date,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  alert_type text, -- 'fall_risk','med_interaction','abnormal_lab','vital_critical'
  severity text CHECK (severity IN ('low','medium','high','critical')),
  message text NOT NULL,
  details jsonb,
  acknowledged boolean DEFAULT false,
  acknowledged_by text,
  acknowledged_at timestamptz,
  auto_generated boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_patients_mrn ON patients(mrn);
CREATE INDEX IF NOT EXISTS idx_mmse_patient_date ON mmse_scores(patient_id, assessed_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessments_patient_type ON assessments(patient_id, type, assessed_at DESC);
CREATE INDEX IF NOT EXISTS idx_ptmeds_patient_active ON patient_meds(patient_id, active);
CREATE INDEX IF NOT EXISTS idx_tasks_patient_status ON tasks(patient_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date) WHERE status != 'done';
CREATE INDEX IF NOT EXISTS idx_handoffs_date ON shift_handoffs(shift_date DESC);
CREATE INDEX IF NOT EXISTS idx_notes_patient ON clinical_notes(patient_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vitals_patient ON vital_signs(patient_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_labs_patient ON lab_results(patient_id, resulted_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_ts ON audit_logs(ts DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor);
CREATE INDEX IF NOT EXISTS idx_insights_patient ON insights_cache(patient_id, type);
CREATE INDEX IF NOT EXISTS idx_alerts_patient ON alerts(patient_id, acknowledged);

-- Row Level Security (RLS)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE mmse_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE meds ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_meds ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE shift_handoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Public read policies (for demo - tighten for production)
CREATE POLICY "public read patients" ON patients FOR SELECT USING (true);
CREATE POLICY "public read mmse" ON mmse_scores FOR SELECT USING (true);
CREATE POLICY "public read meds" ON meds FOR SELECT USING (true);
CREATE POLICY "public read pt_meds" ON patient_meds FOR SELECT USING (true);
CREATE POLICY "public read assessments" ON assessments FOR SELECT USING (true);
CREATE POLICY "public read tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "public read handoffs" ON shift_handoffs FOR SELECT USING (true);
CREATE POLICY "public read notes" ON clinical_notes FOR SELECT USING (true);
CREATE POLICY "public read vitals" ON vital_signs FOR SELECT USING (true);
CREATE POLICY "public read labs" ON lab_results FOR SELECT USING (true);
CREATE POLICY "public read insights" ON insights_cache FOR SELECT USING (true);
CREATE POLICY "public read alerts" ON alerts FOR SELECT USING (true);

-- Service role write policies
CREATE POLICY "service writes patients" ON patients
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes mmse" ON mmse_scores
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes meds" ON meds
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes pt_meds" ON patient_meds
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes assessments" ON assessments
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes tasks" ON tasks
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes handoffs" ON shift_handoffs
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes notes" ON clinical_notes
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes vitals" ON vital_signs
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes labs" ON lab_results
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes audit" ON audit_logs
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes insights" ON insights_cache
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);
CREATE POLICY "service writes alerts" ON alerts
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (true);

-- Functions and Triggers

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meds_updated_at BEFORE UPDATE ON meds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_meds_updated_at BEFORE UPDATE ON patient_meds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON clinical_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate alerts for critical values
CREATE OR REPLACE FUNCTION check_critical_values()
RETURNS TRIGGER AS $$
BEGIN
  -- Check for critical lab values
  IF NEW.critical = true THEN
    INSERT INTO alerts (patient_id, alert_type, severity, message, details, auto_generated)
    VALUES (
      NEW.patient_id,
      'abnormal_lab',
      'critical',
      'Critical lab value: ' || NEW.test_name || ' = ' || NEW.value || ' ' || COALESCE(NEW.unit, ''),
      jsonb_build_object('lab_id', NEW.id, 'test', NEW.test_name, 'value', NEW.value),
      true
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER alert_critical_labs AFTER INSERT ON lab_results
  FOR EACH ROW WHEN (NEW.critical = true)
  EXECUTE FUNCTION check_critical_values();

-- Sample seed data
INSERT INTO patients (mrn, first_name, last_name, sex, dob, admission_date, room_number, primary_diagnosis)
VALUES 
  ('A1001', 'Leah', 'Cohen', 'F', '1945-03-02', '2025-01-01', '201A', 'Congestive Heart Failure'),
  ('A1002', 'Yosef', 'Levi', 'M', '1939-11-12', '2025-01-02', '202B', 'COPD Exacerbation'),
  ('A1003', 'Miriam', 'Goldberg', 'F', '1942-07-23', '2025-01-03', '203A', 'Hip Fracture');

INSERT INTO mmse_scores (patient_id, score, assessed_at, assessed_by, notes)
SELECT id, 23, '2025-01-01', 'Dr. Sarah Chen', 'Baseline assessment' FROM patients WHERE mrn='A1001';

INSERT INTO mmse_scores (patient_id, score, assessed_at, assessed_by, notes)
SELECT id, 21, '2025-01-15', 'Dr. Sarah Chen', '2-week follow-up' FROM patients WHERE mrn='A1001';

INSERT INTO meds (generic_name, hebrew_name, acb_score, beers_category, beers_warning, drug_class, indication)
VALUES 
  ('diazepam', 'דיאזפאם', 1, 'AVOID', 'Avoid benzodiazepines in elderly', 'Benzodiazepine', 'Anxiety'),
  ('amitriptyline', 'אמיטריפטילין', 3, 'AVOID', 'Strong anticholinergic', 'TCA', 'Depression'),
  ('warfarin', 'וורפרין', 0, NULL, NULL, 'Anticoagulant', 'Atrial Fibrillation'),
  ('lisinopril', 'ליסינופריל', 0, NULL, NULL, 'ACE Inhibitor', 'Hypertension'),
  ('metformin', 'מטפורמין', 0, NULL, NULL, 'Biguanide', 'Diabetes Type 2');