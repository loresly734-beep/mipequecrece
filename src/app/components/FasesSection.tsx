'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Phase {
  id: number;
  color: string;
  glow: string;
  icon: string;
  emoji: string;
  title: string;
  subtitle: string;
  detail: string;
  actions: string[];
}

const PHASES: Phase[] = [
  {
    id: 1,
    color: '#00c896',
    glow: 'rgba(0,200,150,0.25)',
    icon: '⚙️',
    emoji: '🤝',
    title: 'Fase 1',
    subtitle: 'Gestión y Organización',
    detail: 'Acuerdos comunales e institucionales. Establecer normas de compromiso en Huánuco.',
    actions: ['Acuerdos comunales', 'Normas institucionales', 'Protocolos CRED', 'Coordinación intersectorial'],
  },
  {
    id: 2,
    color: '#ff8c42',
    glow: 'rgba(255,140,66,0.25)',
    icon: '👥',
    emoji: '🏘️',
    title: 'Fase 2',
    subtitle: 'Participación Comunitaria',
    detail: 'Red de Agentes Comunitarios de Salud. Capacitación y movilización.',
    actions: ['Red de agentes ACS', 'Capacitación comunitaria', 'Movilización social', 'Alianzas estratégicas'],
  },
  {
    id: 3,
    color: '#ff6b9d',
    glow: 'rgba(255,107,157,0.25)',
    icon: '📡',
    emoji: '📲',
    title: 'Fase 3',
    subtitle: 'Comunicación a Distancia',
    detail: 'Telemonitoreo y recordatorios efectivos. Seguimiento proactivo.',
    actions: ['Telemonitoreo activo', 'SMS recordatorios', 'Llamadas de seguimiento', 'App móvil familiar'],
  },
  {
    id: 4,
    color: '#00a8cc',
    glow: 'rgba(0,168,204,0.25)',
    icon: '🏠',
    emoji: '🚪',
    title: 'Fase 4',
    subtitle: 'Trabajo de Campo',
    detail: 'Visitas domiciliarias por inasistencia y asistencia. Evaluación de riesgo.',
    actions: ['Visitas domiciliarias', 'Búsqueda activa', 'Evaluación de riesgo', 'Registro de datos'],
  },
  {
    id: 5,
    color: '#ffd166',
    glow: 'rgba(255,209,102,0.35)',
    icon: '🏆',
    emoji: '⭐',
    title: 'Fase 5',
    subtitle: 'Motivación y Fidelización',
    detail: 'Incentivos, refuerzo positivo y reconocimiento a familias cumplidoras.',
    actions: ['Incentivos familiares', 'Refuerzo positivo', 'Reconocimiento público', 'Certificados CRED'],
  },
];

