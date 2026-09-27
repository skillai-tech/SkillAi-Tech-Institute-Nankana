import { useState } from 'react';
import { CreditCard, CheckCircle2, Upload, MessageCircle, Copy, Check } from 'lucide-react';
import { INSTITUTE_INFO, COURSES } from '../data/instituteData';

interface FeesPaymentSectionProps {
  onOpenApplyModal: () => void;
}

export default function FeesPaymentSection({ onOpenApplyModal }: FeesPaymentSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [proofData, setProofData] = useState({
    studentName: '',
    phone: '',
    selectedCourse: COURSES[0].title,
    paymentMethod: 'JazzCash',
    tid: '',
    fileName: ''
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProofSubmitted(true);
  };

  return (
    <section id="fees" className="py-20 relative bg-[#030914] overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            EASY ENROLLMENT & PAYMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Transparent Fees & Payment Options
          </h2>
          <p className="text-sm text-slate-300">
            Convenient mobile wallet and bank transfer options. Pay your registration or monthly installment securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 3 Payment Accounts */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Official Payment Accounts
            </h3>

            {/* JazzCash Card */}
            <div className="p-5 rounded-2xl bg-[#07152b] border border-red-500/30 hover:border-red-500/60 transition-colors shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-md bg-red-600 text-white font-black text-xs font-mono">
                    JazzCash
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Mobile Account</span>
                </div>
                <button
                  onClick={() => handleCopy(INSTITUTE_INFO.paymentDetails.jazzcash.accountNumber, 'jazzcash')}
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  {copiedField === 'jazzcash' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Account Title</span>
                  <span className="font-bold text-white">
                    {INSTITUTE_INFO.paymentDetails.jazzcash.accountTitle}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Account / Mobile Number</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">
                    {INSTITUTE_INFO.paymentDetails.jazzcash.accountNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* EasyPaisa Card */}
            <div className="p-5 rounded-2xl bg-[#07152b] border border-emerald-500/30 hover:border-emerald-500/60 transition-colors shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-black text-xs font-mono">
                    EasyPaisa
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Mobile Account</span>
                </div>
                <button
                  onClick={() => handleCopy(INSTITUTE_INFO.paymentDetails.easypaisa.accountNumber, 'easypaisa')}
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  {copiedField === 'easypaisa' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Account Title</span>
                  <span className="font-bold text-white">
                    {INSTITUTE_INFO.paymentDetails.easypaisa.accountTitle}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Account / Mobile Number</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">
                    {INSTITUTE_INFO.paymentDetails.easypaisa.accountNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Bank Transfer (Meezan Bank) */}
            <div className="p-5 rounded-2xl bg-[#07152b] border border-blue-500/30 hover:border-blue-500/60 transition-colors shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-black text-xs font-mono">
                    Meezan Bank
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Direct Bank Transfer / Raast</span>
                </div>
                <button
                  onClick={() => handleCopy(INSTITUTE_INFO.paymentDetails.bankTransfer.iban, 'iban')}
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  {copiedField === 'iban' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied IBAN!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy IBAN</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block">Account Title</span>
                    <span className="font-bold text-white">
                      {INSTITUTE_INFO.paymentDetails.bankTransfer.accountTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Account Number</span>
                    <span className="font-mono font-bold text-slate-200">
                      {INSTITUTE_INFO.paymentDetails.bankTransfer.accountNumber}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block">IBAN Number</span>
                  <span className="font-mono font-bold text-amber-300">
                    {INSTITUTE_INFO.paymentDetails.bankTransfer.iban}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Upload Payment Proof Simulator */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#061426] border border-cyan-500/30 p-6 shadow-2xl">
              <h3 className="text-base font-bold text-white font-display mb-1 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Upload Payment Proof</span>
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Paid via JazzCash, EasyPaisa or Bank? Submit your Transaction ID (TID) to get instant confirmation.
              </p>

              {!proofSubmitted ? (
                <form onSubmit={handleProofSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={proofData.studentName}
                      onChange={(e) => setProofData({ ...proofData, studentName: e.target.value })}
                      placeholder="e.g. Muhammad Ali"
                      className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={proofData.phone}
                      onChange={(e) => setProofData({ ...proofData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Payment Method</label>
                      <select
                        value={proofData.paymentMethod}
                        onChange={(e) => setProofData({ ...proofData, paymentMethod: e.target.value })}
                        className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-2.5 py-2 text-white focus:outline-none"
                      >
                        <option value="JazzCash">JazzCash</option>
                        <option value="EasyPaisa">EasyPaisa</option>
                        <option value="Meezan Bank">Meezan Bank</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Transaction ID (TID) *</label>
                      <input
                        type="text"
                        required
                        value={proofData.tid}
                        onChange={(e) => setProofData({ ...proofData, tid: e.target.value })}
                        placeholder="e.g. 194829104"
                        className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Attach Screenshot / Receipt</label>
                    <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-700 hover:border-cyan-400 bg-[#030914] cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-cyan-400 mb-1" />
                      <span className="text-[11px] text-slate-300">
                        {proofData.fileName || 'Click to select screenshot or photo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setProofData({ ...proofData, fileName: e.target.files[0].name });
                          }
                        }}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold rounded-xl shadow-md hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer mt-1"
                  >
                    Submit Payment Receipt
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white">Payment Receipt Logged!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    TID <strong className="text-cyan-400 font-mono">{proofData.tid}</strong> received for student {proofData.studentName}. Our accounts officer will verify the voucher and notify your WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/923014870303?text=Assalam%20o%20Alaikum%2C%20Maine%20fee%20transfer%20ki%20hai.%20Name%3A%20${encodeURIComponent(proofData.studentName)}%2C%20TID%3A%20${encodeURIComponent(proofData.tid)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Screenshot on WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
