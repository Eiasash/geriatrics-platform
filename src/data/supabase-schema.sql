-- Geriatrics Pro Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Patients table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER CHECK (age > 0 AND age <= 120),
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  bed_number TEXT NOT NULL,
  room_number TEXT,
  ward TEXT DEFAULT 'Geriatrics',
  admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  primary_physician TEXT,
  diagnoses JSONB DEFAULT '[]'::jsonb,
  medications JSONB DEFAULT '[]'::jsonb,
  allergies JSONB DEFAULT '[]'::jsonb,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')) DEFAULT 'medium',
  social_history TEXT,
  code_status TEXT DEFAULT 'Full Code',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('mmse', 'morse_fall', 'tug', 'moca', 'mna', 'braden', 'pain_scale')),
  score JSONB NOT NULL,
  performed_by TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts table
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('cognitive_decline', 'fall_risk', 'medication_change', 'vital_signs', 'assessment_due', 'critical_value')),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')) DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Medication records table
CREATE TABLE medication_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  route TEXT DEFAULT 'PO',
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  prescribed_by TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'discontinued', 'held')) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  task_type TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  assigned_to TEXT,
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff/Users table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('nurse', 'physician', 'resident', 'pharmacist', 'therapist', 'admin')) NOT NULL,
  department TEXT DEFAULT 'Geriatrics',
  license_number TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shift handoffs table
CREATE TABLE handoffs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  from_staff TEXT NOT NULL,
  to_staff TEXT NOT NULL,
  shift_date DATE DEFAULT CURRENT_DATE,
  shift_type TEXT CHECK (shift_type IN ('day', 'evening', 'night')) NOT NULL,
  summary TEXT NOT NULL,
  concerns TEXT,
  follow_up_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_patients_admission_date ON patients(admission_date);
CREATE INDEX idx_patients_risk_level ON patients(risk_level);
CREATE INDEX idx_assessments_patient_id ON assessments(patient_id);
CREATE INDEX idx_assessments_type_date ON assessments(assessment_type, created_at);
CREATE INDEX idx_alerts_patient_id ON alerts(patient_id);
CREATE INDEX idx_alerts_resolved ON alerts(resolved);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_tasks_patient_id ON tasks(patient_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_handoffs_patient_id ON handoffs(patient_id);
CREATE INDEX idx_handoffs_date ON handoffs(shift_date);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE handoffs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Basic - adjust based on your auth requirements)
-- Allow authenticated users to read all data (adjust for production)
CREATE POLICY "Allow authenticated read access" ON patients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON assessments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON medication_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON staff FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON handoffs FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert/update (adjust for production)
CREATE POLICY "Allow authenticated insert" ON patients FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON patients FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated insert" ON assessments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated insert" ON alerts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON alerts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated insert" ON medication_records FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON medication_records FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated insert" ON tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated insert" ON handoffs FOR INSERT TO authenticated WITH CHECK (true);

