'use client';

import { Suspense } from 'react';
import ReportContent from './report-content';

/**
 * Report page wrapper with Suspense boundary
 * Handles the dynamic report generation based on URL parameters
 */
export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading report...</div>}>
      <ReportContent />
    </Suspense>
  );
}
