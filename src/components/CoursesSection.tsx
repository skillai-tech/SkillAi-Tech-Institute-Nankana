import { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Terminal, 
  Layers, 
  Smartphone, 
  BarChart3, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Share2,
  Video,
  Database,
  Brain,
  Cpu
} from 'lucide-react';
import { COURSES } from '../data/instituteData';
import { Course } from '../types';
import TiltCard from './TiltCard';

interface CoursesSectionProps {
  onSelectCourse: (course: Course) => void;
  onOpenApplyModalWithCourse: (courseTitle: string) => void;
}

export default function CoursesSection({
  onSelectCourse,
  onOpenApplyModalWithCourse
}: CoursesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'development' | 'data' | 'digital'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-cyan-400" />;
      case 'Mic':
        return <MessageSquare className="w-5 h-5 text-purple-400" />;
      case 'Terminal':
      case 'Code':
        return <Terminal className="w-5 h-5 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-300" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-indigo-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-pink-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-emerald-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-teal-400" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-rose-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-orange-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'development', label: 'Development' },
    { id: 'data', label: 'Data & Analytics' },
    { id: 'digital', label: 'Digital Skills' }
  ];

  const filteredCourses = COURSES.filter((course) => {
    if (activeCategory === 'all') return true;
    return course.category === activeCategory;
  });

  return (
    <section id="courses" className="py-20 relative overflow-hidden bg-[#040c1a]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              EXPLORE OUR PROGRAMS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
              SkillAI Courses Catalog
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Learn high-income, job-ready technology skills with 70% practical project-based training, local lab access, and live online batches.
            </p>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-[#07152b] text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <TiltCard key={course.id} maxTilt={6} className="h-full">
              <div className="group h-full rounded-3xl bg-gradient-to-b from-[#08182d] to-[#040e1e] border border-cyan-500/20 hover:border-cyan-400/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-[0_10px_35px_rgba(6,182,212,0.2)]">
                <div>
                  {/* Top Bar: Icon, Category & Popular Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#030914] border border-cyan-500/30 flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-cyan-400 transition-all">
                      {getIcon(course.iconName)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                        {course.categoryLabel}
                      </span>
                      {course.popular && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-semibold">
                          <TrendingUp className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-1.5">
                    {course.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Highlights / Skills Preview */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.skillsList.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#040e1e] border border-cyan-500/20 text-cyan-200 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skillsList.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md text-slate-400">
                        +{course.skillsList.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Meta & Action Footer */}
                <div className="pt-4 border-t border-slate-800 space-y-3.5">
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-right font-bold text-amber-300 font-mono">
                      {course.fee}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {course.level}
                    </div>
                    <div className="text-right text-[11px] text-cyan-300 font-medium">
                      {course.mode}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="flex-1 py-2 px-3 rounded-xl bg-cyan-950/50 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1 group/btn"
                    >
                      <span>View Course</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => onOpenApplyModalWithCourse(course.title)}
                      className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-bold shadow-md transition-all shrink-0"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
