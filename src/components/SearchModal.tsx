import { useState, useMemo } from 'react';
import { Search, X, BookOpen, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { COURSES, STUDENT_PROJECTS, BLOG_POSTS } from '../data/instituteData';
import { Course } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectCourse
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return { courses: COURSES.slice(0, 3), projects: [], posts: [] };
    const q = query.toLowerCase();

    return {
      courses: COURSES.filter(
        c =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.level.toLowerCase().includes(q)
      ),
      projects: STUDENT_PROJECTS.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.techStack.some(t => t.toLowerCase().includes(q))
      ),
      posts: BLOG_POSTS.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      )
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#071328] border border-cyan-500/30 rounded-3xl p-6 text-slate-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Bar Input */}
        <div className="relative flex items-center pr-8 mb-6">
          <Search className="w-5 h-5 text-cyan-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, AI agents, projects, topics..."
            className="w-full bg-[#030914] border border-slate-700 focus:border-cyan-400 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto space-y-5 text-left pr-1">
          {/* Courses matches */}
          {results.courses.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Courses ({results.courses.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-[#040e1e] hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate max-w-md">
                        {course.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-300">
                        {course.duration}
                      </span>
                      <ArrowRight className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Projects matches */}
          {results.projects.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Student Projects ({results.projects.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-3 rounded-xl bg-[#040e1e] border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        by {project.studentName} · {project.course}
                      </p>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {project.techStack.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog matches */}
          {results.posts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Articles ({results.posts.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 rounded-xl bg-[#040e1e] border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {post.category} · {post.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.courses.length === 0 &&
            results.projects.length === 0 &&
            results.posts.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-xs">
                No results found for "{query}". Try searching for "AI", "Python", "Web", or "Agentic".
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
