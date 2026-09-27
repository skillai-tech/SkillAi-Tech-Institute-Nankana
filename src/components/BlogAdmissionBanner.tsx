import { useState } from 'react';
import { ArrowRight, Calendar, BookOpen, Sparkles, X, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/instituteData';
import { BlogPost } from '../types';
import gradCapImage from '../assets/images/admission_grad_cap_1790511778726.jpg';
import TiltCard from './TiltCard';

interface BlogAdmissionBannerProps {
  onOpenApplyModal: () => void;
}

export default function BlogAdmissionBanner({ onOpenApplyModal }: BlogAdmissionBannerProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 relative bg-[#030914] overflow-hidden border-t border-slate-900">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: AI Knowledge Hub / Latest from Our Blog */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                AI KNOWLEDGE HUB
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                Latest from Our Blog
              </h2>
            </div>

            {/* 4 Blog Cards Grid matching original image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer group rounded-2xl bg-gradient-to-b from-[#07172c] to-[#040e1e] border border-cyan-500/20 hover:border-cyan-400/50 p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  <div>
                    {/* Glowing Tech Thumbnail */}
                    <div className="relative h-28 rounded-xl overflow-hidden bg-[#020713] border border-cyan-500/25 mb-3 flex items-center justify-center p-2 group-hover:border-cyan-400 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/60 to-blue-950/40" />
                      <div className="relative text-center">
                        <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-1 group-hover:scale-110 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {post.date}
                    </span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Read <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Glowing Admission Banner with 3D Mortarboard Cap */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <TiltCard maxTilt={5} className="h-full">
              <div className="h-full rounded-3xl bg-gradient-to-br from-[#0a1e3d] via-[#051124] to-[#0a1e3d] border-2 border-amber-400/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(245,158,11,0.2)] relative overflow-hidden group">
                {/* 3D Cap Background Graphic */}
                <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-amber-400/20">
                  <img
                    src={gradCapImage}
                    alt="3D Graduation Mortarboard Cap"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-transparent to-transparent" />
                </div>

                <div className="space-y-4 text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    START YOUR JOURNEY
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Apply for Admission
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Fill the form and our team will contact you shortly to guide you through the admission process, batch schedules, and fee concessions.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={onOpenApplyModal}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-extrabold text-sm py-3.5 px-6 rounded-full shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#071328] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                <span>{selectedPost.category}</span>
                <span>·</span>
                <span>{selectedPost.date}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h3 className="text-2xl font-bold font-display text-white">
                {selectedPost.title}
              </h3>

              <div className="space-y-3 pt-2 text-sm text-slate-300 leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Written by SkillAI Academic Team</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
