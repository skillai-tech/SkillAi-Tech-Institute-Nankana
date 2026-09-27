import { useState } from 'react';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { REVIEWS } from '../data/instituteData';
import TiltCard from './TiltCard';

export default function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);

  const displayReviews = showAll ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <section className="py-20 relative bg-[#040e1f] overflow-hidden border-t border-slate-900">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching original image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              STUDENT REVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
              What Our Students Say
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Real feedback from students who transformed their technical careers with us.
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span>{showAll ? 'Show Top Reviews' : 'View All Reviews'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Review Cards Grid matching original reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <TiltCard key={review.id} maxTilt={6}>
              <div className="h-full rounded-2xl bg-gradient-to-b from-[#07172c] to-[#040e1e] border border-cyan-500/20 hover:border-cyan-400/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]">
                <div className="space-y-4">
                  {/* Star Rating & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-cyan-500/30 group-hover:text-cyan-400/60 transition-colors" />
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                {/* Student Info Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${review.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {review.studentName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {review.studentName}
                    </h4>
                    <p className="text-[11px] text-cyan-400/80 font-mono">
                      {review.course}
                    </p>
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
