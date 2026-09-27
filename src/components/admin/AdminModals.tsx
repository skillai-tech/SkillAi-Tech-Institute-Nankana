import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Send, Printer, User, CreditCard, Clock, Calendar, Megaphone, Award } from 'lucide-react';
import { PortalStudent, Course, InstructorProfile } from '../../types';
import { COURSES } from '../../data/instituteData';

// --- 1. ADD STUDENT MODAL ---
interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    fullName: string;
    fatherName: string;
    whatsappNumber: string;
    email: string;
    city: string;
    education: string;
    course: string;
    mode: string;
    timing: string;
    totalFee?: number;
    initialPaid?: number;
  }) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    fullName: '',
    fatherName: '',
    whatsappNumber: '',
    email: '',
    city: 'Nankana Sahib',
    education: 'Intermediate / ICS',
    course: COURSES[0].title,
    mode: 'Physical Campus (Lab 1)',
    timing: 'Evening (5:00 PM – 7:00 PM)',
    initialPaid: '5000'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.whatsappNumber.trim()) return;

    onAdd({
      fullName: form.fullName.trim(),
      fatherName: form.fatherName.trim() || 'Parent / Guardian',
      whatsappNumber: form.whatsappNumber.trim(),
      email: form.email.trim() || `${form.fullName.toLowerCase().replace(/\s+/g, '')}@student.skillai.pk`,
      city: form.city,
      education: form.education,
      course: form.course,
      mode: form.mode,
      timing: form.timing,
      initialPaid: parseInt(form.initialPaid, 10) || 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-left text-slate-100 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800">
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-xl font-bold font-display text-white">Enroll New Student</h3>
        <p className="text-xs text-slate-400 mt-0.5">Creates immediate student profile, roll number, and LMS portal access.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Student Full Name *</label>
              <input
                required
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Usman Tariq"
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Father's Name</label>
              <input
                type="text"
                value={form.fatherName}
                onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                placeholder="e.g. Tariq Mehmood"
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">WhatsApp Mobile *</label>
              <input
                required
                type="tel"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                placeholder="0301-1234567"
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">City / Location</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Select Program *</label>
            <select
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
            >
              {COURSES.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title} ({c.fee})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Learning Mode</label>
              <select
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
              >
                <option value="Physical Campus (Lab 1)">Physical Campus (Lab 1)</option>
                <option value="Online Live (Zoom / LMS)">Online Live (Zoom / LMS)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Preferred Timing</label>
              <select
                value={form.timing}
                onChange={(e) => setForm({ ...form, timing: e.target.value })}
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
              >
                <option value="Evening (5:00 PM – 7:00 PM)">Evening (5:00 PM – 7:00 PM)</option>
                <option value="Night (7:30 PM – 9:30 PM)">Night (7:30 PM – 9:30 PM)</option>
                <option value="Morning (10:00 AM – 12:00 PM)">Morning (10:00 AM – 12:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Initial Fee Paid (PKR)</label>
            <input
              type="number"
              value={form.initialPaid}
              onChange={(e) => setForm({ ...form, initialPaid: e.target.value })}
              className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-lg hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer"
            >
              Complete Registration & Provision LMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- 2. RECORD FEE PAYMENT MODAL ---
interface RecordFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: PortalStudent[];
  preSelectedStudentId?: string;
  onRecord: (studentId: string, amount: number, method: string, tid: string) => void;
}

export const RecordFeeModal: React.FC<RecordFeeModalProps> = ({
  isOpen,
  onClose,
  students,
  preSelectedStudentId,
  onRecord
}) => {
  const [selectedId, setSelectedId] = useState(preSelectedStudentId || (students[0]?.studentId || ''));
  const [amount, setAmount] = useState('5000');
  const [method, setMethod] = useState('JazzCash');
  const [tid, setTid] = useState(`TID-${Math.floor(10000000 + Math.random() * 90000000)}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(amount, 10);
    if (!selectedId || isNaN(num) || num <= 0) return;

    onRecord(selectedId, num, method, tid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-left text-slate-100">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800">
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-xl font-bold font-display text-white">Record Fee Payment</h3>
        <p className="text-xs text-slate-400 mt-0.5">Generates invoice receipt and updates student ledger balance.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="font-semibold block mb-1">Select Student *</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
            >
              {students.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.name} ({s.studentId}) — Remaining: PKR {s.feeRecord.remainingAmount.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Amount (PKR) *</label>
              <input
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Payment Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
              >
                <option value="JazzCash">JazzCash (0301-4870303)</option>
                <option value="EasyPaisa">EasyPaisa (0301-4870303)</option>
                <option value="Meezan Bank">Meezan Bank Transfer</option>
                <option value="Cash at Campus">Cash at Campus Desk</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Transaction ID / Reference (TID) *</label>
            <input
              required
              type="text"
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer"
            >
              Verify Payment & Record in Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- 3. MARK ATTENDANCE MODAL ---
interface MarkAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: PortalStudent[];
  onSave: (course: string, date: string, attendanceMap: Record<string, 'Present' | 'Absent' | 'Leave' | 'Late'>) => void;
}

export const MarkAttendanceModal: React.FC<MarkAttendanceModalProps> = ({
  isOpen,
  onClose,
  students,
  onSave
}) => {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [dateStr, setDateStr] = useState(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
  const [attendanceState, setAttendanceState] = useState<Record<string, 'Present' | 'Absent' | 'Leave' | 'Late'>>({});

  if (!isOpen) return null;

  const filteredStudents = selectedCourse === 'All'
    ? students
    : students.filter(s => s.enrolledCourse.toLowerCase().includes(selectedCourse.toLowerCase()));

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Leave' | 'Late') => {
    setAttendanceState(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: 'Present' | 'Absent') => {
    const map: Record<string, 'Present' | 'Absent' | 'Leave' | 'Late'> = {};
    filteredStudents.forEach(s => {
      map[s.studentId] = status;
    });
    setAttendanceState(prev => ({ ...prev, ...map }));
  };

  const handleSave = () => {
    onSave(selectedCourse, dateStr, attendanceState);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-left text-slate-100 max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800">
          <X className="w-4 h-4" />
        </button>

        <div>
          <h3 className="text-xl font-bold font-display text-white">Daily Attendance Register</h3>
          <p className="text-xs text-slate-400 mt-0.5">Mark physical lab or live online lecture attendance.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 my-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Filter by Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="All">All Courses ({students.length} students)</option>
              {COURSES.map(c => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Session Date</label>
            <input
              type="text"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Batch Controls */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <span className="text-slate-400">Total in sheet: {filteredStudents.length}</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleMarkAll('Present')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold hover:bg-emerald-500/30"
            >
              Mark All Present 🟢
            </button>
            <button
              onClick={() => handleMarkAll('Absent')}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-semibold hover:bg-rose-500/30"
            >
              Mark All Absent 🔴
            </button>
          </div>
        </div>

        {/* Students list */}
        <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1 text-xs">
          {filteredStudents.map((student) => {
            const currentStatus = attendanceState[student.studentId] || 'Present';
            return (
              <div key={student.studentId} className="p-2.5 rounded-xl bg-[#030914] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">{student.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{student.studentId} · {student.enrolledCourse}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(['Present', 'Absent', 'Leave', 'Late'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(student.studentId, st)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        currentStatus === st
                          ? st === 'Present' ? 'bg-emerald-500 text-black'
                            : st === 'Absent' ? 'bg-rose-500 text-white'
                            : st === 'Leave' ? 'bg-amber-400 text-black'
                            : 'bg-blue-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Submit & Save Attendance Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
