import { useState } from 'react';
import { X, CheckCircle2, Send, Sparkles, MessageCircle, ArrowRight, Printer, BookOpen, Clock, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COURSES, INSTITUTE_INFO } from '../data/instituteData';
import { portalStore } from '../services/portalStore';
import { adminStore } from '../services/adminStore';
import { PortalStudent } from '../types';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourse?: string;
  onOpenStudentPortal?: (studentId?: string) => void;
}

export default function AdmissionModal({
  isOpen,
  onClose,
  preSelectedCourse = '',
  onOpenStudentPortal
}: AdmissionModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    whatsappNumber: '',
    email: '',
    age: '20',
    city: 'Nankana Sahib',
    education: 'Intermediate / F.Sc / ICS',
    course: preSelectedCourse || COURSES[0].title,
    mode: 'Physical Campus (Nankana)',
    timing: 'Evening (5:00 PM – 7:00 PM)',
    referralSource: 'Social Media (Facebook / Instagram)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');
  const [enrolledStudent, setEnrolledStudent] = useState<PortalStudent | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Dynamic enrollment into SkillAI Portal Store (LMS database)
    const newStudent = portalStore.enrollStudentFromAdmission({
      fullName: formData.fullName,
      fatherName: formData.fatherName,
      whatsappNumber: formData.whatsappNumber,
      email: formData.email,
      city: formData.city,
      education: formData.education,
      course: formData.course,
      mode: formData.mode,
      timing: formData.timing
    });

    setEnrolledStudent(newStudent);
    setAppId(newStudent.studentId);

    // Also record in Admin Admissions pipeline
    adminStore.addApplication({
      fullName: formData.fullName,
      fatherName: formData.fatherName,
      whatsapp: formData.whatsappNumber,
      email: formData.email || `${formData.fullName.toLowerCase().replace(/\s+/g, '')}@student.skillai.pk`,
      city: formData.city,
      education: formData.education,
      course: formData.course,
      mode: formData.mode,
      timing: formData.timing,
      referralSource: formData.referralSource,
      notes: `Direct enrollment completed. Generated Roll No: ${newStudent.studentId}`
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 }
      });
    }, 500);
  };

  const getWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `*SkillAI Online Admission Registration*\n` +
      `*Student ID / Roll No:* ${appId}\n` +
      `*Student Name:* ${formData.fullName}\n` +
      `*Father's Name:* ${formData.fatherName}\n` +
      `*WhatsApp:* ${formData.whatsappNumber}\n` +
      `*City:* ${formData.city}\n` +
      `*Selected Course:* ${formData.course}\n` +
      `*Mode:* ${formData.mode}\n` +
      `*Batch Timing:* ${formData.timing}\n` +
      `*Education:* ${formData.education}\n` +
      `*Status:* Enrolled in Portal LMS`
    );
    return `https://wa.me/923014870303?text=${text}`;
  };

  const handleOpenPortalFromModal = () => {
    if (onOpenStudentPortal && enrolledStudent) {
      onClose();
      onOpenStudentPortal(enrolledStudent.studentId);
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#071328] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetForm}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="space-y-1.5 pr-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Admissions Open 2026
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Online Admission Application
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Reserve your seat at SkillAI Tech Institute Nankana. Complete the official registration form below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Full Name & Father Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* WhatsApp Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="0301-1234567"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gmail.com"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Age, City, Education */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="65"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    City / Domicile *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Nankana Sahib, Lahore"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Education Level
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="School Student (Class 3 - 10)">School Student (Class 3 - 10)</option>
                    <option value="Matriculation">Matriculation</option>
                    <option value="Intermediate / F.Sc / ICS">Intermediate / F.Sc / ICS</option>
                    <option value="BS / Graduation">BS / Graduation</option>
                    <option value="Masters / M.Sc">Masters / M.Sc</option>
                    <option value="Professional / Freelancer">Professional / Freelancer</option>
                  </select>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Program *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} — {c.duration} ({c.fee})
                    </option>
                  ))}
                  <option value="Kids AI Explorer (Class 3 - 5)">Kids AI Explorer (Class 3 - 5)</option>
                  <option value="Teens AI Productivity (Class 6 - 8)">Teens AI Productivity (Class 6 - 8)</option>
                </select>
              </div>

              {/* Learning Mode & Preferred Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Learning Mode *
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Physical Campus (Nankana)">
                      Physical Campus (Y/272 Housing Colony, Nankana)
                    </option>
                    <option value="Online Live (Zoom / Portal)">
                      Online Live (Interactive Zoom + LMS Portal)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Timing *
                  </label>
                  <select
                    value={formData.timing}
                    onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Evening (5:00 PM – 7:00 PM)">
                      Evening (5:00 PM – 7:00 PM)
                    </option>
                    <option value="Night (7:30 PM – 9:30 PM)">
                      Night (7:30 PM – 9:30 PM)
                    </option>
                    <option value="Morning (10:00 AM – 12:00 PM)">
                      Morning (10:00 AM – 12:00 PM)
                    </option>
                    <option value="Weekend Special (Sat & Sun)">
                      Weekend Special (Sat & Sun)
                    </option>
                  </select>
                </div>
              </div>

              {/* How did you hear about SkillAI? */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  How did you hear about SkillAI?
                </label>
                <select
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                  className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Social Media (Facebook / Instagram)">Social Media (Facebook / Instagram)</option>
                  <option value="Friend or Family Recommendation">Friend or Family Recommendation</option>
                  <option value="Institute Banner / Flyer in Nankana">Institute Banner / Flyer in Nankana</option>
                  <option value="Google Search / Maps">Google Search / Maps</option>
                  <option value="YouTube / TikTok">YouTube / TikTok</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:shadow-[0_0_35px_rgba(251,191,36,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Dynamic Confirmation & LMS Handover Screen */
          <div className="py-4 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs font-mono">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Your Student ID: <strong>{appId}</strong></span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white mt-1">
                Admission Enrolled Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-cyan-200">
                Your student profile has been created dynamically in the SkillAI LMS Portal.
              </p>
            </div>

            {/* Dynamic Student Card Preview */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#06152d] to-[#030914] border border-cyan-500/30 text-left text-xs space-y-2 max-w-lg mx-auto shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Official Admission Record
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Active Enrollment
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Student Name:</span>
                  <span className="font-semibold text-white">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Father's Name:</span>
                  <span className="font-semibold text-slate-200">{formData.fatherName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Enrolled Course:</span>
                  <span className="font-semibold text-cyan-300">{formData.course}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Batch Timing:</span>
                  <span className="font-semibold text-amber-300">{formData.timing}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mode of Learning:</span>
                  <span className="text-slate-200">{formData.mode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Registered Contact:</span>
                  <span className="text-slate-200">{formData.whatsappNumber}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Portal Access:</span>
                <span className="text-emerald-400 font-mono font-medium">Ready (ID: {appId})</span>
              </div>
            </div>

            {/* Action Buttons: 1. Direct Go to LMS Portal, 2. WhatsApp Confirm */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleOpenPortalFromModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <UserCheck className="w-4 h-4 text-slate-950" />
                <span>Open My Student Portal (LMS)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>

              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp ({INSTITUTE_INFO.phone})</span>
              </a>

              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
