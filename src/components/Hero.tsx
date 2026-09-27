import { ArrowRight, Sparkles, Laptop, ShieldCheck, Cpu, Code2, Users2, Award } from 'lucide-react';
import TiltCard from './TiltCard';
import heroCyberImage from '../assets/images/ai_hero_cyber_1790511720803.jpg';

interface HeroProps {
  onOpenApplyModal: () => void;
  onExploreCourses: () => void;
}

export default function Hero({ onOpenApplyModal, onExploreCourses }: HeroProps) {
  const highlightPillars = [
    { label: 'Practical Training', icon: Code2 },
    { label: 'AI-Powered Learning', icon: Cpu },
    { label: 'Real-World Projects', icon: Laptop },
    { label: 'Expert Mentorship', icon: Users2 },
    { label: 'Online + Physical Classes', icon: ShieldCheck },
    { label: 'Certificate Provided', icon: Award }
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-32 right-10 w-[30rem] h-[30rem] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Institute Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>SKILLAI TECH INSTITUTE NANKANA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white font-display tracking-tight leading-[1.08]">
              Build Your Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.45)]">
                With AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl font-normal leading-relaxed">
              Practical AI, Automation, Web Development & Digital Skills Training for All Age Groups in Nankana Sahib.
            </p>

            {/* Call to action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCourses}
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold px-7 py-3.5 rounded-full shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:shadow-[0_0_35px_rgba(251,191,36,0.55)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenApplyModal}
                className="inline-flex items-center gap-2 bg-[#061226]/80 hover:bg-cyan-500/15 text-cyan-200 hover:text-white font-semibold px-7 py-3.5 rounded-full border border-cyan-500/40 hover:border-cyan-400 transition-all backdrop-blur-md shadow-lg"
              >
                <span>Apply Now</span>
              </button>
            </div>

            {/* Quick mini-trust indicator */}
            <div className="pt-3 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#030914] bg-cyan-600 flex items-center justify-center font-bold text-[10px] text-white">AR</div>
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#030914] bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">SK</div>
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#030914] bg-amber-600 flex items-center justify-center font-bold text-[10px] text-white">HA</div>
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#030914] bg-rose-600 flex items-center justify-center font-bold text-[10px] text-white">+500</div>
              </div>
              <p>Admissions Open for New Batch · Physical & Online</p>
            </div>
          </div>

          {/* Right Column: 3D Visual & Calligraphy */}
          <div className="lg:col-span-5 relative">
            <TiltCard maxTilt={10} className="relative z-10">
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-[#091b38] to-[#040d1c] p-2.5 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
                {/* 3D Cybernetic Head image */}
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#020713]">
                  <img
                    src={heroCyberImage}
                    alt="Futuristic 3D Cybernetic AI Profile"
                    className="w-full h-full object-cover object-center scale-[1.03] hover:scale-105 transition-transform duration-700"
                  />

                  {/* Glowing Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/90 via-transparent to-transparent" />

                  {/* 3D Holographic AI Badge top right */}
                  <div className="absolute top-4 right-4 bg-cyan-950/75 border border-cyan-400/60 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-200">AI CORE</span>
                  </div>

                  {/* Floating calligraphy badge matching user's image */}
                  <div className="absolute right-4 bottom-6 text-right select-none pointer-events-none">
                    <div className="font-handwriting text-amber-300 text-3xl sm:text-4xl drop-shadow-[0_2px_12px_rgba(245,158,11,0.6)] leading-none -rotate-6">
                      Learn <br />
                      <span className="text-amber-200 ml-3">Build</span> <br />
                      <span className="text-yellow-400 ml-6">Grow</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Glowing circular decorative rings behind */}
            <div className="absolute -top-10 -right-10 w-72 h-72 border border-cyan-500/20 rounded-full pointer-events-none animate-[spin_60s_linear_infinite]" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 border border-blue-500/20 rounded-full pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />
          </div>
        </div>

        {/* Highlight Pillars Row below hero matching original image */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {highlightPillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#071426]/70 border border-cyan-500/15 hover:border-cyan-400/40 hover:bg-[#0b1e38] transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors leading-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