export default function FasesSection() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (id: number) => {
    if (flipped === id) {
      setFlipped(null);
      setActivePhase(null);
    } else {
      setFlipped(id);
      setActivePhase(id);
    }
  };

  return (
    <section
      id="fases"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fffdf9 0%, #fff8f0 40%, #f0fdf8 80%, #f0f8ff 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(255,140,66,0.3) 0%, rgba(255,209,102,0.2) 40%, transparent 70%)' }}
        />
        {/* Stars decoration */}
        <svg className="absolute top-10 left-10 opacity-15" style={{ animation: 'float-panel 5s ease-in-out infinite' }} width="50" height="50" viewBox="0 0 50 50" fill="none">
          <polygon points="25,3 30,18 46,18 33,28 38,44 25,34 12,44 17,28 4,18 20,18" fill="#ffd166"/>
        </svg>
        <svg className="absolute bottom-10 right-10 opacity-15" style={{ animation: 'float-panel 4s ease-in-out 1.5s infinite' }} width="40" height="40" viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 24,14 37,14 27,22 31,35 20,27 9,35 13,22 3,14 16,14" fill="#ff8c42"/>
        </svg>
        <svg className="absolute top-1/2 right-8 opacity-12" style={{ animation: 'float-panel 6s ease-in-out 2s infinite' }} width="36" height="36" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 21.5,13 33,13 24,20 27.5,32 18,25 8.5,32 12,20 3,13 14.5,13" fill="#ff6b9d"/>
        </svg>
        {/* Wavy path */}
        <svg className="absolute bottom-0 left-0 w-full opacity-6" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0 30 Q180 5 360 30 Q540 55 720 30 Q900 5 1080 30 Q1260 55 1440 30 L1440 60 L0 60Z" fill="#fff8f0"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span
            className="pedi-badge mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(255,209,102,0.2) 0%, rgba(255,140,66,0.15) 100%)',
              border: '1.5px solid rgba(255,140,66,0.3)',
              color: '#c05c00',
              boxShadow: '0 4px 16px rgba(255,140,66,0.15)',
            }}
          >
            🗺️ Ruta Estratégica
          </span>
          <h2
            className="text-section-heading font-black mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#1a2e3b' }}
          >
            Las 5 Fases de la Solución
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#475569' }}>
            Un flujo estratégico integrado para transformar la asistencia al CRED en Huánuco.
            <span className="block text-sm mt-1 text-slate-400">Haz clic en cada fase para explorar los detalles.</span>
          </p>
        </div>

        {/* Flow route */}
        <div className="relative">
          {/* SVG connection lines */}
          <div className="absolute top-[88px] left-0 right-0 z-0 hidden lg:block pointer-events-none px-[10%]">
            <svg width="100%" height="28" viewBox="0 0 800 28" preserveAspectRatio="none">
              {[0, 1, 2, 3].map((i) => {
                const phaseColors = ['#00c896', '#ff8c42', '#ff6b9d', '#00a8cc'];
                const isActive = activePhase && activePhase > i + 1;
                return (
                  <line
                    key={i}
                    x1={`${(i + 1) * 20}%`}
                    y1="14"
                    x2={`${(i + 1) * 20 + 20}%`}
                    y2="14"
                    stroke={isActive ? phaseColors[i] : '#fde8d8'}
                    strokeWidth={isActive ? '3.5' : '2.5'}
                    strokeDasharray="14 7"
                    style={{
                      strokeDashoffset: 0,
                      animation: `flow-light ${isActive ? '1s' : '2.5s'} linear infinite`,
                      filter: isActive ? `drop-shadow(0 0 5px ${phaseColors[i]})` : 'none',
                      transition: 'stroke 0.4s ease, stroke-width 0.4s ease',
                    }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Phase cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {PHASES.map((phase, idx) => (
              <div
                key={phase.id}
                className="relative"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.7s ${0.1 + idx * 0.12}s cubic-bezier(0.34,1.56,0.64,1), transform 0.7s ${0.1 + idx * 0.12}s cubic-bezier(0.34,1.56,0.64,1)`,
                  perspective: '1000px',
                  height: '300px',
                }}
              >
                <div
                  className={`phase-card-inner w-full h-full cursor-pointer relative ${flipped === phase.id ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(phase.id)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    className="phase-card-front absolute inset-0 flex flex-col items-center justify-center gap-4 p-5 text-center rounded-3xl"
                    style={{
                      background: `linear-gradient(145deg, #ffffff 0%, ${phase.color}08 100%)`,
                      border: `2px solid ${phase.color}35`,
                      boxShadow: `0 8px 32px ${phase.glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.98)`,
                      transition: 'box-shadow 0.3s ease',
                    }}
                  >
                    {/* Phase number badge */}
                    <div
                      className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                      style={{
                        background: `linear-gradient(135deg, ${phase.color} 0%, ${phase.color}cc 100%)`,
                        fontFamily: 'var(--font-display)',
                        boxShadow: `0 4px 12px ${phase.glow}`,
                      }}
                    >
                      {phase.id}
                    </div>

                    {/* Main icon */}
                    <div
                      className="w-18 h-18 rounded-2xl flex items-center justify-center text-4xl float-anim"
                      style={{
                        width: '72px',
                        height: '72px',
                        background: `linear-gradient(135deg, ${phase.color}20 0%, ${phase.color}08 100%)`,
                        border: `2px solid ${phase.color}30`,
                        boxShadow: `0 8px 24px ${phase.glow}`,
                        animationDelay: `${idx * 0.8}s`,
                      }}
                    >
                      {phase.emoji}
                    </div>

                    <div>
                      <p className="text-xs font-black mb-1.5 tracking-wide" style={{ color: phase.color }}>
                        {phase.title}
                      </p>
                      <h3
                        className="font-black text-sm leading-tight"
                        style={{ fontFamily: 'var(--font-display)', color: '#1a2e3b' }}
                      >
                        {phase.subtitle}
                      </h3>
                    </div>

                    {/* Click hint */}
                    <div
                      className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: `${phase.color}18`,
                        border: `1.5px solid ${phase.color}35`,
                        boxShadow: `0 2px 8px ${phase.glow}`,
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={phase.color} strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Active glow ring */}
                    {activePhase === phase.id && (
                      <div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                          boxShadow: `0 0 0 2.5px ${phase.color}, 0 0 24px ${phase.glow}`,
                        }}
                      />
                    )}
                  </div>

                  {/* Back */}
                  <div
                    className="phase-card-back absolute inset-0 flex flex-col gap-3 p-5 rounded-3xl"
                    style={{
                      background: `linear-gradient(145deg, ${phase.color}12 0%, ${phase.color}06 100%)`,
                      border: `2px solid ${phase.color}40`,
                      boxShadow: `0 12px 40px ${phase.glow}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ background: phase.color }}
                      >
                        {phase.id}
                      </div>
                      <p className="text-xs font-black" style={{ color: phase.color }}>{phase.subtitle}</p>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>{phase.detail}</p>
                    <div className="flex flex-col gap-1.5 mt-1">
                      {phase.actions.map((action) => (
                        <div key={action} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: phase.color }} />
                          <span className="text-xs font-semibold" style={{ color: '#334155' }}>{action}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      className="mt-auto text-xs font-bold py-2 px-3 rounded-xl"
                      style={{
                        background: `${phase.color}18`,
                        border: `1px solid ${phase.color}35`,
                        color: phase.color,
                      }}
                      onClick={(e) => { e.stopPropagation(); handleCardClick(phase.id); }}
                    >
                      ← Volver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        {activePhase && (
          <div
            className="mt-10 flex justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,140,66,0.2)', backdropFilter: 'blur(12px)' }}>
              {PHASES.map((p) => (
                <div
                  key={p.id}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activePhase === p.id ? '24px' : '8px',
                    height: '8px',
                    background: activePhase === p.id ? p.color : '#fde8d8',
                    boxShadow: activePhase === p.id ? `0 0 8px ${p.glow}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
