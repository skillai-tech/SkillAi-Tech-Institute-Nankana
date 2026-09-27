import { X, Clock, Award, CheckCircle2, BookOpen, Sparkles, ArrowRight, MessageCircle, Wrench } from 'lucide-react';
import { Course } from '../types';
import { INSTITUTE_INFO } from '../data/instituteData';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (courseTitle: string) => void;
}

export default function CourseModal({ course, onClose, onEnroll }: CourseModalProps) {
  if (!course) return null;

  const whatsappInquiryUrl = `https://wa.me/923014870303?text=${encodeURIComponent(
    `Assalam o Alaikum SkillAI Institute, I want more details about the "${course.title}" course (Fees, Timings, Syllabus).`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#071328] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{course.categoryLabel} · Verified Curriculum</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-cyan-300 font-medium">
            {course.tagline}
          </p>
        </div>

        {/* Quick Meta Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#030914] border border-cyan-500/15 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Duration</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {course.duration}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Learning Level</span>
            <span className="font-semibold text-cyan-300">
              {course.level}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Mode of Study</span>
            <span className="font-semibold text-white">
              {course.mode}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Fee</span>
            <span className="font-bold text-amber-400">
              {course.fee}
            </span>
          </div>
        </div>

        {/* Theory vs Practical Ratio Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-[#050f20] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Curriculum Delivery Ratio:</span>
            <span className="text-cyan-400">
              {course.theoryPercentage}% Theory · {course.practicalPercentage}% Practical Hands-on
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
            <div
              className="bg-slate-600 h-full"
              style={{ width: `${course.theoryPercentage}%` }}
              title="Theory"
            />
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
              style={{ width: `${course.practicalPercentage}%` }}
              title="Practical Projects"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Course Overview</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* What You Will Learn (Skills List) */}
        <div className="mt-6 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What You Will Learn</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {course.skillsList.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/25 text-cyan-200 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Real Projects You Build */}
        {course.realProjects && course.realProjects.length > 0 && (
          <div className="mt-6 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Real Projects Built During this Course</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.realProjects.map((proj, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#030914] border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Syllabus Timeline */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curriculum Breakdown by Module</span>
          </h4>

          <div className="space-y-2.5">
            {course.syllabus.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#040e1e] border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400">{item.week}</span>
                  <span className="font-semibold text-slate-200">{item.title}</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
                  {item.topics.map((topic, tIdx) => (
                    <li key={tIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites & Certification */}
        <div className="mt-6 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <strong className="text-cyan-400">Prerequisites:</strong>
            <span>{course.prerequisites}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong className="text-white">Certification:</strong> {course.certification}</span>
          </div>
        </div>

        {/* Action Buttons matching user prompt: [Apply Now] [Talk on WhatsApp] */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Talk on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onEnroll(course.title);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
