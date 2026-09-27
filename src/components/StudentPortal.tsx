import { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  BookOpen, 
  Video, 
  FileText, 
  Award, 
  Calendar, 
  LogOut, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Play, 
  Sparkles,
  X,
  CreditCard,
  Bell,
  MessageSquare,
  Wrench,
  TrendingUp,
  FolderDown,
  Compass,
  Check,
  Send,
  Upload,
  Search,
  ShieldCheck,
  HelpCircle,
  Eye,
  AlertCircle,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { portalStore } from '../services/portalStore';
import { PortalStudent, Course, AssignmentItem, PracticalProjectItem } from '../types';
import CertificateViewModal from './portal/CertificateViewModal';
import { INSTITUTE_INFO, COURSES } from '../data/instituteData';

interface StudentPortalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillStudentId?: string;
  onOpenApplyModal?: () => void;
  onOpenAdminDashboard?: () => void;
}

export default function StudentPortal({
  isOpen,
  onClose,
  prefillStudentId,
  onOpenApplyModal,
  onOpenAdminDashboard
}: StudentPortalProps) {
  const [currentStudent, setCurrentStudent] = useState<PortalStudent>(portalStore.getCurrentStudent());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'courses' | 'lectures' | 'schedule' | 'assignments' |
    'projects' | 'progress' | 'attendance' | 'fees' | 'certificates' |
    'profile' | 'notifications' | 'support' | 'announcements' | 'resources' |
    'roadmap' | 'admin'
  >('dashboard');

  // Login credentials state
  const [loginQuery, setLoginQuery] = useState(prefillStudentId || '');
  const [loginError, setLoginError] = useState('');

  // Modals & sub-state
  const [playingVideo, setPlayingVideo] = useState<{ title: string; week: string } | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    studentName: string;
    fatherName?: string;
    credentialId: string;
    issueDate: string;
    grade?: string;
  } | null>(null);

  // Assignment submission modal
  const [submittingAssignment, setSubmittingAssignment] = useState<AssignmentItem | null>(null);
  const [asgGithub, setAsgGithub] = useState('');
  const [asgProjectLink, setAsgProjectLink] = useState('');
  const [asgComments, setAsgComments] = useState('');

  // Project submission modal
  const [editingProject, setEditingProject] = useState<PracticalProjectItem | null>(null);
  const [projGithub, setProjGithub] = useState('');
  const [projLive, setProjLive] = useState('');
  const [projStatus, setProjStatus] = useState<'Completed' | 'In Progress' | 'Not Started'>('In Progress');

  // Fee payment modal
  const [payingFeeModal, setPayingFeeModal] = useState(false);
  const [feeAmount, setFeeAmount] = useState('5000');
  const [feeMethod, setFeeMethod] = useState('JazzCash');
  const [feeTid, setFeeTid] = useState('');

  // Profile edit form
  const [editProfileForm, setEditProfileForm] = useState({
    name: '',
    fatherName: '',
    whatsapp: '',
    email: '',
    city: '',
    education: ''
  });
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // In-portal AI support state
  const [supportInput, setSupportInput] = useState('');
  const [supportMessages, setSupportMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: `Assalam o Alaikum! Main SkillAI Portal Support Bot hoon. Aap apni classes, attendance, assignments ya fee ke mutabiq kuch bhi pooch saktay hain!`
    }
  ]);

  // Sync state on load or when student changes
  const refreshStudentState = () => {
    const s = portalStore.getCurrentStudent();
    setCurrentStudent({ ...s });
    setEditProfileForm({
      name: s.name,
      fatherName: s.fatherName,
      whatsapp: s.whatsapp,
      email: s.email,
      city: s.city,
      education: s.education
    });
  };

  useEffect(() => {
    if (isOpen) {
      if (prefillStudentId) {
        const student = portalStore.login(prefillStudentId);
        if (student) {
          setCurrentStudent({ ...student });
          setIsLoggedIn(true);
          setLoginQuery(student.studentId);
          setEditProfileForm({
            name: student.name,
            fatherName: student.fatherName,
            whatsapp: student.whatsapp,
            email: student.email,
            city: student.city,
            education: student.education
          });
          return;
        }
      }
      refreshStudentState();
    }
  }, [isOpen, prefillStudentId]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginQuery.trim()) {
      setLoginError('Please enter your Student ID, Email, or WhatsApp Number.');
      return;
    }

    const found = portalStore.login(loginQuery);
    if (found) {
      setCurrentStudent({ ...found });
      setIsLoggedIn(true);
      setLoginError('');
      refreshStudentState();
    } else {
      setLoginError(`No registered student found for "${loginQuery}". Please check your Student ID or enroll first.`);
    }
  };

  const handleQuickStudentSwitch = (studentId: string) => {
    portalStore.setCurrentStudentId(studentId);
    refreshStudentState();
    setIsLoggedIn(true);
  };

  const handleLectureToggle = (lectureId: string) => {
    portalStore.toggleLectureCompleted(currentStudent.studentId, lectureId);
    refreshStudentState();
  };

  const handleAssignmentSubmitConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment) return;

    portalStore.submitAssignment(currentStudent.studentId, submittingAssignment.id, {
      githubLink: asgGithub,
      projectLink: asgProjectLink,
      comments: asgComments
    });

    setSubmittingAssignment(null);
    setAsgGithub('');
    setAsgProjectLink('');
    setAsgComments('');
    refreshStudentState();
  };

  const handleProjectUpdateConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    portalStore.updateProject(currentStudent.studentId, editingProject.id, {
      status: projStatus,
      githubUrl: projGithub,
      liveDemoUrl: projLive
    });

    setEditingProject(null);
    refreshStudentState();
  };

  const handleFeePaymentConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(feeAmount, 10);
    if (isNaN(num) || num <= 0 || !feeTid.trim()) return;

    portalStore.recordFeePayment(currentStudent.studentId, {
      amount: num,
      method: feeMethod,
      tid: feeTid
    });

    setPayingFeeModal(false);
    setFeeTid('');
    refreshStudentState();
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    portalStore.updateProfile(currentStudent.studentId, editProfileForm);
    refreshStudentState();
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 2500);
  };

  const handleSupportSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const q = supportInput.trim();
    setSupportMessages(prev => [...prev, { sender: 'user', text: q }]);
    setSupportInput('');

    setTimeout(() => {
      const qLower = q.toLowerCase();
      let reply = '';
      if (qLower.includes('class') || qLower.includes('next') || qLower.includes('timing') || qLower.includes('kab')) {
        reply = `Aap ki next class: ${currentStudent.nextClass}. Zoom link: ${currentStudent.nextClassLink}`;
      } else if (qLower.includes('attendance') || qLower.includes('hazri')) {
        reply = `Aap ki total attendance ${currentStudent.attendance.percentage}% hai (${currentStudent.attendance.present} Present, ${currentStudent.attendance.absent} Absent).`;
      } else if (qLower.includes('fee') || qLower.includes('paid') || qLower.includes('remaining') || qLower.includes('paisa')) {
        reply = `Aap ka Total Fee: PKR ${currentStudent.feeRecord.totalFee.toLocaleString()}, Paid: PKR ${currentStudent.feeRecord.paidAmount.toLocaleString()}, Remaining Balance: PKR ${currentStudent.feeRecord.remainingAmount.toLocaleString()}. Status: ${currentStudent.feeRecord.status}.`;
      } else if (qLower.includes('assignment') || qLower.includes('homework')) {
        const pendingCount = currentStudent.assignments.filter(a => a.status === 'Pending').length;
        reply = `Aap ki filhal ${pendingCount} pending assignment(s) hain. Aap "Assignments" tab se directly GitHub link submit kar saktay hain.`;
      } else if (qLower.includes('certificate') || qLower.includes('sanad')) {
        reply = `Aap ka course progress ${currentStudent.progressPercent}% hai. 100% complete hone par automatic verifiable certificate issue ho jata hai!`;
      } else {
        reply = `Aap ke query "${q}" ke mutabiq record check kar liya gaya hai. Mazeed inquiry ke liye Sir Zeeshan Abdul Jabbar ke WhatsApp (0301-4870303) par direct rabta karein.`;
      }

      setSupportMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 400);
  };

  const allRegisteredStudents = portalStore.getAllStudents();
  const unreadNotificationsCount = currentStudent.notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-7xl h-[94vh] bg-[#050e1f] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top App Header Bar */}
        <div className="px-4 py-3 bg-[#030914] border-b border-cyan-500/20 flex items-center justify-between shrink-0">
          {/* Logo & Institute Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <div className="w-full h-full bg-[#030914] rounded-[10px] flex items-center justify-center font-display font-extrabold text-cyan-400 text-lg">
                S
              </div>
            </div>
            <div>
              <div className="font-extrabold text-white text-sm font-display tracking-wide">
                SKILL<span className="text-cyan-400">AI</span> PORTAL <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 ml-1">LMS v2.4</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5">
                Future Skills for Future Leaders · Tech Institute Nankana
              </p>
            </div>
          </div>

          {/* Top Controls Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn && (
              <>
                {/* Active Student Switcher Dropdown */}
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#08152b] border border-slate-700 text-xs">
                  <span className="text-slate-400 text-[11px]">Active Student:</span>
                  <select
                    value={currentStudent.studentId}
                    onChange={(e) => handleQuickStudentSwitch(e.target.value)}
                    className="bg-transparent text-cyan-300 font-semibold focus:outline-none cursor-pointer"
                  >
                    {allRegisteredStudents.map((s) => (
                      <option key={s.studentId} value={s.studentId} className="bg-[#071328] text-white">
                        {s.name} ({s.studentId}) — {s.enrolledCourse}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notifications Trigger */}
                <button
                  onClick={() => {
                    setActiveTab('notifications');
                    portalStore.markAllNotificationsRead(currentStudent.studentId);
                    refreshStudentState();
                  }}
                  className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 text-cyan-400" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* Profile Pill */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950/80 to-[#08152b] border border-cyan-500/30 hover:border-cyan-400 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {currentStudent.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-white">
                    {currentStudent.name.split(' ')[0]}
                  </span>
                </button>
              </>
            )}

            {/* Cut / Close Portal Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer ml-1"
              title="Close Portal"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cut</span>
            </button>
          </div>
        </div>

        {/* Main Body */}
        {!isLoggedIn ? (
          /* Dynamic Login Screen */
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 bg-gradient-to-b from-[#050e1f] to-[#020713]">
            <div className="w-full max-w-md bg-[#071328] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 p-[2px] shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center">
                  <div className="w-full h-full bg-[#030914] rounded-[14px] flex items-center justify-center font-display font-extrabold text-cyan-400 text-2xl">
                    S
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  SkillAI Student Portal Login
                </h3>
                <p className="text-xs text-slate-400">
                  Enter your Student ID, Registered Email, or WhatsApp Number to access your live LMS.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student ID, Email or WhatsApp *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={loginQuery}
                      onChange={(e) => setLoginQuery(e.target.value)}
                      placeholder="e.g. SKL-2026-00125 or student@skillai.pk"
                      className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Portal Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      defaultValue="pass123"
                      className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all cursor-pointer"
                >
                  Log In to Student Dashboard
                </button>

                {onOpenApplyModal && (
                  <button
                    type="button"
                    onClick={onOpenApplyModal}
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>New Student? Apply & Enroll Online</span>
                  </button>
                )}
              </form>

              {/* Instant One-Click Demo Switcher */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 block text-center uppercase tracking-wider">
                  Quick Access Accounts ({allRegisteredStudents.length} Students Active):
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {allRegisteredStudents.map((s, idx) => (
                    <button
                      key={s.studentId}
                      type="button"
                      onClick={() => handleQuickStudentSwitch(s.studentId)}
                      className="w-full p-2 rounded-xl bg-[#040e1e] hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 font-bold text-[10px] flex items-center justify-center">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-cyan-300 flex items-center gap-1.5">
                            <span>{s.name}</span>
                            {idx === 0 && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-normal">
                                Active / Latest
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[190px]">
                            {s.enrolledCourse}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                        {s.studentId} →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Dynamic Logged-in LMS Application Layout */
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar Navigation (16 Tabs) */}
            <aside className="w-64 bg-[#030814] border-r border-slate-800/80 flex flex-col shrink-0 overflow-y-auto">
              {/* Student Mini Profile Header in Sidebar */}
              <div className="p-4 border-b border-slate-800/80 bg-gradient-to-b from-[#06142c] to-[#030914]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-[2px]">
                    <div className="w-full h-full bg-[#030914] rounded-[10px] flex items-center justify-center font-bold text-cyan-300 text-sm">
                      {currentStudent.name.charAt(0)}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">{currentStudent.name}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 block truncate">{currentStudent.studentId}</span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
                  <span>Course:</span>
                  <span className="text-cyan-300 font-semibold truncate max-w-[130px]">{currentStudent.enrolledCourse}</span>
                </div>
              </div>

              {/* Navigation Items List */}
              <nav className="p-2 space-y-0.5 text-xs font-medium flex-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: Sliders },
                  { id: 'courses', label: 'My Courses', icon: BookOpen },
                  { id: 'lectures', label: 'Class Recordings', icon: Video, badge: `${currentStudent.lectures.filter(l => l.status === 'Completed').length}/${currentStudent.lectures.length}` },
                  { id: 'schedule', label: 'Class Schedule', icon: Calendar },
                  { id: 'assignments', label: 'Assignments', icon: FileText, badge: `${currentStudent.assignments.filter(a => a.status === 'Pending').length} Pending` },
                  { id: 'projects', label: 'Practical Projects', icon: Wrench },
                  { id: 'progress', label: 'Learning Progress', icon: TrendingUp },
                  { id: 'attendance', label: 'Attendance', icon: Clock, badge: `${currentStudent.attendance.percentage}%` },
                  { id: 'fees', label: 'Fees & Invoices', icon: CreditCard },
                  { id: 'certificates', label: 'Certificates', icon: Award },
                  { id: 'profile', label: 'Student Profile', icon: User },
                  { id: 'support', label: 'Portal AI Support', icon: MessageSquare },
                  { id: 'announcements', label: 'Announcements', icon: AlertCircle },
                  { id: 'resources', label: 'Course Resources', icon: FolderDown },
                  { id: 'roadmap', label: 'AI Learning Path', icon: Compass },
                  { id: 'admin', label: 'Instructor / Admin Mode', icon: ShieldCheck }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                          isActive ? 'bg-black/30 text-white' : 'bg-slate-900 text-cyan-400 border border-cyan-500/20'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="p-3 border-t border-slate-800">
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of Portal</span>
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#040b17] space-y-6">
              {profileSavedToast && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Student profile updated successfully!</span>
                </div>
              )}

              {/* TAB 1: 🏠 DASHBOARD (Structure exactly as requested) */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Greeting & Welcome */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                        Welcome Back, {currentStudent.name.split(' ')[0]} 👋
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Batch 2026 · {currentStudent.enrolledCourse} · {currentStudent.city}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={currentStudent.nextClassLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-md hover:from-amber-300 hover:to-yellow-300 transition-all"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Join Live Class</span>
                      </a>
                    </div>
                  </div>

                  {/* 3 Top Stat Boxes matching prompt: [Course 02] [Attend. 92%] [Progress 68%] */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 shadow-lg">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Enrolled Courses</span>
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-white font-display">
                        {String(currentStudent.enrolledCourses.length).padStart(2, '0')}
                      </div>
                      <span className="text-[11px] text-cyan-300 font-medium">
                        Active: {currentStudent.enrolledCourse}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 shadow-lg">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Attendance Standing</span>
                        <Clock className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-emerald-400 font-display">
                        {currentStudent.attendance.percentage}%
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {currentStudent.attendance.present} Present · {currentStudent.attendance.absent} Absent
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 shadow-lg">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Course Progress</span>
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-3xl font-extrabold text-amber-400 font-display">
                        {currentStudent.progressPercent}%
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {currentStudent.lectures.filter(l => l.status === 'Completed').length} of {currentStudent.lectures.length} Lectures Completed
                      </span>
                    </div>
                  </div>

                  {/* Continue Learning Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#081c3b] via-[#051326] to-[#081c3b] border-2 border-cyan-500/30 shadow-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                          CONTINUE LEARNING
                        </span>
                        <h3 className="text-lg font-bold text-white font-display mt-0.5">
                          {currentStudent.enrolledCourse}
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('lectures')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all self-start sm:self-auto"
                      >
                        <span>Continue Course</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress Bar matching prompt: ███████████░░░ 68% */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Curriculum Mastery</span>
                        <span className="text-cyan-300 font-bold">{currentStudent.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#030914] h-3 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                          style={{ width: `${currentStudent.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Classes & Recent Assignments Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Upcoming Classes Card */}
                    <div className="p-5 rounded-2xl bg-[#071328] border border-cyan-500/20 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>Upcoming Classes</span>
                        </h4>
                        <button onClick={() => setActiveTab('schedule')} className="text-[11px] text-cyan-400 hover:underline">
                          Full Timetable →
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {currentStudent.schedule.slice(0, 2).map((item) => (
                          <div key={item.id} className="p-3 rounded-xl bg-[#030914] border border-slate-800 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-amber-400">{item.day} {item.time}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                  {item.status}
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-white mt-1">{item.topic}</p>
                              <span className="text-[10px] text-slate-400">Instructor: {item.instructor}</span>
                            </div>
                            <a
                              href={item.joinLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs rounded-xl transition-colors"
                            >
                              Join Class
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Assignments Card */}
                    <div className="p-5 rounded-2xl bg-[#071328] border border-cyan-500/20 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          <span>Recent Assignments</span>
                        </h4>
                        <button onClick={() => setActiveTab('assignments')} className="text-[11px] text-amber-400 hover:underline">
                          View All →
                        </button>
                      </div>

                      <div className="space-y-2">
                        {currentStudent.assignments.slice(0, 3).map((asg) => (
                          <div key={asg.id} className="p-2.5 rounded-xl bg-[#030914] border border-slate-800 flex items-center justify-between text-xs">
                            <div className="overflow-hidden pr-2">
                              <span className="font-semibold text-white block truncate">{asg.title}</span>
                              <span className="text-[10px] text-slate-400">Due: {asg.dueDate}</span>
                            </div>
                            <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              asg.status === 'Checked'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : asg.status === 'Submitted'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              {asg.status === 'Checked' ? `Checked (${asg.submission?.score || 'A+'})` : asg.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: 📚 MY COURSES */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">My Enrolled Courses</h3>
                    <p className="text-xs text-slate-400">All technology programs associated with your Student ID.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStudent.enrolledCourses.map((c, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#071328] border border-cyan-500/25 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            c.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}>
                            {c.status}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">Enrolled: {c.enrolledDate}</span>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white font-display">{c.courseTitle}</h4>
                          <p className="text-xs text-cyan-300">Instructor: {c.instructor} · Duration: {c.duration}</p>
                          <p className="text-[11px] text-slate-400 mt-1">Batch: {c.timing} ({c.mode})</p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-cyan-300 font-bold">{c.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                            <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${c.progressPercent}%` }} />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
                          <button
                            onClick={() => setActiveTab('lectures')}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                          >
                            Continue Learning
                          </button>
                          <button
                            onClick={() => setActiveTab('resources')}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                          >
                            View Curriculum
                          </button>
                          <button
                            onClick={() => setActiveTab('projects')}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                          >
                            View Projects
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: 🎥 LECTURES / CLASS RECORDINGS */}
              {activeTab === 'lectures' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">Class Recordings & Lecture Notes</h3>
                      <p className="text-xs text-slate-400">Stream recordings, download code templates, and mark lectures as completed.</p>
                    </div>
                    <div className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/30">
                      Overall Progress: {currentStudent.progressPercent}%
                    </div>
                  </div>

                  {/* Video Stream Simulator */}
                  {playingVideo && (
                    <div className="p-4 rounded-3xl bg-black border-2 border-cyan-500/40 shadow-2xl space-y-3 animate-in fade-in">
                      <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-cyan-500/30 border border-cyan-400 flex items-center justify-center text-cyan-300 mb-3 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                            <Play className="w-8 h-8 fill-cyan-400" />
                          </div>
                          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">{playingVideo.week}</span>
                          <h4 className="text-base sm:text-lg font-bold text-white max-w-lg mt-1">{playingVideo.title}</h4>
                          <span className="text-[11px] text-slate-400 mt-1">High-Definition Lecture Stream · SkillAI Secure CDN</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400">Instructor: Zeeshan Abdul Jabbar</span>
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                        >
                          Close Player
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Lectures List grouped by week */}
                  <div className="space-y-3">
                    {currentStudent.lectures.map((lec) => (
                      <div
                        key={lec.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          lec.status === 'Completed'
                            ? 'bg-[#061426] border-emerald-500/30'
                            : lec.status === 'Current'
                            ? 'bg-[#08182f] border-cyan-500/50 shadow-md'
                            : 'bg-[#030914] border-slate-800/80 opacity-75'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold">
                              {lec.weekLabel}
                            </span>
                            <span className="text-xs text-slate-400">{lec.duration}</span>
                            {lec.status === 'Completed' && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                                <CheckCircle2 className="w-3 h-3" /> Completed {lec.completedAt ? `(${lec.completedAt})` : ''}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-white">{lec.title}</h4>
                          {lec.notesTitle && (
                            <span className="text-[11px] text-cyan-400/80 flex items-center gap-1">
                              <FolderDown className="w-3 h-3" /> Notes: {lec.notesTitle}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setPlayingVideo({ title: lec.title, week: lec.weekLabel })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Watch Lecture</span>
                          </button>

                          <button
                            onClick={() => handleLectureToggle(lec.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                              lec.status === 'Completed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                            }`}
                            title="Toggle lecture completion status"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{lec.status === 'Completed' ? 'Completed' : 'Mark Done'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: 📅 CLASS SCHEDULE */}
              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Weekly Class Schedule & Timetable</h3>
                    <p className="text-xs text-slate-400">Live physical sessions at Lab 1 & interactive live Zoom broadcast.</p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#030914] text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">Day & Date</th>
                          <th className="p-3.5">Time</th>
                          <th className="p-3.5">Topic</th>
                          <th className="p-3.5">Instructor</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-[#061224]">
                        {currentStudent.schedule.map((item) => (
                          <tr key={item.id} className="hover:bg-[#08172e] transition-colors">
                            <td className="p-3.5 font-bold text-white">{item.day} · {item.date}</td>
                            <td className="p-3.5 text-amber-300 font-mono">{item.time}</td>
                            <td className="p-3.5 font-medium text-cyan-300">{item.topic}</td>
                            <td className="p-3.5 text-slate-300">{item.instructor}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                                {item.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right">
                              <a
                                href={item.joinLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                              >
                                <span>Join Class</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: 📝 ASSIGNMENTS */}
              {activeTab === 'assignments' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">Student Assignments</h3>
                      <p className="text-xs text-slate-400">Submit your GitHub code, live demo link, or comments for tutor grading.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStudent.assignments.map((asg) => (
                      <div key={asg.id} className="p-5 rounded-2xl bg-[#071328] border border-cyan-500/20 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-slate-700">
                              {asg.topic}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              asg.status === 'Checked'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : asg.status === 'Submitted'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              {asg.status}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white">{asg.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{asg.instructions}</p>
                          <span className="text-[11px] text-amber-400 block font-mono">Due Date: {asg.dueDate}</span>
                        </div>

                        {/* Submission details if submitted */}
                        {asg.submission && (
                          <div className="p-3 rounded-xl bg-[#030914] border border-slate-800 text-xs space-y-1">
                            <div className="flex justify-between text-slate-400">
                              <span>Submitted on: {asg.submission.submittedAt}</span>
                              {asg.submission.score && (
                                <span className="font-bold text-emerald-400">Score: {asg.submission.score}</span>
                              )}
                            </div>
                            {asg.submission.githubLink && (
                              <a href={asg.submission.githubLink} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline block truncate">
                                GitHub: {asg.submission.githubLink}
                              </a>
                            )}
                            {asg.submission.feedback && (
                              <p className="text-[11px] text-slate-300 italic pt-1 border-t border-slate-800">
                                Feedback: "{asg.submission.feedback}"
                              </p>
                            )}
                          </div>
                        )}

                        <div className="pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setSubmittingAssignment(asg);
                              setAsgGithub(asg.submission?.githubLink || '');
                              setAsgProjectLink(asg.submission?.projectLink || '');
                              setAsgComments(asg.submission?.comments || '');
                            }}
                            className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{asg.status === 'Pending' ? 'Submit Assignment' : 'Update Submission'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: 🧑💻 PRACTICAL PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">Course Practical Projects</h3>
                      <p className="text-xs text-slate-400">Build portfolio-grade software to showcase to remote freelance clients.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentStudent.projects.map((proj) => (
                      <div key={proj.id} className="p-5 rounded-2xl bg-[#071328] border border-cyan-500/20 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                            proj.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : proj.status === 'In Progress'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {proj.status}
                          </span>
                          <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                        </div>

                        {proj.githubUrl && (
                          <div className="text-[11px] text-cyan-400 space-y-1 pt-2 border-t border-slate-800">
                            <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="block truncate hover:underline">
                              Code: {proj.githubUrl}
                            </a>
                            {proj.liveDemoUrl && (
                              <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="block truncate hover:underline text-emerald-400">
                                Live Demo: {proj.liveDemoUrl}
                              </a>
                            )}
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setProjStatus(proj.status);
                            setProjGithub(proj.githubUrl || '');
                            setProjLive(proj.liveDemoUrl || '');
                          }}
                          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold"
                        >
                          Update Project Links / Status
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: 📈 LEARNING PROGRESS */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Learning Progress & Milestones</h3>
                    <p className="text-xs text-slate-400">Detailed metric analytics of your academic trajectory.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-4 rounded-2xl bg-[#071328] border border-cyan-500/20">
                      <span className="text-xs text-slate-400 block mb-1">Overall Progress</span>
                      <span className="text-3xl font-extrabold text-cyan-400 font-display">{currentStudent.progressPercent}%</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#071328] border border-cyan-500/20">
                      <span className="text-xs text-slate-400 block mb-1">Modules Done</span>
                      <span className="text-3xl font-extrabold text-white font-display">
                        {currentStudent.lectures.filter(l => l.status === 'Completed').length} / {currentStudent.lectures.length}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#071328] border border-cyan-500/20">
                      <span className="text-xs text-slate-400 block mb-1">Assignments</span>
                      <span className="text-3xl font-extrabold text-emerald-400 font-display">
                        {currentStudent.assignments.filter(a => a.status === 'Checked' || a.status === 'Submitted').length} / {currentStudent.assignments.length}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#071328] border border-cyan-500/20">
                      <span className="text-xs text-slate-400 block mb-1">Projects Built</span>
                      <span className="text-3xl font-extrabold text-amber-400 font-display">
                        {currentStudent.projects.filter(p => p.status === 'Completed').length} / {currentStudent.projects.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: 🕐 ATTENDANCE */}
              {activeTab === 'attendance' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Attendance Summary & History</h3>
                    <p className="text-xs text-slate-400">Classroom physical check-in and Zoom online attendance logs.</p>
                  </div>

                  {/* Summary bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                      <span className="text-slate-400 block">Present</span>
                      <span className="text-xl font-bold text-emerald-400">{currentStudent.attendance.present} Days</span>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40">
                      <span className="text-slate-400 block">Absent</span>
                      <span className="text-xl font-bold text-rose-400">{currentStudent.attendance.absent} Days</span>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40">
                      <span className="text-slate-400 block">Leave</span>
                      <span className="text-xl font-bold text-amber-400">{currentStudent.attendance.leave} Days</span>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40">
                      <span className="text-slate-400 block">Late</span>
                      <span className="text-xl font-bold text-blue-400">{currentStudent.attendance.late} Days</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#08182f] border border-cyan-500/40 col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block">Percentage</span>
                      <span className="text-xl font-bold text-cyan-300 font-display">{currentStudent.attendance.percentage}%</span>
                    </div>
                  </div>

                  {/* History table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#030914] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Day</th>
                          <th className="p-3">Topic Covered</th>
                          <th className="p-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-[#061224]">
                        {currentStudent.attendance.history.map((h, i) => (
                          <tr key={i} className="hover:bg-[#08172e]">
                            <td className="p-3 font-mono text-white">{h.date}</td>
                            <td className="p-3 text-slate-300">{h.day}</td>
                            <td className="p-3 text-slate-200">{h.topic}</td>
                            <td className="p-3 text-right">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                h.status === 'Present'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : h.status === 'Absent'
                                  ? 'bg-rose-500/20 text-rose-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {h.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 9: 💰 FEES & INVOICES */}
              {activeTab === 'fees' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">Fees & Invoices</h3>
                      <p className="text-xs text-slate-400">View payment history or pay your remaining installment balance.</p>
                    </div>

                    {currentStudent.feeRecord.remainingAmount > 0 && (
                      <button
                        onClick={() => setPayingFeeModal(true)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-md"
                      >
                        Pay Remaining Fee
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-[#071328] border border-slate-800">
                      <span className="text-xs text-slate-400 block mb-1">Total Course Fee</span>
                      <span className="text-2xl font-bold text-white font-mono">
                        PKR {currentStudent.feeRecord.totalFee.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                      <span className="text-xs text-slate-400 block mb-1">Total Paid</span>
                      <span className="text-2xl font-bold text-emerald-400 font-mono">
                        PKR {currentStudent.feeRecord.paidAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                      <span className="text-xs text-slate-400 block mb-1">Remaining Balance</span>
                      <span className="text-2xl font-bold text-amber-400 font-mono">
                        PKR {currentStudent.feeRecord.remainingAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Payment history table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment Transactions</h4>
                    <div className="overflow-x-auto rounded-2xl border border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#030914] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                          <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Payment Method</th>
                            <th className="p-3">Transaction ID (TID)</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-[#061224]">
                          {currentStudent.feeRecord.history.map((tx) => (
                            <tr key={tx.id} className="hover:bg-[#08172e]">
                              <td className="p-3 text-white">{tx.date}</td>
                              <td className="p-3 font-bold text-emerald-400 font-mono">PKR {tx.amount.toLocaleString()}</td>
                              <td className="p-3 text-slate-300">{tx.method}</td>
                              <td className="p-3 font-mono text-cyan-300">{tx.tid}</td>
                              <td className="p-3 text-right">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 10: 🏆 CERTIFICATES */}
              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Official Certificates & Credentials</h3>
                    <p className="text-xs text-slate-400">Verifiable credentials issued by SkillAI Tech Institute Nankana.</p>
                  </div>

                  {currentStudent.certificates.length > 0 ? (
                    <div className="space-y-4">
                      {currentStudent.certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-6 rounded-3xl bg-gradient-to-r from-[#091f3a] via-[#051124] to-[#091f3a] border-2 border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 uppercase">
                              Official Credential
                            </span>
                            <h4 className="text-lg font-bold text-white font-display">{cert.title}</h4>
                            <p className="text-xs text-slate-300">
                              Issued to: <strong>{currentStudent.name}</strong> · Grade: <strong className="text-amber-300">{cert.grade}</strong>
                            </p>
                            <span className="text-xs font-mono text-cyan-300 block">Certificate ID: {cert.credentialId}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedCertificate({
                                title: cert.title,
                                studentName: currentStudent.name,
                                fatherName: currentStudent.fatherName,
                                credentialId: cert.credentialId,
                                issueDate: cert.issueDate,
                                grade: cert.grade
                              })}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Certificate</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 rounded-3xl bg-[#061426] border border-slate-800 text-center space-y-3">
                      <Award className="w-12 h-12 text-slate-500 mx-auto" />
                      <h4 className="text-base font-bold text-white">Course in Progress</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Your official certificate for "{currentStudent.enrolledCourse}" will be automatically issued upon completing all course modules and project capstones.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 11: 👤 STUDENT PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Student Profile Settings</h3>
                    <p className="text-xs text-slate-400">Update your academic information, WhatsApp contact, and city.</p>
                  </div>

                  <form onSubmit={handleProfileSave} className="p-6 rounded-3xl bg-[#071328] border border-cyan-500/20 space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={editProfileForm.name}
                          onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                          className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Father's Name *</label>
                        <input
                          type="text"
                          required
                          value={editProfileForm.fatherName}
                          onChange={(e) => setEditProfileForm({ ...editProfileForm, fatherName: e.target.value })}
                          className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={editProfileForm.whatsapp}
                          onChange={(e) => setEditProfileForm({ ...editProfileForm, whatsapp: e.target.value })}
                          className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={editProfileForm.email}
                          onChange={(e) => setEditProfileForm({ ...editProfileForm, email: e.target.value })}
                          className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">City / Location</label>
                        <input
                          type="text"
                          value={editProfileForm.city}
                          onChange={(e) => setEditProfileForm({ ...editProfileForm, city: e.target.value })}
                          className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Education Level</label>
                        <input
                          type="text"
                          value={editProfileForm.education}
                          onChange={(e) => setEditProfileForm({ ...editProfileForm, education: e.target.value })}
                          className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                      >
                        Save Profile Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 12: 🔔 NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Notifications & Alerts</h3>
                    <p className="text-xs text-slate-400">Class alerts, assignment results, and official notices.</p>
                  </div>

                  <div className="space-y-2">
                    {currentStudent.notifications.map((n) => (
                      <div key={n.id} className="p-4 rounded-2xl bg-[#071328] border border-slate-800 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300 mt-0.5">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white">{n.title}</h4>
                            <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 13: 💬 PORTAL AI SUPPORT & ASSISTANT */}
              {activeTab === 'support' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Portal AI Assistant & Support</h3>
                    <p className="text-xs text-slate-400">Ask real-time questions about your classes, attendance, assignments, and fees.</p>
                  </div>

                  <div className="h-[420px] bg-[#030914] border border-cyan-500/30 rounded-2xl flex flex-col overflow-hidden">
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                      {supportMessages.map((m, i) => (
                        <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                            m.sender === 'user'
                              ? 'bg-cyan-600 text-white rounded-tr-none'
                              : 'bg-[#071328] border border-cyan-500/20 text-slate-200 rounded-tl-none'
                          }`}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSupportSend} className="p-3 bg-[#071328] border-t border-slate-800 flex gap-2">
                      <input
                        type="text"
                        value={supportInput}
                        onChange={(e) => setSupportInput(e.target.value)}
                        placeholder="e.g. Meri next class kab hai? Meri attendance kitni hai?..."
                        className="flex-1 bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                      <button type="submit" className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 14: 📢 ANNOUNCEMENTS */}
              {activeTab === 'announcements' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Official Announcements</h3>
                    <p className="text-xs text-slate-400">Direct notifications from Sir Zeeshan Abdul Jabbar and SkillAI admin.</p>
                  </div>

                  <div className="space-y-3">
                    {currentStudent.announcements.map((ann) => (
                      <div key={ann.id} className="p-5 rounded-2xl bg-[#071328] border border-cyan-500/25 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-400 font-display">{ann.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                        <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-800">Posted by: {ann.author}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 15: 📥 RESOURCES */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Course Resources & Cheatsheets</h3>
                    <p className="text-xs text-slate-400">Official lecture notes, datasets, and n8n workflow presets.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStudent.resources.map((res) => (
                      <div key={res.id} className="p-4 rounded-2xl bg-[#071328] border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase">{res.category}</span>
                          <h4 className="text-xs font-bold text-white mt-0.5">{res.title}</h4>
                          {res.size && <span className="text-[10px] text-slate-400 font-mono">{res.size}</span>}
                        </div>
                        <button
                          onClick={() => alert(`Downloading ${res.title}...`)}
                          className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                        >
                          <FolderDown className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 16: 🎯 AI LEARNING PATH ROADMAP */}
              {activeTab === 'roadmap' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800">
                    <h3 className="text-xl font-bold font-display text-white">Recommended AI Engineering Roadmap</h3>
                    <p className="text-xs text-slate-400">The battle-tested pipeline to move from foundational logic to production AI agent deployments.</p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#071328] border border-cyan-500/25">
                    <div className="flex flex-col items-center space-y-3">
                      {[
                        { step: '01', title: 'Python Programming & Problem Solving', desc: 'Core logic, data structures, and script automation.' },
                        { step: '02', title: 'Prompt Engineering & System Prompting', desc: 'Few-shot prompts, temperature, structured JSON output.' },
                        { step: '03', title: 'APIs & Microservices', desc: 'OpenAI, Gemini, and Claude API SDK integration.' },
                        { step: '04', title: 'n8n & Webhook Automations', desc: 'Connecting Google Sheets, WhatsApp, CRM and email.' },
                        { step: '05', title: 'RAG & Vector Embeddings', desc: 'Private document retrieval, ChromaDB & Pinecone.' },
                        { step: '06', title: 'Agentic AI & Multi-Agent Frameworks', desc: 'LangGraph, CrewAI, Model Context Protocol (MCP).' },
                        { step: '07', title: 'Voice Agents & Telephony', desc: 'ElevenLabs, Bland AI, Twilio phone call bots.' },
                        { step: '08', title: 'Real-World Client Capstone', desc: 'Deploying client project to Docker & cloud.' },
                        { step: '09', title: 'Official Certificate & Freelance Launch', desc: 'Upwork/Fiverr profile launch & job placement.' }
                      ].map((item, i, arr) => (
                        <div key={item.step} className="flex flex-col items-center w-full max-w-md">
                          <div className="w-full p-3.5 rounded-2xl bg-[#030914] border border-cyan-500/30 text-center space-y-1">
                            <span className="text-[10px] font-mono font-bold text-amber-400">Step {item.step}</span>
                            <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                            <p className="text-[11px] text-slate-400">{item.desc}</p>
                          </div>
                          {i < arr.length - 1 && (
                            <div className="h-4 w-0.5 bg-cyan-400/50 my-1 animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 17: 👨💼 INSTRUCTOR / ADMIN PANEL MODE */}
              {activeTab === 'admin' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">Instructor & Admin Control Center</h3>
                      <p className="text-xs text-slate-400">Instructor: Zeeshan Abdul Jabbar · Manage all registered and website-enrolled students.</p>
                    </div>

                    {onOpenAdminDashboard && (
                      <button
                        onClick={onOpenAdminDashboard}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-extrabold text-xs shadow-[0_0_20px_rgba(251,191,36,0.35)] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                      >
                        <ShieldCheck className="w-4 h-4 text-slate-950" />
                        <span>Open Full Admin Dashboard</span>
                      </button>
                    )}
                  </div>

                  {/* Student Registry Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#030914] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="p-3">ID</th>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">WhatsApp</th>
                          <th className="p-3">Enrolled Course</th>
                          <th className="p-3">Progress</th>
                          <th className="p-3">Fee Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-[#061224]">
                        {allRegisteredStudents.map((s) => (
                          <tr key={s.studentId} className="hover:bg-[#08172e]">
                            <td className="p-3 font-mono font-bold text-cyan-300">{s.studentId}</td>
                            <td className="p-3 font-bold text-white">{s.name}</td>
                            <td className="p-3 text-slate-300 font-mono">{s.whatsapp}</td>
                            <td className="p-3 text-cyan-300">{s.enrolledCourse}</td>
                            <td className="p-3 font-mono">{s.progressPercent}%</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                s.feeStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                              }`}>
                                {s.feeStatus}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleQuickStudentSwitch(s.studentId)}
                                className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px]"
                              >
                                View Portal
                              </button>
                              <button
                                onClick={() => {
                                  portalStore.adminIssueCertificate(s.studentId, s.enrolledCourse, 'A+ (Distinction)');
                                  refreshStudentState();
                                  alert(`Certificate issued for ${s.name}!`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[11px]"
                              >
                                Issue Cert
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {/* Modal: Assignment Submission */}
        {submittingAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-4 text-left">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Assignment Submission</span>
                  <h4 className="text-base font-bold text-white">{submittingAssignment.title}</h4>
                </div>
                <button onClick={() => setSubmittingAssignment(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAssignmentSubmitConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">GitHub Repository Link *</label>
                  <input
                    type="url"
                    required
                    value={asgGithub}
                    onChange={(e) => setAsgGithub(e.target.value)}
                    placeholder="https://github.com/your-username/project-repo"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Live Project / Demo URL</label>
                  <input
                    type="url"
                    value={asgProjectLink}
                    onChange={(e) => setAsgProjectLink(e.target.value)}
                    placeholder="https://your-demo.vercel.app"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Student Notes & Comments</label>
                  <textarea
                    rows={2}
                    value={asgComments}
                    onChange={(e) => setAsgComments(e.target.value)}
                    placeholder="Describe how you tested the assignment or any special features..."
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmittingAssignment(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold"
                  >
                    Confirm Submission
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Project Edit */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-4 text-left">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Update Practical Project</span>
                  <h4 className="text-base font-bold text-white">{editingProject.title}</h4>
                </div>
                <button onClick={() => setEditingProject(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleProjectUpdateConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Project Status</label>
                  <select
                    value={projStatus}
                    onChange={(e) => setProjStatus(e.target.value as any)}
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Completed">Completed ✅</option>
                    <option value="In Progress">In Progress 🔄</option>
                    <option value="Not Started">Not Started ⏳</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">GitHub Repository Link</label>
                  <input
                    type="url"
                    value={projGithub}
                    onChange={(e) => setProjGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Live Demo URL</label>
                  <input
                    type="url"
                    value={projLive}
                    onChange={(e) => setProjLive(e.target.value)}
                    placeholder="https://demo.vercel.app"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Fee Payment */}
        {payingFeeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-4 text-left">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Fee Installment Payment</span>
                  <h4 className="text-base font-bold text-white">Pay Remaining Course Fee</h4>
                </div>
                <button onClick={() => setPayingFeeModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#030914] border border-slate-800 text-xs flex justify-between">
                <span>Total Remaining:</span>
                <span className="font-bold text-amber-300 font-mono">
                  PKR {currentStudent.feeRecord.remainingAmount.toLocaleString()}
                </span>
              </div>

              <form onSubmit={handleFeePaymentConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Payment Amount (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={feeAmount}
                    onChange={(e) => setFeeAmount(e.target.value)}
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Payment Method *</label>
                  <select
                    value={feeMethod}
                    onChange={(e) => setFeeMethod(e.target.value)}
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="JazzCash">JazzCash (0301-4870303)</option>
                    <option value="EasyPaisa">EasyPaisa (0301-4870303)</option>
                    <option value="Meezan Bank">Meezan Bank (0281-0105678942)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Transaction ID (TID) *</label>
                  <input
                    type="text"
                    required
                    value={feeTid}
                    onChange={(e) => setFeeTid(e.target.value)}
                    placeholder="e.g. TID-94810294"
                    className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setPayingFeeModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold">
                    Record Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Full Verifiable Certificate View */}
        {selectedCertificate && (
          <CertificateViewModal
            isOpen={true}
            onClose={() => setSelectedCertificate(null)}
            certificate={selectedCertificate}
          />
        )}
      </div>
    </div>
  );
}
