'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { Download, Trash2, Eye, LogOut } from 'lucide-react';
import { formatCurrency } from '@/src/lib/formatting';

interface SavedReport {
  id: string;
  title: string;
  input_data: any;
  created_at: string;
}

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    loadReports();
  }, [user, router]);

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('id, title, input_data, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (report: SavedReport) => {
    const data = report.input_data;
    const params = new URLSearchParams({
      country: data.country || 'DE',
      homePrice: data.homePrice?.toString() || '400000',
      duration: data.durationYears?.toString() || '10',
      appreciation: data.homeAppreciationAnnual?.toString() || '3',
      downPayment: data.downPaymentPercent?.toString() || '20',
      mortgageRate: data.mortgageRatePercent?.toString() || '3.5',
      mortgagePeriod: data.mortgagePeriodYears?.toString() || '25',
      closingCosts: data.closingCostsPercent?.toString() || '11.5',
      renovationCost: data.renovationCost?.toString() || '25000',
      hoaMonthly: data.hoaMonthlyFee?.toString() || '200',
      maintenanceAnnual: data.maintenanceAnnualPercent?.toString() || '1',
      sellingCosts: data.sellingCostsPercent?.toString() || '3.5',
      mortgageDeduction: data.mortgageInterestDeductionPercent?.toString() || '0',
      rent: data.monthlyRent?.toString() || '1500',
      rentGrowth: data.rentGrowthAnnualPercent?.toString() || '2',
      investmentReturn: data.investmentReturnAnnual?.toString() || '7',
      investmentTaxRate: data.investmentTaxRatePercent?.toString() || '15',
    });
    router.push(`/calculator?${params.toString()}`);
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', reportId);

      if (error) throw error;
      setReports(reports.filter(r => r.id !== reportId));
    } catch (error) {
      alert('Failed to delete report');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} flex items-center justify-center`}>
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition font-semibold"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        {/* Profile Info Card */}
        <div className={`p-6 rounded-lg border mb-12 ${theme === 'dark'
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
        }`}>
          <h2 className="text-2xl font-bold mb-4">Account Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Email Address</p>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Total Saved Calculations</p>
              <p className="text-lg font-semibold">{reports.length}</p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>User ID</p>
              <p className="text-sm font-mono">{user?.id?.substring(0, 12)}...</p>
            </div>
          </div>
        </div>

        {/* Saved Reports */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Saved Calculations</h2>
          
          {reports.length === 0 ? (
            <div className={`p-8 rounded-lg border text-center ${theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-100 border-slate-200'
            }`}>
              <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                No saved calculations yet.
              </p>
              <a
                href="/calculator"
                className="inline-block mt-4 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition font-semibold"
              >
                Create Your First Calculation
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={`p-6 rounded-lg border flex items-center justify-between ${theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 hover:bg-slate-750'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                  } transition`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                    <div className={`text-sm flex gap-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span>🏠 {formatCurrency(report.input_data.homePrice || 0)}</span>
                      <span>⏱️ {report.input_data.durationYears || 10} years</span>
                      <span>📅 {new Date(report.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewReport(report)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                      title="View detailed report"
                    >
                      <Eye size={18} />
                      <span className="hidden sm:inline">View</span>
                    </button>
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                      title="Delete this calculation"
                    >
                      <Trash2 size={18} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
