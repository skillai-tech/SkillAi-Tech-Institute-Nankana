import React from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  FileCheck2, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { PortalStudent } from '../../types';
import { AdminTab } from './AdminSidebar';

interface AdminDashboardOverviewProps {
  students: PortalStudent[];
  totalStudentsCount: number;
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddStudent: () => void;
  onOpenMarkAttendance: () => void;
  onOpenRecordFee: () => void;
  onSelectStudentDetail: (student: PortalStudent) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  students,
  totalStudentsCount,
  onNavigateTab,
  onOpenAddStudent,
  onOpenMarkAttendance,
  onOpenRecordFee,
  onSelectStudentDetail
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#071d3d] via-[#05142a] to-[#0a1e38] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Executive Institute Control Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Welcome to SkillAI Admin 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Real-time control over students, admissions pipeline, physical/online class schedules, automated fee ledgers, and n8n webhooks.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAddStudent}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-md hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>
          <button
            onClick={onOpenMarkAttendance}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={onOpenRecordFee}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Record Fee</span>
          </button>
        </div>
      </div>

      {/* 8 Summary Cards matching user specification */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total Students */}
        <div 
          onClick={() => onNavigateTab('students')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {totalStudentsCount || 528}
          </div>
          <span className="text-[11px] text-cyan-300 flex items-center gap-1 mt-1">
            <span className="text-emerald-400 font-bold">+18 this month</span> · Active
          </span>
        </div>

        {/* Active Courses */}
        <div 
          onClick={() => onNavigateTab('courses')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Active Courses</span>
            <BookOpen className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            12
          </div>
          <span className="text-[11px] text-blue-300 flex items-center gap-1 mt-1">
            AI, Full Stack, Python & Data
          </span>
        </div>

        {/* Today's Attendance */}
        <div 
          onClick={() => onNavigateTab('attendance')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Today's Attendance</span>
            <Clock className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            92%
          </div>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
            🟢 46 Present · 🔴 4 Absent
          </span>
        </div>

        {/* Total Fees Collected */}
        <div 
          onClick={() => onNavigateTab('fees')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Fees Collected</span>
            <CreditCard className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
            PKR 610,000
          </div>
          <span className="text-[11px] text-amber-300/80 flex items-center gap-1 mt-1">
            Of Total PKR 750,000
          </span>
        </div>

        {/* Pending Fees */}
        <div 
          onClick={() => onNavigateTab('fees')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-rose-500/25 hover:border-rose-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Pending Fees</span>
            <AlertCircle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-display">
            PKR 140,000
          </div>
          <span className="text-[11px] text-rose-300 flex items-center gap-1 mt-1">
            Installments due this week
          </span>
        </div>

        {/* Today's Classes */}
        <div 
          onClick={() => onNavigateTab('schedule')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Today's Classes</span>
            <Calendar className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            03 Sessions
          </div>
          <span className="text-[11px] text-indigo-300 flex items-center gap-1 mt-1">
            Lab 1, Lab 2 & Live Zoom
          </span>
        </div>

        {/* Instructors */}
        <div 
          onClick={() => onNavigateTab('instructors')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Instructors</span>
            <GraduationCap className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            03 Faculty
          </div>
          <span className="text-[11px] text-sky-300 flex items-center gap-1 mt-1">
            Lead: Zeeshan Abdul Jabbar
          </span>
        </div>

        {/* Pending Assignments */}
        <div 
          onClick={() => onNavigateTab('assignments')}
          className="p-4 rounded-2xl bg-gradient-to-b from-[#08182f] to-[#040e1e] border border-cyan-500/25 hover:border-cyan-400/50 shadow-lg cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Pending Submissions</span>
            <FileCheck2 className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-display">
            04 To Review
          </div>
          <span className="text-[11px] text-purple-300 flex items-center gap-1 mt-1">
            Ready for grading & feedback
          </span>
        </div>
      </div>

      {/* Middle Grid: Enrollment Chart Simulation & Live Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Chart Card */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Student Enrollment & Attendance Trends (2026)
              </h3>
              <p className="text-[11px] text-slate-400">Monthly admissions growth across AI and Web batches</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-mono">
              +38% vs Last Qtr
            </span>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="space-y-3 pt-2">
            {[
              { month: 'Apr 2026', students: 340, percent: 64, color: 'from-blue-600 to-cyan-500' },
              { month: 'May 2026', students: 390, percent: 74, color: 'from-blue-600 to-cyan-500' },
              { month: 'Jun 2026', students: 430, percent: 81, color: 'from-blue-600 to-cyan-500' },
              { month: 'Jul 2026', students: 470, percent: 89, color: 'from-blue-600 to-cyan-500' },
              { month: 'Aug 2026', students: 505, percent: 95, color: 'from-cyan-500 to-sky-400' },
              { month: 'Sep 2026 (Current)', students: 528, percent: 100, color: 'from-amber-400 to-yellow-400' },
            ].map((bar, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{bar.month}</span>
                  <span className="text-cyan-300 font-mono font-bold">{bar.students} Students</span>
                </div>
                <div className="w-full bg-[#030814] h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${bar.color} transition-all duration-500`}
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & n8n Live Integrations Status */}
        <div className="p-5 rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Automated Workflows
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#030914] border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">Google Sheets Sync</span>
                <span className="text-[10px] text-emerald-400 font-mono">Connected ✓</span>
              </div>
              <p className="text-[11px] text-slate-400">All online admissions append to sheet instantaneously.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#030914] border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">WhatsApp Confirmation</span>
                <span className="text-[10px] text-emerald-400 font-mono">Active ✓</span>
              </div>
              <p className="text-[11px] text-slate-400">Welcome message with LMS login credentials queued.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#030914] border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">LMS Auto-Provisioning</span>
                <span className="text-[10px] text-emerald-400 font-mono">Active ✓</span>
              </div>
              <p className="text-[11px] text-slate-400">Automatic generation of Student Roll No & Lectures.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('automation')}
            className="w-full py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View n8n Webhook Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Students Table matching user prompt */}
      <div className="p-5 rounded-2xl bg-[#061226] border border-cyan-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Recent Students (LMS Registered)
            </h3>
            <p className="text-[11px] text-slate-400">Live roster from student LMS database with instant action controls</p>
          </div>
          <button
            onClick={() => onNavigateTab('students')}
            className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline self-start sm:self-auto"
          >
            View All {students.length} Students →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Student ID</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Enrolled Course</th>
                <th className="py-2.5 px-3">Attendance</th>
                <th className="py-2.5 px-3">Progress</th>
                <th className="py-2.5 px-3">Fee Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {students.slice(0, 6).map((student) => (
                <tr key={student.studentId} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-3 px-3 font-mono text-cyan-300 font-semibold">
                    {student.studentId}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{student.name}</div>
                    <div className="text-[10px] text-slate-400">{student.whatsapp} · {student.city}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-200">
                    <span className="font-medium">{student.enrolledCourse}</span>
                    <span className="block text-[10px] text-slate-400">
                      {student.enrolledCourses[0]?.timing || 'Evening'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono font-bold ${
                      student.attendancePercent >= 90 ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {student.attendancePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#030914] h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-cyan-400 h-full rounded-full"
                          style={{ width: `${student.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-slate-300">{student.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      student.feeStatus === 'Paid'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectStudentDetail(student)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      title="Inspect student scorecard"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Scorecard</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
