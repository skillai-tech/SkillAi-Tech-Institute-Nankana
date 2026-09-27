import { useState } from 'react';
import { Target, Compass, ArrowRight, Sparkles, X, CheckCircle, Users, BookOpen, GraduationCap, Award } from 'lucide-react';
import labClassImage from '../assets/images/skillai_lab_class_1790511742402.jpg';
import TiltCard from './TiltCard';
import { INSTITUTE_STATS } from '../data/instituteData';

interface AboutSectionProps {
  onOpenApplyModal: () => void;
}

export default function AboutSection({ onOpenApplyModal }: AboutSectionProps) {
  const [knowMoreModal, setKnowMoreModal] = useState(false);

  return (
    <section id="about" className="py-20 relative bg-[#040e1f] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* About Main Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left: Institute Lab Photo */}
          <div className="lg:col-span-6">
            <TiltCard maxTilt={6}>
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/25 bg-[#08152b] p-2 shadow-2xl group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={labClassImage}
                    alt="SkillAI Modern Computer Lab Classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle brand overlay watermark */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/90 via-transparent to-transparent" />
                  
                  {/* Overlay badge matching image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#030a17]/90 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Physical & Online Campus
                      </div>
                      <div className="text-[11px] text-slate-400">
                        YOTD Housing Colony, Nankana Sahib
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-cyan-400">
                      Air-Conditioned Lab
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right: Mission & Vision */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              ABOUT SKILLAI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display leading-tight">
              Empowering Learners <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                for a Smarter Tomorrow
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              SkillAI Tech Institute Nankana is a modern technology training institute focused on Artificial Intelligence, automation, programming and digital skills. We provide practical, hands-on training with real-world projects to help students build a brighter future.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#07172c] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 text-amber-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Our Mission</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Provide future-ready tech skills to every student.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#07172c] border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Our Vision</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To strengthen Pakistan's AI and tech learning ecosystem.
                </p>
              </div>
            </div>

            {/* Know More Button */}
            <div className="pt-2">
              <button
                onClick={() => setKnowMoreModal(true)}
                className="inline-flex items-center gap-2 bg-[#061426] hover:bg-cyan-500/20 text-cyan-300 hover:text-white font-semibold text-sm px-6 py-3 rounded-full border border-cyan-500/40 transition-all shadow-md group"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Key Stats Counter Bar matching reference */}
        <div className="rounded-3xl bg-gradient-to-r from-[#06162d] via-[#081e3d] to-[#06162d] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {INSTITUTE_STATS.map((stat, idx) => {
              const getStatIcon = () => {
                switch (stat.icon) {
                  case 'Users':
                    return <Users className="w-5 h-5 text-cyan-400" />;
                  case 'BookOpen':
                    return <BookOpen className="w-5 h-5 text-blue-400" />;
                  case 'GraduationCap':
                    return <GraduationCap className="w-5 h-5 text-amber-400" />;
                  default:
                    return <Award className="w-5 h-5 text-emerald-400" />;
                }
              };

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 ${
                    idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-8' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    {getStatIcon()}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display flex items-baseline">
                      <span>{stat.value}</span>
                      <span className="text-cyan-400">{stat.suffix}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Know More Modal */}
      {knowMoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#08152b] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setKnowMoreModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage & Facilities</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                About SkillAI Tech Institute Nankana
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Founded with a mission to bring world-class technological education to Nankana Sahib, SkillAI is pioneering practical artificial intelligence, agentic automation, web development, and digital literacy.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-white">Campus Highlights:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>High-Speed Fiber Optic Internet & Generator Backup</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Modern Dual-Display Student Workstations</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>1-on-1 Code Review & Mentorship Sessions</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030914] border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Freelance Profile Launch & Earnings Mentorship</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setKnowMoreModal(false)}
                  className="px-5 py-2 rounded-xl border border-slate-700 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setKnowMoreModal(false);
                    onOpenApplyModal();
                  }}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-sm"
                >
                  Join Us Today
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
