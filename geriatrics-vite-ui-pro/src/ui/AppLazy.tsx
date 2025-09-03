import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load all major components
const Dashboard = lazy(() => import('./components/Dashboard'));
const Calculators = lazy(() => import('./components/Calculators'));
const MedicationDatabase = lazy(() => import('./components/MedicationDatabase'));
const ShiftHandoff = lazy(() => import('./components/ShiftHandoff'));
const NoteAnalyzer = lazy(() => import('./components/NoteAnalyzer'));
const Analytics = lazy(() => import('./components/Analytics'));
const AuditLogViewer = lazy(() => import('./components/AuditLogViewer'));
const PacksImporter = lazy(() => import('./components/PacksImporter'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

interface LazyRoutesProps {
  dataSource: any;
  language: 'en' | 'he';
}

export default function LazyRoutes({ dataSource, language }: LazyRoutesProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={
          dataSource ? <Dashboard dataSource={dataSource} language={language} /> : <PageLoader />
        } />
        <Route path="/calculators" element={
          <Calculators language={language} />
        } />
        <Route path="/medications" element={
          <MedicationDatabase language={language} />
        } />
        <Route path="/handoff" element={
          dataSource ? <ShiftHandoff dataSource={dataSource} language={language} /> : <PageLoader />
        } />
        <Route path="/notes" element={
          dataSource ? <NoteAnalyzer dataSource={dataSource} language={language} /> : <PageLoader />
        } />
        <Route path="/analytics" element={
          dataSource ? <Analytics dataSource={dataSource} language={language} /> : <PageLoader />
        } />
        <Route path="/audit" element={
          <AuditLogViewer language={language} />
        } />
        <Route path="/packs" element={
          dataSource ? <PacksImporter dataSource={dataSource} language={language} /> : <PageLoader />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}