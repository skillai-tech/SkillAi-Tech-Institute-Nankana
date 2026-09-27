import { useState, useRef, ReactNode, MouseEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glowColor = 'rgba(6, 182, 212, 0.15)'
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glare spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${glowColor}, transparent 65%)`,
          opacity: glare.opacity
        }}
      />
      {children}
    </div>
  );
}
