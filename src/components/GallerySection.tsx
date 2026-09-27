import labClassImage from '../assets/images/skillai_lab_class_1790511742402.jpg';
import workshopImage from '../assets/images/skillai_workshop_1790512507502.jpg';
import practicalImage from '../assets/images/skillai_practical_1790512526965.jpg';
import cyberHeroImage from '../assets/images/ai_hero_cyber_1790511720803.jpg';
import TiltCard from './TiltCard';

export default function GallerySection() {
  const galleryItems = [
    {
      title: 'Modern AI & Coding Lab',
      subtitle: 'Classroom & Student Workstations',
      image: labClassImage,
      category: 'Campus Facilities'
    },
    {
      title: 'Hands-on Practical Workshops',
      subtitle: 'Collaborative Coding & Certificate Awarding',
      image: workshopImage,
      category: 'Workshops & Events'
    },
    {
      title: 'Agentic Automation Workstation',
      subtitle: 'Dual-Monitor Development & n8n Workflows',
      image: practicalImage,
      category: 'Practical Sessions'
    },
    {
      title: 'Next-Gen AI Research & Innovation',
      subtitle: 'Neural Networks & Large Language Models',
      image: cyberHeroImage,
      category: 'Tech Stack'
    }
  ];

  return (
    <section id="gallery" className="py-20 relative bg-[#040e1f] overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              CAMPUS LIFE & CULTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
              SkillAI Learning Environment
            </h2>
            <p className="text-sm text-slate-300">
              Experience the energy, collaboration, and high-tech facilities that prepare our students for real-world impact.
            </p>
          </div>
        </div>

        {/* 4 Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleryItems.map((item, idx) => (
            <TiltCard key={idx} maxTilt={6}>
              <div className="group h-full rounded-2xl bg-[#061426] border border-cyan-500/20 hover:border-cyan-400/50 p-2.5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#020712] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020712]/90 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-medium backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-1 space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