-- Functions for automated alerts and calculations
CREATE OR REPLACE FUNCTION calculate_fall_risk(patient_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  latest_morse INTEGER;
  age_factor INTEGER;
  risk_score INTEGER := 0;
BEGIN
  -- Get latest Morse Fall Scale score
  SELECT (score->>'total')::INTEGER INTO latest_morse
  FROM assessments 
  WHERE patient_id = patient_uuid 
    AND assessment_type = 'morse_fall'
  ORDER BY created_at DESC 
  LIMIT 1;
  
  -- Get age factor
  SELECT CASE 
    WHEN age >= 85 THEN 20
    WHEN age >= 75 THEN 15
    WHEN age >= 65 THEN 10
    ELSE 0
  END INTO age_factor
  FROM patients 
  WHERE id = patient_uuid;
  
  -- Calculate combined risk score
  risk_score := COALESCE(latest_morse, 0) + COALESCE(age_factor, 0);
  
  RETURN risk_score;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-generate alerts based on assessment scores
CREATE OR REPLACE FUNCTION check_assessment_alerts()
RETURNS TRIGGER AS $$
DECLARE
  patient_name TEXT;
  alert_msg TEXT;
BEGIN
  SELECT name INTO patient_name FROM patients WHERE id = NEW.patient_id;
  
  -- MMSE alerts
  IF NEW.assessment_type = 'mmse' THEN
    IF (NEW.score->>'total')::INTEGER <= 18 THEN
      alert_msg := patient_name || ' has significant cognitive decline (MMSE: ' || (NEW.score->>'total') || '/30)';
      INSERT INTO alerts (patient_id, alert_type, severity, title, message)
      VALUES (NEW.patient_id, 'cognitive_decline', 'critical', 'Critical MMSE Score', alert_msg);
    ELSIF (NEW.score->>'total')::INTEGER <= 23 THEN
      alert_msg := patient_name || ' shows mild cognitive impairment (MMSE: ' || (NEW.score->>'total') || '/30)';
      INSERT INTO alerts (patient_id, alert_type, severity, title, message)
      VALUES (NEW.patient_id, 'cognitive_decline', 'warning', 'Low MMSE Score', alert_msg);
    END IF;
  END IF;
  
  -- Morse Fall Scale alerts
  IF NEW.assessment_type = 'morse_fall' THEN
    IF (NEW.score->>'total')::INTEGER >= 45 THEN
      alert_msg := patient_name || ' is at high fall risk (Morse: ' || (NEW.score->>'total') || ')';
      INSERT INTO alerts (patient_id, alert_type, severity, title, message)
      VALUES (NEW.patient_id, 'fall_risk', 'critical', 'High Fall Risk', alert_msg);
    ELSIF (NEW.score->>'total')::INTEGER >= 25 THEN
      alert_msg := patient_name || ' is at moderate fall risk (Morse: ' || (NEW.score->>'total') || ')';
      INSERT INTO alerts (patient_id, alert_type, severity, title, message)
      VALUES (NEW.patient_id, 'fall_risk', 'warning', 'Moderate Fall Risk', alert_msg);
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for assessment alerts
CREATE TRIGGER assessment_alert_trigger
  AFTER INSERT ON assessments
  FOR EACH ROW
  EXECUTE FUNCTION check_assessment_alerts();

-- Function to update patient risk level based on assessments
CREATE OR REPLACE FUNCTION update_patient_risk_level()
RETURNS TRIGGER AS $$
DECLARE
  fall_risk INTEGER;
  cognitive_score INTEGER;
  new_risk_level TEXT := 'medium';
BEGIN
  -- Calculate fall risk
  fall_risk := calculate_fall_risk(NEW.patient_id);
  
  -- Get latest MMSE score
  SELECT (score->>'total')::INTEGER INTO cognitive_score
  FROM assessments 
  WHERE patient_id = NEW.patient_id 
    AND assessment_type = 'mmse'
  ORDER BY created_at DESC 
  LIMIT 1;
  
  -- Determine risk level
  IF fall_risk >= 45 OR (cognitive_score IS NOT NULL AND cognitive_score <= 18) THEN
    new_risk_level := 'high';
  ELSIF fall_risk >= 25 OR (cognitive_score IS NOT NULL AND cognitive_score <= 23) THEN
    new_risk_level := 'medium';
  ELSE
    new_risk_level := 'low';
  END IF;
  
  -- Update patient risk level
  UPDATE patients 
  SET risk_level = new_risk_level, updated_at = NOW()
  WHERE id = NEW.patient_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for patient risk level updates
CREATE TRIGGER patient_risk_update_trigger
  AFTER INSERT ON assessments
  FOR EACH ROW
  EXECUTE FUNCTION update_patient_risk_level();

-- Insert sample data
INSERT INTO staff (email, name, role, department) VALUES
('dr.green@hospital.com', 'Dr. Rachel Green', 'physician', 'Geriatrics'),
('dr.ross@hospital.com', 'Dr. Michael Ross', 'physician', 'Geriatrics'),
('dr.miller@hospital.com', 'Dr. Sarah Miller', 'physician', 'Geriatrics'),
('nurse.johnson@hospital.com', 'Nurse Johnson', 'nurse', 'Geriatrics'),
('nurse.smith@hospital.com', 'Nurse Smith', 'nurse', 'Geriatrics');

-- Insert a few sample patients (you can add more)
INSERT INTO patients (name, age, gender, bed_number, room_number, ward, admission_date, primary_physician, diagnoses, medications, allergies, social_history, code_status) VALUES
('Sarah Cohen', 82, 'Female', 'A-101', '101', 'Geriatrics A', '2024-12-15', 'Dr. Rachel Green', 
 '["Alzheimer''s Disease - Moderate Stage", "Type 2 Diabetes Mellitus", "Hypertension", "Osteoarthritis"]'::jsonb,
 '["Donepezil 10mg daily", "Metformin 1000mg twice daily", "Amlodipine 5mg daily", "Paracetamol 500mg as needed"]'::jsonb,
 '["Penicillin", "Sulfa drugs"]'::jsonb,
 'Lives with daughter, formerly a teacher',
 'Full Code'),
 
('David Goldberg', 78, 'Male', 'A-102', '102', 'Geriatrics A', '2025-01-20', 'Dr. Michael Ross',
 '["Parkinson''s Disease", "Depression", "Benign Prostatic Hyperplasia", "Chronic Kidney Disease Stage 3"]'::jsonb,
 '["Levodopa-Carbidopa 25/100mg three times daily", "Sertraline 50mg daily", "Tamsulosin 0.4mg daily", "Furosemide 20mg daily"]'::jsonb,
 '[]'::jsonb,
 'Widower, retired engineer, two sons visit weekly',
 'DNR');

-- Insert sample assessments
INSERT INTO assessments (patient_id, assessment_type, score, performed_by) VALUES
((SELECT id FROM patients WHERE name = 'Sarah Cohen'), 'mmse', '{"total": 18, "orientation": 8, "registration": 3, "attention": 3, "recall": 1, "language": 3}', 'Dr. Rachel Green'),
((SELECT id FROM patients WHERE name = 'Sarah Cohen'), 'morse_fall', '{"total": 65, "history": 25, "diagnosis": 15, "ambulation": 15, "iv": 0, "gait": 10, "mental_status": 0}', 'Nurse Johnson'),
((SELECT id FROM patients WHERE name = 'David Goldberg'), 'mmse', '{"total": 24, "orientation": 9, "registration": 3, "attention": 4, "recall": 2, "language": 6}', 'Dr. Michael Ross'),
((SELECT id FROM patients WHERE name = 'David Goldberg'), 'morse_fall', '{"total": 85, "history": 25, "diagnosis": 15, "ambulation": 20, "iv": 0, "gait": 20, "mental_status": 5}', 'Nurse Smith');

-- Create a view for patient summary with latest assessments
CREATE OR REPLACE VIEW patient_summary AS
SELECT 
  p.id,
  p.name,
  p.age,
  p.gender,
  p.bed_number,
  p.room_number,
  p.ward,
  p.admission_date,
  p.primary_physician,
  p.risk_level,
  p.diagnoses,
  p.medications,
  p.allergies,
  p.social_history,
  p.code_status,
  -- Latest MMSE score
  (SELECT a.score->>'total' FROM assessments a WHERE a.patient_id = p.id AND a.assessment_type = 'mmse' ORDER BY a.created_at DESC LIMIT 1)::INTEGER as latest_mmse,
  -- Latest fall risk score
  (SELECT a.score->>'total' FROM assessments a WHERE a.patient_id = p.id AND a.assessment_type = 'morse_fall' ORDER BY a.created_at DESC LIMIT 1)::INTEGER as latest_fall_score,
  -- Unresolved alerts count
  (SELECT COUNT(*) FROM alerts a WHERE a.patient_id = p.id AND a.resolved = false)::INTEGER as alert_count,
  -- Pending tasks count
  (SELECT COUNT(*) FROM tasks t WHERE t.patient_id = p.id AND t.status = 'pending')::INTEGER as pending_tasks,
  p.created_at,
  p.updated_at
FROM patients p
ORDER BY p.admission_date DESC;