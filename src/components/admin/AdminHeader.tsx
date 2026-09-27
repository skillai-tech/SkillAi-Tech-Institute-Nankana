import React from 'react';
import { Search, Bell, Shield, User, ExternalLink, X, RefreshCw } from 'lucide-react';
import { AdminRole } from '../../types';

interface AdminHeaderProps {
  activeRole: AdminRole;
  onRoleChange: (role: AdminRole) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onClose: () => void;
  onOpenStudentPortal: () => void;
  unreadCount?: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeRole,
  onRoleChange,
  searchQuery,
  onSearchChange,
  onClose,
  onOpenStudentPortal,
  unreadCount = 4
}) => {
  return (
    <header className="px-4 py-3 bg-[#030914] border-b border-cyan-500/25 flex items-center justify-between shrink-0 text-slate-100">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <div className="w-full h-full bg-[#030914] rounded-[10px] flex items-center justify-center font-display font-extrabold text-cyan-400 text-lg">
            S
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm sm:text-base font-display tracking-wide">
              SKILL<span className="text-cyan-400">AI</span> ADMIN
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              CONTROL CENTER v2.8
            </span>
          </div>
          <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
            Institute Management & Automation Engine · Nankana Sahib
          </p>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students, courses, fees..."
            className="w-full bg-[#071328] border border-slate-700/80 focus:border-cyan-400 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Selector Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#071328] border border-cyan-500/30 text-xs">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as AdminRole)}
            className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none cursor-pointer"
            title="Switch admin role view"
          >
            <option value="super-admin" className="bg-[#071328] text-white">Super Admin (All Access)</option>
            <option value="admin" className="bg-[#071328] text-white">Admin (Core Ops)</option>
            <option value="instructor" className="bg-[#071328] text-white">Instructor (Classes & Grades)</option>
            <option value="accountant" className="bg-[#071328] text-white">Accountant (Fees & Ledger)</option>
            <option value="admission-officer" className="bg-[#071328] text-white">Admission Officer</option>
          </select>
        </div>

        {/* View Student LMS */}
        <button
          onClick={onOpenStudentPortal}
          className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          title="Open Student Portal"
        >
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          <span>Student LMS</span>
        </button>

        {/* Close Admin Dashboard */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1"
          title="Exit Admin Panel"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </header>
  );
};
