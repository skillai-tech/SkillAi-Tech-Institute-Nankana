import { useState } from 'react';
import { ArrowRight, Sparkles, Brain, Cpu, Briefcase, CheckCircle2 } from 'lucide-react';
import { LEARNING_PATHWAYS } from '../data/instituteData';
import { LearningPathway } from '../types';
import TiltCard from './TiltCard';

interface PathwaysSectionProps {
  onOpenApplyModal: () => void;
  onExploreCourses: () => void;
}

export default function PathwaysSection({
  onOpenApplyModal,
  onExploreCourses
}: PathwaysSectionProps) {
  const [activePathway, setActivePathway] = useState<LearningPathway | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="pathways" className="py-20 relative bg-[#040c1a] overflow-hidden border-t border-slate-900">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Button */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              LEARNING PATHWAYS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display leading-tight">
              Choose Your Learning Path
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you're a student, professional or just curious — we have the right path for you.
            </p>

            <div className="pt-2">
              <button
                onClick={onExploreCourses}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore All Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Pathways Cards matching reference */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LEARNING_PATHWAYS.map((pathway) => (
              <TiltCard key={pathway.id} maxTilt={6}>
                <div
                  onClick={() => setActivePathway(pathway)}
                  className={`cursor-pointer h-full rounded-2xl bg-gradient-to-br ${pathway.gradient} bg-[#061426] border ${pathway.borderColor} p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#030914] border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getIcon(pathway.icon)}
                      </div>
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300">
                        {pathway.duration}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {pathway.title} ({pathway.grade})
                      </div>
                      <h3 className={`text-lg font-bold font-display mt-0.5 ${pathway.textColor}`}>
                        {pathway.subtitle}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pathway.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">View Curriculum</span>
                    <div className={`text-xs font-bold flex items-center gap-1 ${pathway.textColor} group-hover:translate-x-1 transition-transform`}>
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Pathway Detail Drawer/Modal */}
      {activePathway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400">{activePathway.title} · {activePathway.grade}</span>
                <h3 className={`text-xl font-bold font-display ${activePathway.textColor}`}>
                  {activePathway.subtitle}
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300">
                {activePathway.duration}
              </span>
            </div>

            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              {activePathway.description}
            </p>

            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                What Students Learn in this Path:
              </span>
              <ul className="space-y-2 pt-1">
                {activePathway.keySkills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setActivePathway(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActivePathway(null);
                  onOpenApplyModal();
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs shadow-md"
              >
                Enroll in this Pathway
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
