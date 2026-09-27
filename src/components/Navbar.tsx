import { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { COURSES } from '../data/instituteData';

interface NavbarProps {
  onOpenApplyModal: () => void;
  onOpenSearchModal: () => void;
  onOpenStudentPortal: () => void;
  onOpenAdminDashboard?: () => void;
  onSelectCourse: (courseId: string) => void;
}

export default function Navbar({
  onOpenApplyModal,
  onOpenSearchModal,
  onOpenStudentPortal,
  onOpenAdminDashboard,
  onSelectCourse
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courseCategories = [
    { label: 'AI & Automation', count: '5 Courses' },
    { label: 'Development', count: '3 Courses' },
    { label: 'Data & Analytics', count: '2 Courses' },
    { label: 'Digital Skills', count: '3 Courses' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030914]/95 backdrop-blur-xl border-b border-cyan-500/20 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo matching reference image */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] transition-all">
              <div className="w-full h-full bg-[#030914] rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 text-xl font-display">
                  S
                </span>
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full blur-[2px] animate-pulse"></span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-extrabold tracking-tight text-xl text-white font-display">
                  SKILL<span className="text-cyan-400">AI</span>
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/80 font-semibold -mt-1">
                Tech Institute Nankana
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>

            {/* Courses Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <a
                href="#courses"
                className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
              >
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </a>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 rounded-2xl bg-[#071326]/95 border border-cyan-500/25 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                  <div className="px-3 py-2 text-[11px] font-semibold text-cyan-400 uppercase tracking-wider border-b border-slate-800">
                    Course Categories
                  </div>
                  <div className="mt-1 space-y-1">
                    {courseCategories.map((cat, i) => (
                      <a
                        key={i}
                        href="#courses"
                        onClick={() => setCoursesDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-cyan-500/10 text-slate-200 hover:text-cyan-300 transition-colors flex items-center justify-between group/item"
                      >
                        <span className="font-medium group-hover/item:translate-x-0.5 transition-transform">
                          {cat.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {cat.count}
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-800/80 mt-1">
                    <a
                      href="#courses"
                      onClick={() => setCoursesDropdownOpen(false)}
                      className="block text-center py-1.5 rounded-lg bg-cyan-950/60 text-cyan-300 hover:text-white text-[11px] font-semibold"
                    >
                      View All 13+ Courses →
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#fees" className="hover:text-cyan-400 transition-colors">Fees</a>
            <a href="#verify-cert" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verify</span>
            </a>
            <a href="#founder" className="hover:text-cyan-400 transition-colors">Founder</a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors">Blog</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          {/* Action Buttons Right */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSearchModal}
              aria-label="Search courses"
              className="p-2 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 border border-slate-700/60 hover:border-cyan-500/30 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Student Portal Trigger */}
            <button
              onClick={onOpenStudentPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-semibold transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Portal</span>
            </button>

            {/* Admin Control Center Trigger */}
            {onOpenAdminDashboard && (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-semibold transition-all"
                title="SkillAI Admin Control Center"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </button>
            )}

            {/* Apply Now Primary CTA */}
            <button
              onClick={onOpenApplyModal}
              className="relative group overflow-hidden bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:shadow-[0_0_30px_rgba(251,191,36,0.55)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-900" />
                Apply Now
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-1.5">
            <button
              onClick={onOpenStudentPortal}
              aria-label="Student Portal"
              className="p-2 rounded-lg text-cyan-300 border border-slate-800"
              title="Student LMS"
            >
              <UserCheck className="w-4 h-4" />
            </button>

            {onOpenAdminDashboard && (
              <button
                onClick={onOpenAdminDashboard}
                aria-label="Admin Control Center"
                className="p-2 rounded-lg text-amber-300 border border-amber-500/30 bg-amber-950/30"
                title="Admin Control Center"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-200 hover:text-cyan-400 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#050e1f] border-b border-cyan-500/20 px-4 pt-3 pb-6 mt-2 space-y-3 shadow-2xl text-left">
          <div className="flex flex-col space-y-1">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              About SkillAI
            </a>
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Courses (All Categories)
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Student Projects
            </a>
            <a
              href="#fees"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Fees & Payment Options
            </a>
            <a
              href="#verify-cert"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Verify Certificate
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Campus Gallery
            </a>
            <a
              href="#founder"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Meet Founder / Instructor
            </a>
            <a
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              AI Knowledge Hub Blog
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Contact Us
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentPortal();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Portal / LMS Login</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplyModal();
              }}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-sm py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Apply for Admission
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
