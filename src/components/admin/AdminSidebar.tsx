import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  FileCheck2,
  Video,
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
  Settings
} from 'lucide-react';
import { AdminRole } from '../../types';

export type AdminTab = 
  | 'dashboard'
  | 'students'
  | 'courses'
  | 'instructors'
  | 'schedule'
  | 'attendance'
  | 'assignments'
  | 'lectures'
  | 'fees'
  | 'certificates'
  | 'progress'
  | 'admissions'
  | 'announcements'
  | 'website'
  | 'ai-assistant'
  | 'reports'
  | 'notifications'
  | 'automation'
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  activeRole: AdminRole;
  studentCount: number;
  newAppsCount: number;
  pendingFeeCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  activeRole,
  studentCount,
  newAppsCount,
  pendingFeeCount
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users, badge: String(studentCount) },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'instructors', label: 'Instructors', icon: GraduationCap },
    { id: 'schedule', label: 'Classes & Schedule', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'assignments', label: 'Assignments', icon: FileCheck2 },
    { id: 'lectures', label: 'Lectures & Resources', icon: Video },
    { id: 'fees', label: 'Fees & Payments', icon: CreditCard, badge: pendingFeeCount > 0 ? `${pendingFeeCount} Due` : undefined, badgeColor: 'bg-rose-500/20 text-rose-300' },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'progress', label: 'Student Progress', icon: TrendingUp },
    { id: 'admissions', label: 'Admissions & Inquiries', icon: Inbox, badge: newAppsCount > 0 ? `${newAppsCount} New` : undefined, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'website', label: 'Website Content', icon: Globe },
    { id: 'ai-assistant', label: 'AI Assistant & KB', icon: Bot },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'automation', label: 'n8n & Automations', icon: Cpu, badge: 'Live' },
    { id: 'settings', label: 'Institute Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#030814] border-r border-slate-800/80 flex flex-col shrink-0 overflow-y-auto">
      {/* Current Admin User Badge */}
      <div className="p-3.5 border-b border-slate-800/80 bg-gradient-to-b from-[#06142c] to-[#030914]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-[2px]">
            <div className="w-full h-full bg-[#030914] rounded-[10px] flex items-center justify-center font-bold text-amber-300 text-xs">
              ZA
            </div>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">Zeeshan Abdul Jabbar</h4>
            <span className="text-[10px] text-amber-400 capitalize font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {activeRole.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="p-2 space-y-0.5 text-xs font-medium flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as AdminTab)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono shrink-0 ${
                  isActive
                    ? 'bg-black/30 text-white'
                    : item.badgeColor || 'bg-slate-900 text-cyan-300 border border-cyan-500/20'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
