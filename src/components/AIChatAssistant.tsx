import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, ArrowRight, Minus } from 'lucide-react';
import { AssistantMessage } from '../types';
import { INSTITUTE_INFO } from '../data/instituteData';

interface AIChatAssistantProps {
  onOpenApplyModal: (courseTitle?: string) => void;
}

export default function AIChatAssistant({ onOpenApplyModal }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Assalam o Alaikum! 👋 Main SkillAI Assistant hoon. Aap courses, fees, batch timings, ya admission ke baray mein kuch bhi pooch saktay hain!',
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Agentic AI course ki fee kya hai?',
    'Online classes available hain?',
    'Class timings kya hain?',
    'Institute ka address kya hai?'
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: AssistantMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let actionButton: { label: string; action: string } | undefined = undefined;
      const q = query.toLowerCase();

      if (q.includes('fee') || q.includes('fees') || q.includes('cost') || q.includes('paisa') || q.includes('charges')) {
        if (q.includes('agent') || q.includes('agentic') || q.includes('automation')) {
          reply = 'Agentic AI & Automation course ki duration 3 months hai. Fee: PKR 15,000 / month (30% Theory, 70% Practical hands-on). Is mein Python, n8n, CrewAI, LangGraph, RAG aur WhatsApp bots sikhaye jatay hain!';
          actionButton = { label: 'Apply for Agentic AI', action: 'apply-agentic' };
        } else if (q.includes('python')) {
          reply = 'Python Programming course ki duration 3 months hai aur fee PKR 9,000 / month hai. Absolute beginner friendly hai!';
          actionButton = { label: 'Apply for Python', action: 'apply-python' };
        } else if (q.includes('web') || q.includes('full stack') || q.includes('mern')) {
          reply = 'Full Stack Web Development (MERN Stack) 6 months ka diploma program hai, fee PKR 12,000 / month hai.';
          actionButton = { label: 'Apply for Web Dev', action: 'apply-web' };
        } else {
          reply = 'Hamari course fees PKR 6,000 se PKR 16,000 ke darmiyan hain: \n• Agentic AI & Automation: PKR 15,000/mo\n• Full Stack Web Dev: PKR 12,000/mo\n• AI Chatbots & Voice: PKR 10,000/mo\n• Python: PKR 9,000/mo\n• Data Analytics: PKR 9,500/mo\nInstallment aur early bird discounts bhi available hain!';
          actionButton = { label: 'Explore All Courses', action: 'explore-courses' };
        }
      } else if (q.includes('online') || q.includes('ghar') || q.includes('zoom') || q.includes('physical')) {
        reply = 'Ji bilkul! SkillAI mein dono options available hain:\n1. Physical Classes: Hamare air-conditioned modern computer lab mein (Y/272 Housing Colony, Nankana).\n2. Online Live Classes: Zoom/Google Meet par live interactive sessions + har class ki recorded video lifetime portal access ke sath!';
      } else if (q.includes('timing') || q.includes('time') || q.includes('schedule') || q.includes('waqt')) {
        reply = 'Hamare multiple batch timings available hain:\n• Evening Batch: 5:00 PM – 7:00 PM\n• Night Batch: 7:30 PM – 9:30 PM\n• Morning Batch: 10:00 AM – 12:00 PM\n• Weekend Special (Sat & Sun) working professionals ke liye.';
      } else if (q.includes('address') || q.includes('location') || q.includes('kahan') || q.includes('where') || q.includes('city')) {
        reply = '📍 Institute Location: Y/272 Housing Colony, Nankana Sahib, Punjab, Pakistan.\nContact: 0301-4870303.\nAap physical visit karke lab aur demo class bhi check kar saktay hain!';
      } else if (q.includes('certificate') || q.includes('sanad') || q.includes('verify')) {
        reply = 'Course complete hone par har student ko official verified certificate diya jata hai jisko website ke "Verify Certificate" section mein Certificate ID ke zariye globally verify kiya ja sakta hai!';
      } else if (q.includes('founder') || q.includes('instructor') || q.includes('teacher') || q.includes('zeeshan')) {
        reply = 'Hamare Founder & Lead Instructor Sir Zeeshan Abdul Jabbar hain (MSc IT, AI & ML Engineer, AI Automation & Web Developer). Un ka mission Pakistan ke nojawanon ko global market ke liye tayar karna hai.';
      } else {
        reply = 'Shukriya aap ke sawal ka! SkillAI Tech Institute Nankana mein admissions open hain. Kya aap kisi specific course ke syllabus, batch timings ya admission form ke baray mein janna chahtay hain?';
        actionButton = { label: 'Apply Now', action: 'apply' };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: reply,
          timestamp: 'Just now',
          actionButton
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleAction = (action: string) => {
    if (action === 'apply-agentic') {
      onOpenApplyModal('Agentic AI & Automation');
      setIsOpen(false);
    } else if (action === 'apply-python') {
      onOpenApplyModal('Python Programming');
      setIsOpen(false);
    } else if (action === 'apply-web') {
      onOpenApplyModal('Full Stack Web Development');
      setIsOpen(false);
    } else {
      onOpenApplyModal();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 sm:right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-bold text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all transform hover:scale-105 active:scale-95 group"
          title="Open SkillAI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span>Ask SkillAI</span>
        </button>
      )}

      {/* Dimmed Background Overlay on mobile to easily tap outside and Cut/Close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 sm:hidden animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Interactive Chat Window - Strictly bounded inside viewport on all mobile & desktop screens */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="SkillAI Assistant Chat"
          className="fixed z-50 bottom-2 right-2 left-2 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[370px] max-w-[calc(100vw-1rem)] h-[min(490px,calc(100dvh-4rem))] max-h-[calc(100dvh-4rem)] bg-[#071328] border-2 border-cyan-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header with High-Contrast Red Cut / Close Button */}
          <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#091b38] to-[#040e1e] border-b border-cyan-500/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Bot className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#071328]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1 font-display">
                  SkillAI Assistant
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </h4>
                <p className="text-[9px] text-cyan-300/80">Online · Instant Help</p>
              </div>
            </div>

            {/* Actions: WhatsApp + Prominent Cut / Close Button */}
            <div className="flex items-center gap-1.5">
              <a
                href={INSTITUTE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                title="Chat on WhatsApp"
                className="p-1 rounded-lg text-emerald-400 hover:bg-emerald-500/15 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* High-Visibility Cut / Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                title="Cut / Close Chat (Esc)"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Cut</span>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-left">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md'
                      : 'bg-[#040e1e] border border-cyan-500/20 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {msg.actionButton && (
                  <button
                    onClick={() => handleAction(msg.actionButton!.action)}
                    className="mt-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all"
                  >
                    <span>{msg.actionButton.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2.5 bg-[#040e1e] border border-cyan-500/20 rounded-2xl rounded-tl-none w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#040a16] border-t border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 sm:p-3 bg-[#061224] border-t border-cyan-500/20 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fees, timings, classes..."
              className="flex-1 bg-[#020712] border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors disabled:opacity-40"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
