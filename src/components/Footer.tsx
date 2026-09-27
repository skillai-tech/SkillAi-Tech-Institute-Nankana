import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ArrowUp, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  Navigation,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface FooterProps {
  onOpenApplyModal: () => void;
  onOpenStudentPortal: () => void;
  onOpenAdminDashboard?: () => void;
  onSelectCourse: (courseId: string) => void;
}

export default function Footer({
  onOpenApplyModal,
  onOpenStudentPortal,
  onOpenAdminDashboard,
  onSelectCourse
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#020611] border-t border-cyan-500/20 pt-16 pb-12 relative text-slate-300 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-[#030914] rounded-[10px] flex items-center justify-center font-display font-extrabold text-cyan-400 text-xl">
                  S
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-display">
                  SKILL<span className="text-cyan-400">AI</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-cyan-300 font-semibold -mt-1">
                  Tech Institute Nankana
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium tracking-wide">
              {INSTITUTE_INFO.tagline}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering youth, students, and professionals in Nankana Sahib with hands-on AI engineering, agentic automation, modern programming, and global freelancing capabilities.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={INSTITUTE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-cyan-400 transition-colors">Courses Catalog</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Student Portfolio</a>
              </li>
              <li>
                <a href="#fees" className="hover:text-cyan-400 transition-colors">Fees & Payments</a>
              </li>
              <li>
                <a href="#verify-cert" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verify Certificate</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenStudentPortal}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-left"
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Student Portal (LMS)</span>
                </button>
              </li>
              {onOpenAdminDashboard && (
                <li>
                  <button
                    onClick={onOpenAdminDashboard}
                    className="hover:text-amber-400 text-amber-300/90 transition-colors flex items-center gap-1 text-left font-semibold"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Control Center</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Course Specializations */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Key Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCourse('agentic-ai-automation')} className="hover:text-cyan-400 transition-colors text-left">
                  Agentic AI & Automation
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCourse('ai-chatbot-voice')} className="hover:text-cyan-400 transition-colors text-left">
                  AI Chatbots & Voice Bots
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCourse('fullstack-web')} className="hover:text-cyan-400 transition-colors text-left">
                  Full Stack MERN Web
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCourse('python-programming')} className="hover:text-cyan-400 transition-colors text-left">
                  Python Programming
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCourse('data-analytics')} className="hover:text-cyan-400 transition-colors text-left">
                  Power BI Data Analytics
                </button>
              </li>
              <li>
                <a href="#courses" className="text-cyan-400 font-semibold hover:underline">
                  All 13+ Courses →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Action Buttons */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Visit SkillAI
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{INSTITUTE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${INSTITUTE_INFO.phone}`} className="hover:text-cyan-400 transition-colors font-mono">
                  {INSTITUTE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${INSTITUTE_INFO.email}`} className="hover:text-cyan-400 transition-colors truncate">
                  {INSTITUTE_INFO.email}
                </a>
              </div>
            </div>

            {/* WhatsApp Us, Call Now, Get Directions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={INSTITUTE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${INSTITUTE_INFO.phone}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#051124] hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              <a
                href={INSTITUTE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#051124] hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SkillAI Tech Institute Nankana. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500/30 transition-all ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
