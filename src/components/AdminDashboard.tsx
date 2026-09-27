import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Clock, 
  CreditCard, 
  Award, 
  TrendingUp, 
  Inbox, 
  Megaphone, 
  Globe, 
  Bot, 
  BarChart3, 
  Bell, 
  Cpu, 
  Settings, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Send, 
  ExternalLink, 
  Eye, 
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { AdminHeader } from './admin/AdminHeader';
import { AdminSidebar, AdminTab } from './admin/AdminSidebar';
import { AdminDashboardOverview } from './admin/AdminDashboardOverview';
import { 
  AddStudentModal, 
  RecordFeeModal, 
  MarkAttendanceModal 
} from './admin/AdminModals';
import { portalStore } from '../services/portalStore';
import { adminStore } from '../services/adminStore';
import { 
  PortalStudent, 
  AdminRole, 
  AdmissionApplication, 
  InstructorProfile, 
  ScheduledClassSession, 
  AutomationLog 
} from '../types';
import { COURSES, INSTITUTE_INFO } from '../data/instituteData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudentPortal: () => void;
}

export default function AdminDashboard({
  isOpen,
  onClose,
  onOpenStudentPortal
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [activeRole, setActiveRole] = useState<AdminRole>(adminStore.getActiveRole());
  const [searchQuery, setSearchQuery] = useState('');

  // Live store data
  const [students, setStudents] = useState<PortalStudent[]>(portalStore.getAllStudents());
  const [applications, setApplications] = useState<AdmissionApplication[]>(adminStore.getApplications());
  const [instructors, setInstructors] = useState<InstructorProfile[]>(adminStore.getInstructors());
  const [classes, setClasses] = useState<ScheduledClassSession[]>(adminStore.getScheduledClasses());
  const [automationLogs, setAutomationLogs] = useState<AutomationLog[]>(adminStore.getAutomationLogs());
  const [financials, setFinancials] = useState(adminStore.getFinancialSummary());

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isRecordFeeOpen, setIsRecordFeeOpen] = useState(false);
  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<PortalStudent | null>(null);

  // New item forms inline
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'normal' as 'normal' | 'high', target: 'All' });
  const [gradingModal, setGradingModal] = useState<{ student: PortalStudent; assignmentId: string; title: string } | null>(null);
  const [gradingScore, setGradingScore] = useState('95/100');
  const [gradingFeedback, setGradingFeedback] = useState('Excellent work with proper formatting and structure.');

  // Refresh data from stores
  const refreshAll = () => {
    setStudents([...portalStore.getAllStudents()]);
    setApplications([...adminStore.getApplications()]);
    setInstructors([...adminStore.getInstructors()]);
    setClasses([...adminStore.getScheduledClasses()]);
    setAutomationLogs([...adminStore.getAutomationLogs()]);
    setFinancials(adminStore.getFinancialSummary());
  };

  useEffect(() => {
    if (isOpen) {
      refreshAll();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handlers
  const handleRoleChange = (role: AdminRole) => {
    setActiveRole(role);
    adminStore.setActiveRole(role);
  };

  const handleAddStudentSubmit = (data: any) => {
    const student = portalStore.enrollStudentFromAdmission(data);
    if (data.initialPaid && data.initialPaid > 0) {
      portalStore.recordFeePayment(student.studentId, {
        amount: data.initialPaid,
        method: 'Cash at Desk',
        tid: `TID-ADM-${Math.floor(100000 + Math.random() * 900000)}`
      });
    }
    refreshAll();
  };

  const handleRecordFeeSubmit = (studentId: string, amount: number, method: string, tid: string) => {
    portalStore.recordFeePayment(studentId, { amount, method, tid });
    refreshAll();
  };

  const handleMarkAttendanceSubmit = (course: string, date: string, map: any) => {
    adminStore.markBatchAttendance(course, date, map);
    refreshAll();
  };

  const handle1ClickEnrollApp = (appId: string) => {
    adminStore.enrollApplicationIntoLMS(appId);
    refreshAll();
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim()) return;
    adminStore.broadcastAnnouncement(newAnnouncement.title, newAnnouncement.content, newAnnouncement.priority, newAnnouncement.target);
    setNewAnnouncement({ title: '', content: '', priority: 'normal', target: 'All' });
    refreshAll();
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingModal) return;
    portalStore.adminGradeAssignment(gradingModal.student.studentId, gradingModal.assignmentId, gradingScore, gradingFeedback);
    setGradingModal(null);
    refreshAll();
  };

  // Filtered Students
  const filteredStudents = students.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.enrolledCourse.toLowerCase().includes(q) ||
      s.whatsapp.includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-7xl h-[95vh] bg-[#050e1f] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <AdminHeader
          activeRole={activeRole}
          onRoleChange={handleRoleChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClose={onClose}
          onOpenStudentPortal={onOpenStudentPortal}
          unreadCount={applications.filter(a => a.status === 'New').length}
        />

        {/* Layout Body: Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <AdminSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeRole={activeRole}
            studentCount={students.length}
            newAppsCount={applications.filter(a => a.status === 'New').length}
            pendingFeeCount={students.filter(s => s.feeStatus !== 'Paid').length}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#040b17] space-y-6">
            {/* 1. DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <AdminDashboardOverview
                students={students}
                totalStudentsCount={528}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenAddStudent={() => setIsAddStudentOpen(true)}
                onOpenMarkAttendance={() => setIsMarkAttendanceOpen(true)}
                onOpenRecordFee={() => setIsRecordFeeOpen(true)}
                onSelectStudentDetail={(student) => setSelectedStudentForDetail(student)}
              />
            )}

            {/* 2. STUDENTS MANAGEMENT */}
            {activeTab === 'students' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Student Management Directory</h2>
                    <p className="text-xs text-slate-400">Total {students.length} enrolled students registered in institute LMS</p>
                  </div>
                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Student</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-xl">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-[#030914]/60">
                        <th className="py-3 px-3.5">Roll No</th>
                        <th className="py-3 px-3.5">Student Details</th>
                        <th className="py-3 px-3.5">Enrolled Course</th>
                        <th className="py-3 px-3.5">Batch / Timing</th>
                        <th className="py-3 px-3.5">Attendance</th>
                        <th className="py-3 px-3.5">Fee Status</th>
                        <th className="py-3 px-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredStudents.map((s) => (
                        <tr key={s.studentId} className="hover:bg-cyan-950/20 transition-colors">
                          <td className="py-3 px-3.5 font-mono text-cyan-300 font-semibold">{s.studentId}</td>
                          <td className="py-3 px-3.5">
                            <div className="font-semibold text-white">{s.name}</div>
                            <div className="text-[10px] text-slate-400">{s.fatherName ? `S/O ${s.fatherName} · ` : ''}{s.whatsapp}</div>
                          </td>
                          <td className="py-3 px-3.5 text-slate-200">{s.enrolledCourse}</td>
                          <td className="py-3 px-3.5 text-slate-300 text-[11px]">
                            {s.enrolledCourses[0]?.timing || 'Evening 5–7 PM'}
                            <span className="block text-[10px] text-cyan-400/80">{s.enrolledCourses[0]?.mode || 'Campus'}</span>
                          </td>
                          <td className="py-3 px-3.5">
                            <span className={`font-mono font-bold ${s.attendancePercent >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {s.attendancePercent}%
                            </span>
                          </td>
                          <td className="py-3 px-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              s.feeStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            }`}>
                              {s.feeStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => setSelectedStudentForDetail(s)}
                              className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 hover:text-white"
                              title="View Full Profile Scorecard"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                portalStore.adminIssueCertificate(s.studentId, s.enrolledCourse);
                                refreshAll();
                              }}
                              className="p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 hover:text-white"
                              title="Generate Official Certificate"
                            >
                              <Award className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. COURSES MANAGEMENT */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Course Offerings Management</h2>
                    <p className="text-xs text-slate-400">Total {COURSES.length} certified diploma & skill programs</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COURSES.map((course) => (
                    <div key={course.id} className="p-4 rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {course.categoryLabel}
                        </span>
                        <span className="text-xs font-bold text-amber-400 font-mono">{course.fee}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm font-display">{course.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2">{course.description}</p>
                      
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                        <span>Duration: {course.duration}</span>
                        <span className="text-emerald-400 font-semibold">Active & Published</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. INSTRUCTORS */}
            {activeTab === 'instructors' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Faculty & Instructors Directory</h2>
                    <p className="text-xs text-slate-400">Lead Instructor: Sir Zeeshan Abdul Jabbar & Certified Faculty</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {instructors.map((ins) => (
                    <div key={ins.id} className="p-5 rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-lg space-y-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-[2px]">
                          <div className="w-full h-full bg-[#030914] rounded-[14px] flex items-center justify-center font-bold text-cyan-300 text-sm">
                            {ins.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{ins.name}</h4>
                          <p className="text-[11px] text-cyan-300">{ins.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{ins.qualification}</span>
                        </div>
                      </div>

                      <p className="text-slate-300 leading-relaxed text-[11px]">{ins.bio}</p>

                      <div className="pt-2 border-t border-slate-800 space-y-1">
                        <div className="font-semibold text-slate-400 text-[10px] uppercase">Assigned Courses:</div>
                        <div className="flex flex-wrap gap-1">
                          {ins.assignedCourses.map((c, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-[#030914] border border-slate-800 text-[10px] text-slate-300">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 text-[10px] text-slate-400 flex justify-between">
                        <span>📞 {ins.phone}</span>
                        <span>✉️ {ins.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. CLASSES & SCHEDULE */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Class Timetable & Schedule</h2>
                    <p className="text-xs text-slate-400">Physical lab sessions & interactive live Zoom classes</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="p-5 rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-lg space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-cyan-300 font-bold">{cls.time}</span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px]">
                          {cls.mode}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-white text-sm">{cls.courseTitle}</h4>
                        <p className="text-cyan-200/90 text-xs mt-0.5">{cls.topic}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#030914] border border-slate-800 space-y-1 text-[11px] text-slate-300">
                        <div>👨‍🏫 Instructor: <span className="font-semibold text-white">{cls.instructorName}</span></div>
                        <div>🏢 Location: <span className="text-amber-300">{cls.classroom}</span></div>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={cls.zoomMeetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-center text-xs transition-colors"
                        >
                          Join Session
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. ATTENDANCE MANAGEMENT */}
            {activeTab === 'attendance' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Daily Attendance Management</h2>
                    <p className="text-xs text-slate-400">Mark daily physical/online lecture presence & sync to parent reports</p>
                  </div>
                  <button
                    onClick={() => setIsMarkAttendanceOpen(true)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
                  >
                    Open Daily Sheet Register
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-xl space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[#030914] border border-emerald-500/30">
                      <div className="text-2xl font-bold text-emerald-400 font-display">92%</div>
                      <span className="text-[10px] text-slate-400 uppercase">Average Present</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#030914] border border-rose-500/30">
                      <div className="text-2xl font-bold text-rose-400 font-display">5%</div>
                      <span className="text-[10px] text-slate-400 uppercase">Average Absent</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#030914] border border-amber-500/30">
                      <div className="text-2xl font-bold text-amber-400 font-display">2%</div>
                      <span className="text-[10px] text-slate-400 uppercase">Approved Leaves</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#030914] border border-blue-500/30">
                      <div className="text-2xl font-bold text-blue-400 font-display">1%</div>
                      <span className="text-[10px] text-slate-400 uppercase">Late Arrivals</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. ASSIGNMENTS */}
            {activeTab === 'assignments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Student Assignment Submissions & Grading</h2>
                    <p className="text-xs text-slate-400">Review code repos, prompt files, and issue instructor marks with feedback</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {students.flatMap(s => s.assignments.map(a => ({ student: s, assignment: a }))).slice(0, 8).map(({ student, assignment }, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#061226] border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{student.name} ({student.studentId})</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            assignment.status === 'Checked' ? 'bg-emerald-500/20 text-emerald-300' :
                            assignment.status === 'Submitted' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {assignment.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-cyan-300 text-xs mt-1">{assignment.title}</h4>
                        {assignment.submission?.feedback && (
                          <p className="text-[11px] text-slate-400 mt-0.5">💬 Feedback: {assignment.submission.feedback}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {assignment.submission?.score && (
                          <span className="font-mono text-emerald-400 font-bold bg-[#030914] px-2.5 py-1 rounded-lg border border-slate-800">
                            {assignment.submission.score}
                          </span>
                        )}
                        <button
                          onClick={() => setGradingModal({ student, assignmentId: assignment.id, title: assignment.title })}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                        >
                          Grade / Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. FEES & FINANCIALS */}
            {activeTab === 'fees' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Institute Fee Ledger & Financial Overview</h2>
                    <p className="text-xs text-slate-400">Track collections, bank transactions, and installment schedules</p>
                  </div>
                  <button
                    onClick={() => setIsRecordFeeOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
                  >
                    + Record Fee Payment
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25">
                    <span className="text-xs text-slate-400">Total Invoiced Fees</span>
                    <div className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                      PKR {financials.totalFees.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-emerald-500/25">
                    <span className="text-xs text-slate-400">Fees Collected (Paid)</span>
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display mt-1">
                      PKR {financials.collectedFees.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-rose-500/25">
                    <span className="text-xs text-slate-400">Pending Receivables</span>
                    <div className="text-2xl sm:text-3xl font-bold text-rose-400 font-display mt-1">
                      PKR {financials.pendingFees.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-xl">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-[#030914]/60">
                        <th className="py-3 px-3">Student</th>
                        <th className="py-3 px-3">Course</th>
                        <th className="py-3 px-3">Total Fee</th>
                        <th className="py-3 px-3">Paid Amount</th>
                        <th className="py-3 px-3">Remaining</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {students.map((s) => (
                        <tr key={s.studentId} className="hover:bg-cyan-950/20">
                          <td className="py-3 px-3 font-semibold text-white">{s.name} ({s.studentId})</td>
                          <td className="py-3 px-3 text-slate-300">{s.enrolledCourse}</td>
                          <td className="py-3 px-3 font-mono">PKR {s.feeRecord.totalFee.toLocaleString()}</td>
                          <td className="py-3 px-3 font-mono text-emerald-400">PKR {s.feeRecord.paidAmount.toLocaleString()}</td>
                          <td className="py-3 px-3 font-mono text-rose-400">PKR {s.feeRecord.remainingAmount.toLocaleString()}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              s.feeStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            }`}>
                              {s.feeStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <a
                              href={`https://wa.me/${s.whatsapp.replace(/\D/g, '')}?text=Assalam%20o%20Alaikum%20${encodeURIComponent(s.name)},%20this%20is%20SkillAI%20Tech%20Institute.%20Your%20fee%20balance%20is%20PKR%20${s.feeRecord.remainingAmount}.`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                            >
                              <span>WhatsApp Reminder</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. ADMISSIONS / APPLICATIONS PIPELINE */}
            {activeTab === 'admissions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Online Admissions & Inquiry Pipeline</h2>
                    <p className="text-xs text-slate-400">New leads from website form with instant 1-Click LMS student conversion</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 rounded-2xl bg-[#061226] border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{app.fullName}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            app.status === 'New' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            app.status === 'Enrolled' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {app.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Applied: {app.appliedDate}</span>
                        </div>
                        <p className="text-cyan-300 mt-1 font-semibold">{app.course} · <span className="text-slate-300 font-normal">{app.mode} ({app.timing})</span></p>
                        <p className="text-slate-400 text-[11px] mt-0.5">📞 {app.whatsapp} · ✉️ {app.email} · 📍 {app.city} ({app.education})</p>
                        {app.notes && <p className="text-[10px] text-amber-300/80 mt-1">📝 {app.notes}</p>}
                      </div>

                      <div className="flex items-center gap-2">
                        {app.status !== 'Enrolled' ? (
                          <button
                            onClick={() => handle1ClickEnrollApp(app.id)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer"
                          >
                            1-Click Enroll into LMS
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Enrolled in LMS</span>
                          </span>
                        )}
                        <a
                          href={`https://wa.me/${app.whatsapp.replace(/\D/g, '')}?text=Assalam%20o%20Alaikum%20${encodeURIComponent(app.fullName)},%20SkillAI%20Tech%20Institute%20Nankana%20se%20rabta%20kiya%20gaya%20hai.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          title="Chat on WhatsApp"
                        >
                          <Phone className="w-4 h-4 text-emerald-400" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. ANNOUNCEMENTS */}
            {activeTab === 'announcements' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Broadcast Institute Announcements</h2>
                    <p className="text-xs text-slate-400">Push notices directly to all student portals and notification feeds</p>
                  </div>
                </div>

                <form onSubmit={handleCreateAnnouncement} className="p-5 rounded-2xl bg-[#061226] border border-cyan-500/20 space-y-3 text-xs">
                  <h3 className="font-bold text-white text-sm">Create New Notice</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      placeholder="Notice Title (e.g. Saturday Special AI Hackathon)"
                      className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                    <select
                      value={newAnnouncement.target}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: e.target.value })}
                      className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="All">Target: All Institute Students</option>
                      {COURSES.map(c => (
                        <option key={c.id} value={c.title}>Target: {c.title}</option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    required
                    rows={3}
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    placeholder="Enter detailed notice message to be displayed on student dashboard..."
                    className="w-full bg-[#030914] border border-slate-700 rounded-xl p-3 text-white focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Broadcast Live Announcement</span>
                  </button>
                </form>
              </div>
            )}

            {/* 11. AUTOMATION & N8N PIPELINE */}
            {activeTab === 'automation' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">n8n, Google Sheets & WhatsApp Automations</h2>
                    <p className="text-xs text-slate-400">Live webhook integration activity logs & automated triggers</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    n8n Webhook Active
                  </span>
                </div>

                <div className="space-y-3">
                  {automationLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-2xl bg-[#061226] border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          {log.event}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                      </div>
                      <p className="text-slate-300">{log.details}</p>
                      <div className="text-[10px] text-cyan-300/80 flex gap-4 pt-1 border-t border-slate-800/60">
                        <span>Source: {log.source}</span>
                        <span>Destination: {log.destination}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 12. FALLBACK FOR OTHER TABS (Settings, Website, Reports) */}
            {(activeTab === 'website' || activeTab === 'reports' || activeTab === 'settings' || activeTab === 'ai-assistant' || activeTab === 'lectures' || activeTab === 'certificates' || activeTab === 'progress' || activeTab === 'notifications') && (
              <div className="p-6 rounded-2xl bg-[#061226] border border-cyan-500/20 text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white capitalize">{activeTab.replace('-', ' ')} Control Panel</h2>
                    <p className="text-xs text-slate-400">SkillAI Institute configuration and asset management module</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#030914] border border-slate-800 space-y-3">
                  <p className="text-slate-300">
                    This section is connected to the institute database. Any changes automatically persist across the platform.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                    <div className="p-3 rounded-lg bg-[#071328] border border-slate-800">
                      <span className="font-semibold text-white block">Institute Name:</span>
                      {INSTITUTE_INFO.name}
                    </div>
                    <div className="p-3 rounded-lg bg-[#071328] border border-slate-800">
                      <span className="font-semibold text-white block">Founder & CEO:</span>
                      Zeeshan Abdul Jabbar
                    </div>
                    <div className="p-3 rounded-lg bg-[#071328] border border-slate-800">
                      <span className="font-semibold text-white block">Campus Address:</span>
                      {INSTITUTE_INFO.address}
                    </div>
                    <div className="p-3 rounded-lg bg-[#071328] border border-slate-800">
                      <span className="font-semibold text-white block">Official WhatsApp:</span>
                      {INSTITUTE_INFO.phone}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* --- MODALS --- */}
        <AddStudentModal
          isOpen={isAddStudentOpen}
          onClose={() => setIsAddStudentOpen(false)}
          onAdd={handleAddStudentSubmit}
        />

        <RecordFeeModal
          isOpen={isRecordFeeOpen}
          onClose={() => setIsRecordFeeOpen(false)}
          students={students}
          onRecord={handleRecordFeeSubmit}
        />

        <MarkAttendanceModal
          isOpen={isMarkAttendanceOpen}
          onClose={() => setIsMarkAttendanceOpen(false)}
          students={students}
          onSave={handleMarkAttendanceSubmit}
        />

        {/* Student Scorecard Drilldown Modal */}
        {selectedStudentForDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
            <div className="relative w-full max-w-2xl bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-left text-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
              <button 
                onClick={() => setSelectedStudentForDetail(null)} 
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-[2px]">
                  <div className="w-full h-full bg-[#030914] rounded-[14px] flex items-center justify-center font-bold text-cyan-300 text-lg">
                    {selectedStudentForDetail.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">{selectedStudentForDetail.name}</h3>
                  <p className="text-xs text-cyan-300 font-mono">{selectedStudentForDetail.studentId} · {selectedStudentForDetail.enrolledCourse}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Progress</span>
                  <span className="text-amber-400 font-bold font-mono text-sm">{selectedStudentForDetail.progressPercent}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Attendance</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">{selectedStudentForDetail.attendancePercent}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Fee Status</span>
                  <span className="text-cyan-300 font-bold text-xs">{selectedStudentForDetail.feeStatus}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">City</span>
                  <span className="text-white font-semibold text-xs">{selectedStudentForDetail.city}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#030914] border border-slate-800 text-xs space-y-1.5">
                <div className="font-semibold text-cyan-300">Financial Ledger:</div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Fee: PKR {selectedStudentForDetail.feeRecord.totalFee.toLocaleString()}</span>
                  <span>Paid: PKR {selectedStudentForDetail.feeRecord.paidAmount.toLocaleString()}</span>
                  <span className="text-rose-400 font-bold">Remaining: PKR {selectedStudentForDetail.feeRecord.remainingAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    portalStore.adminIssueCertificate(selectedStudentForDetail.studentId, selectedStudentForDetail.enrolledCourse);
                    refreshAll();
                    setSelectedStudentForDetail(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Generate Official Certificate
                </button>
                <a
                  href={`https://wa.me/${selectedStudentForDetail.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  WhatsApp Student
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Grading Modal */}
        {gradingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-left text-slate-100 space-y-3 text-xs">
              <button onClick={() => setGradingModal(null)} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800">
                ✕
              </button>
              <h3 className="text-lg font-bold font-display text-white">Grade Assignment</h3>
              <p className="text-slate-300 font-semibold">{gradingModal.title}</p>
              <p className="text-[11px] text-cyan-300">Student: {gradingModal.student.name} ({gradingModal.student.studentId})</p>

              <form onSubmit={handleGradeSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block mb-1 text-slate-400 font-semibold">Marks / Grade *</label>
                  <input
                    required
                    type="text"
                    value={gradingScore}
                    onChange={(e) => setGradingScore(e.target.value)}
                    placeholder="e.g. 98/100 or A+"
                    className="w-full bg-[#030914] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-400 font-semibold">Instructor Feedback</label>
                  <textarea
                    rows={3}
                    value={gradingFeedback}
                    onChange={(e) => setGradingFeedback(e.target.value)}
                    className="w-full bg-[#030914] border border-slate-700 rounded-xl p-3 text-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Submit Marks & Notify Student
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
