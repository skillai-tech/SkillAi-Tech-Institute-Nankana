import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface FloatingContactBarProps {
  onOpenApplyModal: () => void;
}

export default function FloatingContactBar({ onOpenApplyModal }: FloatingContactBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2">
        {/* Call button */}
        <a
          href={`tel:${INSTITUTE_INFO.phone}`}
          aria-label="Call SkillAI Institute"
          className="w-12 h-12 rounded-full bg-[#06152a] hover:bg-cyan-600 border border-cyan-500/40 text-cyan-300 hover:text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 group"
          title={`Call ${INSTITUTE_INFO.phone}`}
        >
          <Phone className="w-5 h-5 group-hover:animate-bounce" />
        </a>

        {/* WhatsApp floating button with pulsing ring */}
        <a
          href={INSTITUTE_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Us"
          className="relative w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all transform hover:scale-110"
          title="Chat on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-35" />
          <MessageCircle className="w-6 h-6 fill-slate-950 relative z-10" />
        </a>
      </div>
    </div>
  );
}
