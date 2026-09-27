import { 
  ArrowRight, 
  Wrench, 
  Cpu, 
  Smile, 
  MonitorPlay, 
  FileVideo, 
  Compass, 
  CheckCircle 
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/instituteData';
import TiltCard from './TiltCard';

interface WhyChooseSectionProps {
  onLearnMore: () => void;
}

export default function WhyChooseSection({ onLearnMore }: WhyChooseSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-emerald-400" />;
      case 'MonitorPlay':
        return <MonitorPlay className="w-5 h-5 text-blue-400" />;
      case 'FileVideo':
        return <FileVideo className="w-5 h-5 text-purple-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-rose-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#030914] border-t border-slate-900">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Mission */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              WHY CHOOSE SKILLAI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display leading-tight">
              Your Success is Our Mission
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At SkillAI, we don't just teach technology — we build future-ready professionals. Our hands-on approach, expert guidance and modern curriculum help you gain real skills for a better tomorrow.
            </p>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 6 Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {WHY_CHOOSE_ITEMS.map((item, index) => (
              <TiltCard key={index} maxTilt={8}>
                <div className="h-full rounded-2xl bg-gradient-to-b from-[#071529] to-[#040e1e] border border-cyan-500/20 hover:border-cyan-400/50 p-5 flex flex-col items-start gap-3 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]">
                  <div className="w-10 h-10 rounded-xl bg-[#020712] border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
