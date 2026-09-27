import { useState } from 'react';
import { Award, CheckCircle2, Search, AlertCircle, ShieldCheck, Printer, Calendar, User, BookOpen } from 'lucide-react';
import { CERTIFICATES_DATABASE, INSTITUTE_INFO } from '../data/instituteData';
import { CertificateRecord } from '../types';

export default function CertificateVerification() {
  const [certId, setCertId] = useState('');
  const [searched, setSearched] = useState(false);
  const [verifiedRecord, setVerifiedRecord] = useState<CertificateRecord | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setSearched(true);
    const cleaned = certId.trim().toUpperCase();
    const found = CERTIFICATES_DATABASE.find((c) => c.id.toUpperCase() === cleaned);
    setVerifiedRecord(found || null);
  };

  const handleSample = (sampleId: string) => {
    setCertId(sampleId);
    setSearched(true);
    const found = CERTIFICATES_DATABASE.find((c) => c.id.toUpperCase() === sampleId.toUpperCase());
    setVerifiedRecord(found || null);
  };

  return (
    <section id="verify-cert" className="py-20 relative bg-[#040c1a] overflow-hidden border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Header */}
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Official Credential Registry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Verify Certificate
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            SkillAI provides tamper-proof verification for all graduates. Enter the Certificate ID printed on the physical or digital certificate.
          </p>
        </div>

        {/* Verification Form */}
        <div className="max-w-xl mx-auto bg-[#07152b] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="e.g. SKILLAI-2026-00125"
                className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Verify Now</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Sample Links */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>Try sample credentials:</span>
            {CERTIFICATES_DATABASE.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSample(item.id)}
                className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
              >
                {item.id}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Result Display */}
        {searched && (
          <div className="mt-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
            {verifiedRecord ? (
              <div className="rounded-3xl bg-gradient-to-b from-[#091f3a] via-[#051124] to-[#091f3a] border-2 border-emerald-500/40 p-6 sm:p-8 text-left shadow-[0_0_40px_rgba(16,185,129,0.2)] relative overflow-hidden">
                {/* Official Stamp Watermark */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-400/60 bg-emerald-950/40 flex items-center justify-center p-2 text-center rotate-12 shadow-lg">
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-emerald-300 uppercase tracking-tighter leading-tight">
                      SkillAI <br />
                      VERIFIED <br />
                      2026
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Official Certificate Record Found</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-1">
                  {verifiedRecord.studentName}
                </h3>
                {verifiedRecord.fatherName && (
                  <p className="text-xs text-slate-400 mb-4">
                    S/O {verifiedRecord.fatherName}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">Certified Program</span>
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {verifiedRecord.courseTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Academic Grade</span>
                    <span className="font-bold text-amber-400">
                      {verifiedRecord.grade}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Completion Date</span>
                    <span className="font-medium text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {verifiedRecord.completionDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Authorized Instructor</span>
                    <span className="font-medium text-slate-200">
                      {verifiedRecord.instructor}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="font-mono text-slate-400">
                    ID: <strong className="text-white">{verifiedRecord.id}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Verification</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#0e1726] border border-rose-500/30 text-left flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    Certificate Record Not Found
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    No active student certificate was found with ID "{certId}". Please re-check the ID or contact admissions at <strong>{INSTITUTE_INFO.phone}</strong> for manual verification.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
