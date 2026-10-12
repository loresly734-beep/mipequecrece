'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#problema', label: 'Problema' },
    { href: '#fases', label: 'Fases' },
    { href: '#infraestructura', label: 'Red de Salud' },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,253,249,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1.5px solid rgba(255,140,66,0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(255,140,66,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group"
        >
          <div
            className="w-9 h-9 flex items-center justify-center"
            style={{ filter: 'drop-shadow(0 3px 8px rgba(255,140,66,0.35))' }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="white" />
              {/* Heart */}
              <path
                d="M18 27C17.5 26.6 7.5 20.5 7.5 13.8C7.5 10.6 10.1 8 13.3 8C15.2 8 16.9 8.9 18 10.3C19.1 8.9 20.8 8 22.7 8C25.9 8 28.5 10.6 28.5 13.8C28.5 20.5 18.5 26.6 18 27Z"
                fill="#fff0f7"
                stroke="#ff6b9d"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Plant stem */}
              <line x1="18" y1="25" x2="18" y2="16" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" />
              {/* Left leaf */}
              <path d="M18 22C18 22 14 20.5 13.5 17.5C16.5 17 18 19.5 18 22Z" fill="#00c896" />
              {/* Right leaf */}
              <path d="M18 20C18 20 22 18.5 22.5 15.5C19.5 15 18 17.5 18 20Z" fill="#00c896" />
              {/* Child head */}
              <circle cx="18" cy="13.5" r="2" fill="#ff8c42" />
              {/* Sprout tip */}
              <circle cx="18" cy="15.8" r="1.2" fill="#ffd166" />
            </svg>
          </div>
          <span
            className="font-black text-base"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #1a2e3b 0%, #ff8c42 60%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MiPequeCrece
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ color: '#334155' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,140,66,0.1)';
                (e.currentTarget as HTMLButtonElement).style.color = '#c05c00';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#334155';
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo('#fases')}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b9d 100%)',
              boxShadow: '0 4px 16px rgba(255,140,66,0.35)',
            }}
          >
            🌱 Ver Programa
          </button>
          <Link
            href="/recompensas"
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
              boxShadow: '0 4px 16px rgba(5,150,105,0.3)',
            }}
          >
            🏆 Recompensas CRED
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[#1a2e3b] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1a2e3b] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1a2e3b] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-1"
          style={{ background: 'rgba(255,253,249,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-[#334155] transition-all duration-200"
              style={{ color: '#334155' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,140,66,0.08)'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#fases')}
            className="mt-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b9d 100%)' }}
          >
            🌱 Ver Programa
          </button>
        </div>
      )}
    </header>
  );
}
