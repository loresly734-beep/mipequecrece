'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fffdf9 0%, #fff8f0 100%)',
        borderTop: '1.5px solid rgba(255,140,66,0.15)',
      }}
    >
      {/* Top gradient divider */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #ff8c42, #ff6b9d, #ffd166, transparent)' }}
      />

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-64 h-64 opacity-10"
          style={{ background: 'radial-gradient(circle at bottom right, #ffd166, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 opacity-8"
          style={{ background: 'radial-gradient(circle at bottom left, #ff6b9d, transparent)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
              style={{
                background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b9d 100%)',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 4px 12px rgba(255,140,66,0.35)',
              }}
            >
              🌱
            </div>
            <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)', color: '#1a2e3b' }}>
              MiPequeCrece
            </span>
          </div>

          <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
            Plan estratégico para la reducción de la inasistencia al CRED · Huánuco, Perú · 2026
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-xs font-semibold transition-colors duration-200"
              style={{ color: '#64748b' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#ff8c42'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#64748b'}
            >
              Acerca del Proyecto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}