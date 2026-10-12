'use client';

import React from 'react';
import { useRecompensas } from './RecompensasContext';

export default function Dashboard() {
  const { user, isLoggedIn, setActiveTab, setShowAuthModal, setAuthMode, registerAttendance } = useRecompensas();

  if (!isLoggedIn || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6" style={{ background: 'linear-gradient(135deg, #dcfce7, #e0f2fe)' }}>
          🌱
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-3">Bienvenido a MiPequeCrece</h2>
        <p className="text-slate-500 text-sm max-w-md mb-8">Inicia sesión o regístrate para acceder a tu panel de control, acumular puntos y canjear premios por asistir al Control CRED.</p>
        <div className="flex gap-3">
          <button
            onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
            className="px-6 py-3 rounded-xl font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
            className="px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #059669, #0284c7)' }}
          >
            Registrarse Gratis 🎁
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Puntos Disponibles', value: user?.points?.toLocaleString(), emoji: '🪙', bg: '#dcfce7', color: '#059669' },
    { label: 'Nivel de Usuario', value: 'Padre Comprometido', emoji: '🏆', bg: '#e0f2fe', color: '#0284c7' },
    { label: 'Citas CRED Asistidas', value: `${user?.attendedControls} Controles`, emoji: '📅', bg: '#fef3c7', color: '#d97706' },
    { label: 'Centro de Salud', value: user?.healthCenter, emoji: '🏥', bg: '#d1fae5', color: '#059669' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-white shadow-xl"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)' }}>
        <div className="absolute top-0 right-0 text-[200px] leading-none opacity-10 pointer-events-none select-none">
          👶
        </div>
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
            style={{ background: 'rgba(255,255,255,0.2)' }}>
            Panel de Control Principal
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-2">¡Hola, {user?.name?.split(' ')?.[0]}!</h1>
          <p className="text-emerald-100 text-sm md:text-base mb-6 max-w-lg">
            Tienes <strong>{user?.points?.toLocaleString()} puntos</strong> disponibles. Sigue asistiendo al control CRED de {user?.childName} para ganar más premios.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('tienda')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-emerald-700 bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm"
            >
              🛍️ Ir a la Tienda de Premios
            </button>
            <button
              onClick={registerAttendance}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white border border-white/30 text-sm transition-all duration-200 hover:bg-white/10"
              style={{ background: 'rgba(4,120,87,0.5)' }}
            >
              📅 Registrar Asistencia CRED (+500 pts)
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
              style={{ background: stat?.bg }}>
              {stat?.emoji}
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat?.label}</div>
            <div className="text-xl font-black text-slate-800 leading-tight">{stat?.value}</div>
          </div>
        ))}
      </div>

      {/* Activity + Appointment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* History */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-slate-800">Historial de Mis Canjes y Puntos</h2>
            <button onClick={() => setActiveTab('tienda')} className="text-sm text-emerald-600 font-semibold hover:underline">
              Ver Catálogo →
            </button>
          </div>
          {user?.history?.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No hay movimientos aún.</p>
          ) : (
            <div className="space-y-3">
              {user?.history?.map(item => (
                <div key={item?.id} className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: item?.type === 'earn' ? '#dcfce7' : '#fef3c7' }}>
                    {item?.type === 'earn' ? '🎁' : '🛍️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 truncate">{item?.description}</div>
                    <div className="text-xs text-slate-400">{item?.date}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                    item?.type === 'earn' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item?.type === 'earn' ? '+' : ''}{item?.points?.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Appointment */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-black text-slate-800 mb-5">Próxima Cita CRED</h2>
          <div className="rounded-2xl p-5 border mb-4" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                style={{ background: '#0284c7' }}>
                ⏰
              </div>
              <div>
                <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">Programada</div>
                <div className="text-sm font-black text-slate-800">Control de 9 Meses</div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-sky-600">📅</span>
                <span className="font-semibold">20 de Octubre, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-600">📍</span>
                <span>{user?.healthCenter}, Huánuco</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-4 border" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
            <div className="flex items-start gap-2">
              <span className="text-amber-500 text-lg">💡</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                Asiste puntualmente a tu próxima cita y recibirás automáticamente <strong>+500 puntos</strong> canjeables en la tienda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
