'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const COLORS = ['#00c896', '#ff8c42', '#ff6b9d', '#ffd166', '#87ceeb'];

function initParticles(w: number, h: number): Particle[] {
  return Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  }));
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const StatCard = ({
  icon,
  label,
  value,
  type,
  color,
  delay
}: {icon: string;label: string;value: number;type: 'ring' | 'bar';color: string;delay: number;}) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setAnimated(true);},
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const circumference = 2 * Math.PI * 45;
  const dashOffset = animated ? circumference * (1 - value / 100) : circumference;
  const displayValue = useCountUp(value, 1600, animated);

  return (
    <div
      ref={ref}
      className="relative p-5 flex flex-col items-center gap-3 overflow-hidden rounded-3xl group"
      style={{
        animationDelay: `${delay}ms`,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `2px solid ${color}30`,
        boxShadow: `0 8px 32px ${color}20, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.98)`,
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.02)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 48px ${color}30, 0 4px 16px rgba(0,0,0,0.06)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${color}20, 0 2px 8px rgba(0,0,0,0.04)`;
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}20 0%, transparent 70%)` }}
      />

      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl relative z-10"
        style={{
          background: `linear-gradient(135deg, ${color}25 0%, ${color}12 100%)`,
          border: `1.5px solid ${color}35`,
          boxShadow: `0 4px 12px ${color}25`
        }}>
        {icon}
      </div>

      {type === 'ring' ? (
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#fde8d8" strokeWidth="9" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={color} strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: `stroke-dashoffset 1.8s ${delay}ms cubic-bezier(0.22,1,0.36,1)`, filter: `drop-shadow(0 0 5px ${color}90)` }}
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center font-black text-sm"
            style={{ color, fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            {animated ? `${displayValue}%` : '0%'}
          </span>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {[value * 0.55, value * 0.75, value].map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: `${color}15` }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${color}cc, ${color})`,
                    width: animated ? `${v}%` : '0%',
                    transition: `width 1.6s ${delay + i * 180}ms cubic-bezier(0.22,1,0.36,1)`,
                    boxShadow: `0 0 8px ${color}60`
                  }}
                />
              </div>
              <span className="text-xs text-slate-400 w-8 text-right font-semibold">{Math.round(v)}%</span>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs font-bold text-center relative z-10" style={{ color: '#334155' }}>{label}</p>
    </div>
  );
};

const SUBTITLE_WORDS = [
  { text: 'Propuesta', highlight: false },
  { text: 'de', highlight: false },
  { text: 'solución', highlight: false },
  { text: 'al', highlight: false },
  { text: 'Control', highlight: true },
  { text: 'de', highlight: true },
  { text: 'Crecimiento', highlight: true },
  { text: 'y', highlight: true },
  { text: 'Desarrollo', highlight: true },
  { text: '(CRED)', highlight: true },
  { text: 'en', highlight: false },
  { text: 'Huánuco,', highlight: false },
  { text: 'Perú.', highlight: false },
];

// Pediatric floating illustrations
const PediatricIllustrations = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Baby/child face */}
    <svg className="absolute top-[8%] left-[5%] opacity-25" style={{ animation: 'float-panel 4.5s ease-in-out infinite' }} width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="36" r="22" fill="#ffd166"/>
      <circle cx="14" cy="20" r="9" fill="#ffd166"/>
      <circle cx="50" cy="20" r="9" fill="#ffd166"/>
      <circle cx="24" cy="33" r="4" fill="#1a2e3b"/>
      <circle cx="40" cy="33" r="4" fill="#1a2e3b"/>
      <circle cx="25.5" cy="31.5" r="1.5" fill="white"/>
      <circle cx="41.5" cy="31.5" r="1.5" fill="white"/>
      <path d="M26 44 Q32 50 38 44" stroke="#1a2e3b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="32" cy="39" r="3" fill="#ff8c42" opacity="0.6"/>
      <ellipse cx="20" cy="40" rx="4" ry="2.5" fill="#ff6b9d" opacity="0.4"/>
      <ellipse cx="44" cy="40" rx="4" ry="2.5" fill="#ff6b9d" opacity="0.4"/>
    </svg>

    {/* Stethoscope */}
    <svg className="absolute top-[12%] right-[7%] opacity-22" style={{ animation: 'float-panel 5.5s ease-in-out 0.8s infinite' }} width="58" height="58" viewBox="0 0 64 64" fill="none">
      <circle cx="44" cy="46" r="11" stroke="#00a8cc" strokeWidth="4" fill="none"/>
      <circle cx="44" cy="46" r="5" fill="#00a8cc"/>
      <path d="M12 10 Q12 30 26 30 Q40 30 40 46" stroke="#00a8cc" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="10" r="5" fill="#ff6b9d"/>
      <circle cx="22" cy="10" r="5" fill="#ff6b9d"/>
    </svg>

    {/* Star */}
    <svg className="absolute bottom-[22%] right-[6%] opacity-30" style={{ animation: 'float-panel 3.5s ease-in-out 1.2s infinite' }} width="48" height="48" viewBox="0 0 64 64" fill="none">
      <polygon points="32,4 38,24 60,24 43,37 49,58 32,45 15,58 21,37 4,24 26,24" fill="#ffd166"/>
    </svg>

    {/* Heart */}
    <svg className="absolute top-[52%] left-[3%] opacity-25" style={{ animation: 'float-panel 4s ease-in-out 0.4s infinite' }} width="52" height="52" viewBox="0 0 64 64" fill="none">
      <path d="M32 54 C32 54 6 38 6 22 C6 14 12 8 20 8 C25 8 30 11 32 15 C34 11 39 8 44 8 C52 8 58 14 58 22 C58 38 32 54 32 54Z" fill="#ff6b9d"/>
    </svg>

    {/* Balloon */}
    <svg className="absolute bottom-[12%] left-[10%] opacity-22" style={{ animation: 'float-panel 6s ease-in-out 2s infinite' }} width="52" height="68" viewBox="0 0 52 68" fill="none">
      <ellipse cx="26" cy="24" rx="20" ry="22" fill="#ff8c42"/>
      <ellipse cx="20" cy="16" rx="6" ry="4" fill="white" opacity="0.35"/>
      <path d="M26 46 Q22 52 26 58 Q30 52 26 46" stroke="#ff8c42" strokeWidth="2" fill="none"/>
      <circle cx="26" cy="60" r="3" fill="#ff8c42"/>
    </svg>

    {/* Small stars scattered */}
    <svg className="absolute top-[30%] right-[3%] opacity-20" style={{ animation: 'float-panel 5s ease-in-out 1.6s infinite' }} width="36" height="36" viewBox="0 0 36 36" fill="none">
      <polygon points="18,2 21,13 33,13 24,20 27,32 18,25 9,32 12,20 3,13 15,13" fill="#ffd166"/>
    </svg>
    <svg className="absolute top-[68%] right-[15%] opacity-20" style={{ animation: 'float-panel 4s ease-in-out 3s infinite' }} width="28" height="28" viewBox="0 0 28 28" fill="none">
      <polygon points="14,2 16.5,9.5 25,9.5 18.5,14.5 21,22 14,17.5 7,22 9.5,14.5 3,9.5 11.5,9.5" fill="#00c896"/>
    </svg>

    {/* Leaf/plant */}
    <svg className="absolute top-[72%] right-[12%] opacity-18" style={{ animation: 'float-panel 4s ease-in-out 3s infinite' }} width="44" height="44" viewBox="0 0 64 64" fill="none">
      <ellipse cx="28" cy="44" rx="12" ry="16" fill="#00c896"/>
      <ellipse cx="14" cy="26" rx="5" ry="7" fill="#00c896"/>
      <ellipse cx="22" cy="20" rx="5" ry="7" fill="#00c896"/>
      <ellipse cx="32" cy="18" rx="5" ry="7" fill="#00c896"/>
      <ellipse cx="42" cy="22" rx="5" ry="7" fill="#00c896"/>
    </svg>

    {/* Dots pattern */}
    <svg className="absolute top-[25%] left-[16%] opacity-12" style={{ animation: 'float-panel 3.8s ease-in-out 0.6s infinite' }} width="80" height="80" viewBox="0 0 80 80" fill="none">
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="3" fill="#ff8c42" opacity="0.6"/>
      )))}
    </svg>

    {/* Wavy line decoration */}
    <svg className="absolute bottom-[30%] left-[0%] opacity-10" width="120" height="40" viewBox="0 0 120 40" fill="none">
      <path d="M0 20 Q15 5 30 20 Q45 35 60 20 Q75 5 90 20 Q105 35 120 20" stroke="#ffd166" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
    <svg className="absolute top-[45%] right-[0%] opacity-10" width="100" height="40" viewBox="0 0 100 40" fill="none">
      <path d="M0 20 Q12.5 5 25 20 Q37.5 35 50 20 Q62.5 5 75 20 Q87.5 35 100 20" stroke="#ff6b9d" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </div>
);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [wordsVisible, setWordsVisible] = useState(0);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [bgAngle, setBgAngle] = useState(135);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!titleVisible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setWordsVisible(i);
      if (i >= SUBTITLE_WORDS.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [titleVisible]);

  useEffect(() => {
    let angle = 135;
    let raf: number;
    const animate = () => {
      angle = (angle + 0.12) % 360;
      setBgAngle(angle);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx -= dx / dist * 0.07;
          p.vy -= dy / dist * 0.07;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,140,66,${0.18 * (1 - d / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnPos({ x: x * 0.3, y: y * 0.3 });
  };
  const handleBtnMouseLeave = () => setBtnPos({ x: 0, y: 0 });

  const handleScroll = () => {
    document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth' });
  };

  const metrics = [
    { num: 5, suffix: '', label: 'Fases estratégicas' },
    { num: 12, suffix: '+', label: 'Centros de salud' },
    { num: 95, suffix: '%', label: 'Cobertura potencial' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(${bgAngle}deg, #fffdf9 0%, #fff8f0 20%, #fff0f7 45%, #f0fdf8 70%, #f0f8ff 100%)`
      }}>

      {/* Warm blob backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,209,102,0.22) 0%, rgba(255,140,66,0.08) 50%, transparent 70%)',
            animation: 'float-panel 9s ease-in-out infinite'
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,200,150,0.18) 0%, rgba(0,168,204,0.08) 50%, transparent 70%)',
            animation: 'float-panel 11s ease-in-out 2s infinite'
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,157,0.10) 0%, transparent 65%)',
            animation: 'float-panel 13s ease-in-out 1s infinite'
          }}
        />
      </div>

      {/* Pediatric floating illustrations */}
      <PediatricIllustrations />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div className="flex flex-col gap-8">
          {/* Animated badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold w-fit"
            style={{
              background: 'linear-gradient(135deg, rgba(255,209,102,0.25) 0%, rgba(255,140,66,0.15) 100%)',
              border: '1.5px solid rgba(255,140,66,0.35)',
              color: '#c05c00',
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 16px rgba(255,140,66,0.18)'
            }}>
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: '#ff8c42', boxShadow: '0 0 8px #ff8c42, 0 0 16px #ff8c4260', animation: 'float-panel 1.8s ease-in-out infinite' }}
            />
            🍼 Huánuco, Perú · Salud Infantil
          </div>

          {/* Title */}
          <div className="overflow-hidden">
            <h1
              className="font-display font-black"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(52px, 7vw, 80px)',
                lineHeight: 1.05,
                background: 'linear-gradient(135deg, #1a2e3b 0%, #ff8c42 40%, #ff6b9d 70%, #00a8cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                clipPath: titleVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 1.4s cubic-bezier(0.22,1,0.36,1)',
                filter: 'drop-shadow(0 2px 8px rgba(255,140,66,0.15))'
              }}>
              MiPequeCrece
            </h1>
          </div>

          {/* Animated word-by-word subtitle */}
          <p className="text-lg leading-relaxed max-w-lg flex flex-wrap gap-x-1.5 gap-y-0.5">
            {SUBTITLE_WORDS.map((word, i) => (
              <span
                key={i}
                style={{
                  color: word.highlight ? '#ff8c42' : '#334155',
                  fontWeight: word.highlight ? 700 : 400,
                  opacity: wordsVisible > i ? 1 : 0,
                  transform: wordsVisible > i ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  display: 'inline-block'
                }}>
                {word.text}
              </span>
            ))}
          </p>

          {/* CTA Button */}
          <div
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s 0.9s ease, transform 0.8s 0.9s ease'
            }}>
            <button
              ref={btnRef}
              onClick={handleScroll}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="relative px-9 py-4 rounded-2xl text-white font-bold text-base overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b9d 60%, #c44dff 100%)',
                boxShadow: '0 8px 32px rgba(255,140,66,0.45), 0 2px 8px rgba(255,107,157,0.25)',
                transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
                transition: 'transform 0.2s ease, box-shadow 0.3s ease'
              }}>
              <span className="relative z-10 flex items-center gap-2">
                ✨ Explorar Solución
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #e07030 0%, #e0508a 60%, #a030e0 100%)' }}
              />
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)' }}
              />
            </button>
          </div>

          {/* Animated metrics row */}
          <div
            className="flex gap-8 pt-2"
            style={{
              opacity: titleVisible ? 1 : 0,
              transition: 'opacity 0.8s 1.1s ease'
            }}>
            {metrics.map((m, idx) => (
              <MetricCounter key={m.label} target={m.num} suffix={m.suffix} label={m.label} delay={1200 + idx * 150} visible={titleVisible} color="#ff8c42" />
            ))}
          </div>
        </div>

        {/* Right: Stat cards */}
        <div
          className="flex flex-col gap-4"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.9s 0.5s ease, transform 0.9s 0.5s ease'
          }}>
          <StatCard icon="🌱" label="Cobertura potencial en Huánuco" value={95} type="ring" color="#00c896" delay={600} />
          <StatCard icon="👶" label="Progreso en desarrollo infantil" value={82} type="bar" color="#ff8c42" delay={800} />
          <StatCard icon="📅" label="Incremento en asistencia CRED" value={78} type="bar" color="#ff6b9d" delay={1000} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Desplazar</span>
        <div className="w-5 h-8 rounded-full border-2 border-orange-200 flex justify-center pt-1.5">
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: '#ff8c42', animation: 'float-panel 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}

function MetricCounter({ target, suffix, label, delay, visible, color }: { target: number; suffix: string; label: string; delay: number; visible: boolean; color: string }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);
  const count = useCountUp(target, 1400, started);
  return (
    <div className="flex flex-col items-start">
      <span
        className="text-2xl font-black tabular-nums"
        style={{ fontFamily: 'var(--font-display)', color }}>
        {started ? `${count}${suffix}` : `0${suffix}`}
      </span>
      <span className="text-xs text-slate-500 mt-0.5">{label}</span>
    </div>
  );
}
