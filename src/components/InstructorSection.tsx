import { GraduationCap, Cpu, Code2, Bot, MessageCircle, Sparkles } from 'lucide-react';
import founderImage from '../assets/images/founder_portrait_1790511761573.jpg';
import TiltCard from './TiltCard';
import { INSTITUTE_INFO } from '../data/instituteData';

export default function InstructorSection() {
  const credentials = [
    { label: 'MSc IT', icon: GraduationCap },
    { label: 'AI & ML Engineer', icon: Cpu },
    { label: 'AI Automation & Agent Developer', icon: Bot },
    { label: 'Full Stack Web Developer', icon: Code2 }
  ];

  return (
    <section id="founder" className="py-20 relative bg-[#030914] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TiltCard maxTilt={5}>
          <div className="rounded-3xl bg-gradient-to-r from-[#06152b] via-[#091f3d] to-[#06152b] border border-cyan-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left: Founder Portrait */}
              <div className="md:col-span-4 lg:col-span-3 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-cyan-400/40 p-1.5 bg-[#020713] shadow-[0_0_30px_rgba(6,182,212,0.3)] group">
                  <img
                    src={founderImage}
                    alt="Zeeshan Abdul Jabbar - Founder & Lead Instructor"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-cyan-500/30 text-center">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                      Lead Instructor
                    </span>
                  </div>
                </div>
              </div>

              {/* Center: Name & Credentials */}
              <div className="md:col-span-8 lg:col-span-5 space-y-4 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    MEET YOUR INSTRUCTOR
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display mt-1">
                    {INSTITUTE_INFO.founder.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-300/90 font-medium">
                    {INSTITUTE_INFO.founder.role}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {credentials.map((cred, idx) => {
                    const Icon = cred.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200"
                      >
                        <div className="w-6 h-6 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium">{cred.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <a
                    href={INSTITUTE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Talk Directly on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right: Quote & Calligraphy Signature */}
              <div className="md:col-span-12 lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-700/60 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                <blockquote className="text-sm sm:text-base text-slate-300 italic font-serif leading-relaxed text-left">
                  "{INSTITUTE_INFO.founder.quote}"
                </blockquote>

                <div className="mt-6 text-right">
                  <div className="font-handwriting text-cyan-300 text-2xl sm:text-3xl select-none tracking-wide -rotate-3">
                    Zeeshan Abdul Jabbar
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mt-0.5">
                    Signature
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
