import { useState } from 'react';
import { 
  Bot, 
  Mic, 
  Globe, 
  BarChart, 
  GitFork, 
  ArrowRight, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Play, 
  Send 
} from 'lucide-react';
import { STUDENT_PROJECTS } from '../data/instituteData';
import { StudentProject } from '../types';
import TiltCard from './TiltCard';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'web' | 'data' | 'automation'>('all');
  
  // Interactive mini simulator state for modal
  const [simChatInput, setSimChatInput] = useState('');
  const [simMessages, setSimMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Assalam o Alaikum! Welcome to SkillAI. How can I assist you with course registration today?' }
  ]);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  const handleSimSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simChatInput.trim()) return;
    const userText = simChatInput;
    setSimMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setSimChatInput('');

    setTimeout(() => {
      setSimMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Thank you for your question about "${userText}". Our next batch starts on the 1st of the month with both physical and online batches available!`
        }
      ]);
    }, 600);
  };

  const getVisual = (project: StudentProject) => {
    switch (project.demoType) {
      case 'chatbot':
        return (
          <div className="w-full h-32 rounded-xl bg-[#030914] border border-cyan-500/20 p-2.5 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <span className="text-[10px] font-mono text-cyan-400">SkillAI Agent v2</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-1.5 my-1">
              <div className="bg-slate-800/80 rounded-md p-1.5 text-[10px] text-slate-300 w-4/5">
                Can I learn AI without coding?
              </div>
              <div className="bg-cyan-950/80 border border-cyan-500/30 rounded-md p-1.5 text-[10px] text-cyan-200 w-5/6 ml-auto">
                Yes! We start with foundational logic & visual tools.
              </div>
            </div>
            <div className="h-4 rounded bg-slate-800/60 flex items-center px-1.5 text-[8px] text-slate-500">
              Type your message...
            </div>
          </div>
        );

      case 'voice':
        return (
          <div className="w-full h-32 rounded-xl bg-[#030a17] border border-indigo-500/20 p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 mb-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            {/* Audio wave visualization bars */}
            <div className="flex items-center gap-1 h-6">
              {[40, 70, 95, 60, 85, 45, 100, 75, 30, 80, 50].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-400 to-indigo-400 rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-indigo-300/80 mt-1">
              Ultra-low Latency Speech
            </span>
          </div>
        );

      case 'web':
        return (
          <div className="w-full h-32 rounded-xl bg-[#030914] border border-blue-500/20 p-2 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center gap-1 border-b border-slate-800 pb-1">
              <div className="w-2 h-2 rounded-full bg-rose-500/60" />
              <div className="w-2 h-2 rounded-full bg-amber-500/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
              <div className="text-[9px] text-slate-500 font-mono ml-1 truncate">
                https://modernstore.pk
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 my-1">
              <div className="h-10 rounded bg-cyan-950/40 border border-cyan-500/20" />
              <div className="h-10 rounded bg-blue-950/40 border border-blue-500/20" />
              <div className="h-10 rounded bg-indigo-950/40 border border-indigo-500/20" />
            </div>
            <div className="h-3 rounded bg-slate-800/80 flex items-center justify-between px-2 text-[8px] text-slate-400">
              <span>Checkout Flow</span>
              <span className="text-emerald-400">Ready</span>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="w-full h-32 rounded-xl bg-[#030914] border border-emerald-500/20 p-2 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[9px] text-emerald-400 font-mono">
              <span>Sales KPI Dashboard</span>
              <span className="text-slate-400">+28.4%</span>
            </div>
            <div className="grid grid-cols-4 gap-1 items-end h-14 pt-1">
              <div className="h-[40%] bg-emerald-500/40 rounded-t" />
              <div className="h-[75%] bg-emerald-500/60 rounded-t" />
              <div className="h-[60%] bg-cyan-500/60 rounded-t" />
              <div className="h-[100%] bg-teal-400 rounded-t shadow-[0_0_10px_rgba(45,212,191,0.4)]" />
            </div>
            <div className="flex items-center justify-between text-[8px] text-slate-400">
              <span>Q1</span>
              <span>Q2</span>
              <span>Q3</span>
              <span className="font-bold text-white">Q4</span>
            </div>
          </div>
        );

      case 'workflow':
        return (
          <div className="w-full h-32 rounded-xl bg-[#030814] border border-rose-500/20 p-2 flex flex-col items-center justify-center relative overflow-hidden">
            {/* n8n logo stylized */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-rose-600/30 border border-rose-500 flex items-center justify-center text-rose-300 font-black text-xs font-mono">
                n8n
              </div>
              <div className="h-0.5 w-6 bg-cyan-500/40" />
              <div className="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-500 flex items-center justify-center text-cyan-300 text-xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="h-0.5 w-6 bg-indigo-500/40" />
              <div className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500 flex items-center justify-center text-indigo-300 text-xs">
                <Send className="w-3 h-3" />
              </div>
            </div>
            <span className="text-[10px] text-rose-300/90 font-mono">
              Auto-Lead Qualification Flow
            </span>
          </div>
        );
    }
  };

  const filteredProjects = STUDENT_PROJECTS.filter((proj) => {
    if (activeTab === 'all') return true;
    return proj.category === activeTab;
  });

  return (
    <section id="projects" className="py-20 relative bg-[#030914] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              STUDENT PROJECTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
              What Our Students Build
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Real Projects. Real Skills. Real Impact.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('all')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Project Cards in responsive grid matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} maxTilt={8}>
              <div
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer group h-full rounded-2xl bg-gradient-to-b from-[#071529] to-[#040e1e] border border-cyan-500/20 hover:border-cyan-400/60 p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div>
                  {/* Interactive Visual Window */}
                  <div className="mb-3 rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    {getVisual(project)}
                  </div>

                  {/* Title & Author matching reference */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                    {project.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                      {project.studentName.charAt(0)}
                    </span>
                    <span className="font-medium text-slate-200">{project.studentName}</span>
                  </div>

                  <p className="text-[11px] text-cyan-400/80 mt-1 font-mono truncate">
                    {project.course}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Click to preview demo</span>
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Interactive Project Showcase Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#071326] border border-cyan-500/40 rounded-3xl p-5 sm:p-8 text-slate-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer z-10"
              title="Cut / Close"
            >
              <X className="w-4 h-4" />
              <span>Cut</span>
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase">
                  Student Showcase
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedProject.studentRole}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-cyan-400 mt-1">
                  Built by {selectedProject.studentName} · {selectedProject.course}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProject.summary}
              </p>

              {/* Interactive Demo Simulation Area */}
              <div className="p-4 rounded-2xl bg-[#030814] border border-cyan-500/25 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-cyan-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Interactive Simulator
                  </span>
                  <span className="text-[11px] text-slate-400">Live Test Run</span>
                </div>

                {selectedProject.demoType === 'chatbot' && (
                  <div className="space-y-2">
                    <div className="max-h-44 overflow-y-auto space-y-2 p-2 bg-[#050e1f] rounded-xl text-xs">
                      {simMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-2 rounded-xl ${
                              msg.sender === 'user'
                                ? 'bg-cyan-600 text-white rounded-tr-none'
                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-cyan-500/20'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSimSend} className="flex gap-2">
                      <input
                        type="text"
                        value={simChatInput}
                        onChange={(e) => setSimChatInput(e.target.value)}
                        placeholder="Test the chatbot (e.g. course fee, batch timings)..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </form>
                  </div>
                )}

                {selectedProject.demoType === 'voice' && (
                  <div className="p-4 rounded-xl bg-[#050e1f] text-center space-y-3">
                    <div className="flex items-center justify-center gap-1 h-8">
                      {[30, 80, 50, 90, 40, 70, 100, 60, 45, 85].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1.5 rounded-full ${
                            isVoicePlaying
                              ? 'bg-cyan-400 animate-pulse'
                              : 'bg-slate-700'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setIsVoicePlaying(!isVoicePlaying)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-all"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{isVoicePlaying ? 'Pause Voice Stream' : 'Play Voice Agent Sample'}</span>
                    </button>
                  </div>
                )}

                {(selectedProject.demoType === 'web' ||
                  selectedProject.demoType === 'dashboard' ||
                  selectedProject.demoType === 'workflow') && (
                  <div className="space-y-2">
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{selectedProject.previewDetails.highlight}</span>
                    </div>
                    <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                      {selectedProject.previewDetails.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-2">Technologies Used:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
