import { X, Printer, ShieldCheck, Download, Award, Sparkles } from 'lucide-react';
import { INSTITUTE_INFO } from '../../data/instituteData';

interface CertificateViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    title: string;
    studentName: string;
    fatherName?: string;
    credentialId: string;
    issueDate: string;
    grade?: string;
  };
}

export default function CertificateViewModal({
  isOpen,
  onClose,
  certificate
}: CertificateViewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[95vh] overflow-y-auto bg-[#040b18] border-2 border-amber-400/40 rounded-3xl p-5 sm:p-8 text-slate-100 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas Box */}
        <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#06142c] via-[#030914] to-[#06142c] border-4 border-double border-amber-400/60 shadow-2xl overflow-hidden my-2">
          {/* Subtle watermark logo in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <span className="text-[120px] font-black font-display text-cyan-400">SKILLAI</span>
          </div>

          {/* Top Logo & Header */}
          <div className="space-y-1.5 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL CERTIFICATION OF ACCOMPLISHMENT</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 font-display tracking-tight">
              SKILLAI TECH INSTITUTE NANKANA
            </h2>
            <p className="text-[10px] sm:text-xs text-cyan-300 font-mono tracking-widest uppercase">
              Future Skills for Future Leaders · Govt. Registered Tech Institute
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 italic mb-2">
            This is to certify that
          </p>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display underline decoration-cyan-400 decoration-2 underline-offset-8 mb-2">
            {certificate.studentName}
          </h3>

          {certificate.fatherName && (
            <p className="text-xs text-slate-400 mb-4">
              S/O {certificate.fatherName}
            </p>
          )}

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-4">
            has successfully completed the comprehensive training program and practical project milestones in
          </p>

          <div className="p-3 sm:p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 inline-block max-w-lg mb-6">
            <h4 className="text-lg sm:text-2xl font-bold text-cyan-300 font-display">
              {certificate.title}
            </h4>
            <span className="text-[11px] text-amber-300 font-semibold font-mono block mt-0.5">
              Grade: {certificate.grade || 'A+ (Distinction)'}
            </span>
          </div>

          {/* Footer of Certificate: Verification ID, Stamp & Signature */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            {/* Left: Credential ID */}
            <div className="text-left text-xs space-y-0.5">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Credential ID</span>
              <span className="font-mono font-bold text-cyan-300">{certificate.credentialId}</span>
              <span className="text-slate-400 block text-[10px]">Issued: {certificate.issueDate}</span>
            </div>

            {/* Center: Official Seal Stamp */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-amber-400/80 bg-amber-950/20 flex flex-col items-center justify-center p-1 text-center shadow-lg rotate-6">
                <ShieldCheck className="w-5 h-5 text-amber-300 mb-0.5" />
                <span className="text-[8px] font-black text-amber-300 uppercase leading-none">
                  VERIFIED <br />
                  SKILLAI 2026
                </span>
              </div>
            </div>

            {/* Right: Signature */}
            <div className="text-right">
              <div className="font-handwriting text-cyan-300 text-2xl -rotate-3 select-none">
                Zeeshan Abdul Jabbar
              </div>
              <div className="h-0.5 w-32 ml-auto bg-slate-700 my-1" />
              <span className="text-[10px] font-bold text-white uppercase block">
                Zeeshan Abdul Jabbar
              </span>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest block">
                CEO & Lead Instructor
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Verifiable globally on website under <strong>Verify Certificate</strong> with ID: {certificate.credentialId}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={() => {
                alert(`Official Certificate (${certificate.credentialId}) ready. Use the print command to save as PDF.`);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
