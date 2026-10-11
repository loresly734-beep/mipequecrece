'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ProblemSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  const causes = [
    {
      icon: '🏥',
      title: 'Acceso limitado',
      desc: 'Distancia a centros de salud en zonas rurales de Huánuco',
      color: '#00a8cc',
      bg: 'rgba(0,168,204,0.08)',
      border: 'rgba(0,168,204,0.25)',
    },
    {
      icon: '📱',
      title: 'Falta de recordatorios',
      desc: 'Sin sistemas de seguimiento proactivo a las familias',
      color: '#ff8c42',
      bg: 'rgba(255,140,66,0.08)',
      border: 'rgba(255,140,66,0.25)',
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Desinformación familiar',
      desc: 'Desconocimiento de la importancia del control CRED',
      color: '#ff6b9d',
      bg: 'rgba(255,107,157,0.08)',
      border: 'rgba(255,107,157,0.25)',
    },
    {
      icon: '⏰',
      title: 'Barreras laborales',
      desc: 'Horarios incompatibles con la disponibilidad de los padres',
      color: '#ffd166',
      bg: 'rgba(255,209,102,0.12)',
      border: 'rgba(255,209,102,0.35)',
    },
  ];

  return (
    <section
      id="problema"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fffdf9 0%, #fff8f0 50%, #fffdf9 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(255,140,66,0.2) 0%, transparent 70%)' }}
        />
        {/* Decorative wavy lines */}
        <svg className="absolute bottom-0 left-0 w-full opacity-8" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 40 Q180 10 360 40 Q540 70 720 40 Q900 10 1080 40 Q1260 70 1440 40 L1440 80 L0 80Z" fill="#fff8f0"/>
        </svg>
        {/* Floating dots */}
        <svg className="absolute top-12 left-8 opacity-15" style={{ animation: 'float-panel 5s ease-in-out infinite' }} width="60" height="60" viewBox="0 0 60 60" fill="none">
          {[0,1,2].map(row => [0,1,2].map(col => (
            <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="4" fill="#ff8c42"/>
          )))}
        </svg>
        <svg className="absolute bottom-16 right-12 opacity-15" style={{ animation: 'float-panel 4s ease-in-out 1s infinite' }} width="50" height="50" viewBox="0 0 50 50" fill="none">
          {[0,1,2].map(row => [0,1,2].map(col => (
            <circle key={`${row}-${col}`} cx={8 + col * 17} cy={8 + row * 17} r="3.5" fill="#ff6b9d"/>
          )))}
        </svg>
        {/* Stethoscope decoration */}
        <svg className="absolute top-16 right-16 opacity-12" style={{ animation: 'float-panel 6s ease-in-out 0.5s infinite' }} width="70" height="70" viewBox="0 0 64 64" fill="none">
          <circle cx="44" cy="46" r="11" stroke="#ff8c42" strokeWidth="3.5" fill="none"/>
          <circle cx="44" cy="46" r="5" fill="#ff8c42"/>
          <path d="M12 10 Q12 30 26 30 Q40 30 40 46" stroke="#ff8c42" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <circle cx="12" cy="10" r="5" fill="#ffd166"/>
          <circle cx="22" cy="10" r="5" fill="#ffd166"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div
          className="flex justify-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span
            className="pedi-badge"
            style={{
              background: 'linear-gradient(135deg, rgba(255,140,66,0.15) 0%, rgba(255,209,102,0.15) 100%)',
              border: '1.5px solid rgba(255,140,66,0.35)',
              color: '#c05c00',
              boxShadow: '0 4px 16px rgba(255,140,66,0.15)',
            }}
          >
            🔍 Diagnóstico Situacional
          </span>
        </div>

        {/* Main alert card */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fff8f0 60%, #fff0f7 100%)',
            border: '2px solid rgba(255,140,66,0.35)',
            boxShadow: '0 16px 48px rgba(255,140,66,0.15), 0 4px 16px rgba(255,107,157,0.08)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
            transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
          }}
        >
          {/* Corner accent blobs */}
          <div
            className="absolute top-0 right-0 w-48 h-48 opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, #ffd166, transparent)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-40 h-40 opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle at bottom left, #ff6b9d, transparent)' }}
          />

          {/* Decorative child illustration */}
          <div className="absolute top-4 right-6 opacity-20 pointer-events-none" style={{ animation: 'float-panel 4s ease-in-out infinite' }}>
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="36" r="22" fill="#ffd166"/>
              <circle cx="14" cy="20" r="9" fill="#ffd166"/>
              <circle cx="50" cy="20" r="9" fill="#ffd166"/>
              <circle cx="24" cy="33" r="4" fill="#1a2e3b"/>
              <circle cx="40" cy="33" r="4" fill="#1a2e3b"/>
              <path d="M26 44 Q32 50 38 44" stroke="#1a2e3b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <ellipse cx="20" cy="40" rx="4" ry="2.5" fill="#ff6b9d" opacity="0.5"/>
              <ellipse cx="44" cy="40" rx="4" ry="2.5" fill="#ff6b9d" opacity="0.5"/>
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255,140,66,0.18) 0%, rgba(255,209,102,0.18) 100%)',
                border: '2px solid rgba(255,140,66,0.3)',
                boxShadow: '0 4px 16px rgba(255,140,66,0.2)'
              }}
            >
              🚨
            </div>
            <div>
              <p className="text-sm font-bold mb-2 tracking-wide" style={{ color: '#c05c00' }}>
                PROBLEMA CENTRAL IDENTIFICADO
              </p>
              <h2
                className="text-section-heading font-black mb-3"
                style={{ fontFamily: 'var(--font-display)', color: '#1a2e3b' }}
              >
                Inasistencia al Control de Crecimiento y Desarrollo (CRED)
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#475569' }}>
                La falta de asistencia a los controles CRED en Huánuco compromete el desarrollo integral de los niños menores de 5 años, generando consecuencias irreversibles en su salud física, cognitiva y emocional a largo plazo.
              </p>
            </div>
          </div>

          {/* Alert level bar */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-xs font-bold" style={{ color: '#c05c00' }}>NIVEL DE ALERTA</span>
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,140,66,0.12)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #ffd166, #ff8c42, #ff6b6b)',
                  width: visible ? '78%' : '0%',
                  transition: 'width 1.5s 0.8s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: '0 0 10px rgba(255,140,66,0.6)',
                }}
              />
            </div>
            <span className="text-xs font-black" style={{ color: '#ff6b6b' }}>ALTO</span>
          </div>
        </div>

        {/* Causes grid — asymmetric bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {causes?.map((c, i) => (
            <div
              key={c?.title}
              className="rounded-3xl p-5 flex flex-col gap-3 group cursor-default"
              style={{
                background: c.bg,
                border: `1.5px solid ${c.border}`,
                boxShadow: `0 4px 20px ${c.color}12`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                transition: `opacity 0.7s ${0.4 + i * 0.1}s cubic-bezier(0.34,1.56,0.64,1), transform 0.7s ${0.4 + i * 0.1}s cubic-bezier(0.34,1.56,0.64,1)`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.03)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px ${c.color}25`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px ${c.color}12`;
              }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                style={{
                  background: `${c.color}18`,
                  border: `1.5px solid ${c.color}30`,
                  boxShadow: `0 4px 12px ${c.color}20`,
                }}
              >
                {c?.icon}
              </div>
              <h3 className="font-black text-sm" style={{ color: '#1a2e3b', fontFamily: 'var(--font-display)' }}>{c?.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{c?.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}