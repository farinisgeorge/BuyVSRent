import { supabase } from '@/src/lib/supabase';
import { BuyVsRentInput } from '@/hooks/useBuyVsRent';
import { v4 as uuidv4 } from 'uuid';

export interface SavedReport {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  input_data: BuyVsRentInput;
  result_data: any;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  shared_token?: string;
  view_count: number;
}

/**
 * Save a report to the database
 */
export async function saveReport(
  inputData: BuyVsRentInput,
  resultData: any,
  title: string,
  description?: string
): Promise<SavedReport | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User must be authenticated to save reports');
  }

  const { data, error } = await supabase.from('reports').insert({
    user_id: user.id,
    title,
    description,
    input_data: inputData,
    result_data: resultData,
  });

  if (error) {
    console.error('Error saving report:', error);
    throw new Error(`Failed to save report: ${error.message}`);
  }

  return data?.[0] || null;
}

/**
 * Get all reports for current user
 */
export async function getUserReports(): Promise<SavedReport[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User must be authenticated to fetch reports');
  }

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reports:', error);
    throw new Error(`Failed to fetch reports: ${error.message}`);
  }

  return data || [];
}

/**
 * Get a single report by ID
 */
export async function getReport(reportId: string): Promise<SavedReport | null> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', reportId)
    .single();

  if (error) {
    console.error('Error fetching report:', error);
    return null;
  }

  return data || null;
}

/**
 * Update report title/description
 */
export async function updateReport(
  reportId: string,
  title?: string,
  description?: string
): Promise<SavedReport | null> {
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (title) updateData.title = title;
  if (description) updateData.description = description;

  const { data, error } = await supabase
    .from('reports')
    .update(updateData)
    .eq('id', reportId)
    .select()
    .single();

  if (error) {
    console.error('Error updating report:', error);
    throw new Error(`Failed to update report: ${error.message}`);
  }

  return data || null;
}

/**
 * Delete a report
 */
export async function deleteReport(reportId: string): Promise<boolean> {
  const { error } = await supabase.from('reports').delete().eq('id', reportId);

  if (error) {
    console.error('Error deleting report:', error);
    throw new Error(`Failed to delete report: ${error.message}`);
  }

  return true;
}

/**
 * Make a report public and generate share token
 */
export async function makeReportPublic(reportId: string): Promise<string | null> {
  const shareToken = uuidv4();

  const { data, error } = await supabase
    .from('reports')
    .update({
      is_public: true,
      shared_token: shareToken,
    })
    .eq('id', reportId)
    .select('shared_token')
    .single();

  if (error) {
    console.error('Error making report public:', error);
    throw new Error(`Failed to share report: ${error.message}`);
  }

  return data?.shared_token || null;
}

/**
 * Get a report by share token (public access)
 */
export async function getPublicReport(shareToken: string): Promise<SavedReport | null> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('shared_token', shareToken)
    .eq('is_public', true)
    .single();

  if (error) {
    console.error('Error fetching public report:', error);
    return null;
  }

  // Increment view count
  if (data) {
    await supabase
      .from('reports')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id);
  }

  return data || null;
}

/**
 * Check if user has already viewed a report (to track free viewing)
 * This is stored in localStorage
 */
export function hasUserViewedReport(reportId: string): boolean {
  if (typeof window === 'undefined') return false;

  const viewedReports = localStorage.getItem('viewed_reports');
  if (!viewedReports) return false;

  try {
    const reports = JSON.parse(viewedReports);
    return reports.includes(reportId);
  } catch {
    return false;
  }
}

/**
 * Mark a report as viewed by the user
 */
export function markReportAsViewed(reportId: string): void {
  if (typeof window === 'undefined') return;

  const viewedReports = localStorage.getItem('viewed_reports');
  let reports: string[] = [];

  try {
    if (viewedReports) {
      reports = JSON.parse(viewedReports);
    }
  } catch {
    reports = [];
  }

  if (!reports.includes(reportId)) {
    reports.push(reportId);
    localStorage.setItem('viewed_reports', JSON.stringify(reports));
  }
}

/**
 * Get count of reports viewed by user in this session
 */
export function getReportViewCount(): number {
  if (typeof window === 'undefined') return 0;

  const viewedReports = localStorage.getItem('viewed_reports');
  if (!viewedReports) return 0;

  try {
    return JSON.parse(viewedReports).length;
  } catch {
    return 0;
  }
}
