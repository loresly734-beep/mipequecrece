'use client';

import React, { useState } from 'react';

interface ModalState {
  show: boolean;
  title: string;
  message: string;
}

export default function Donativos() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Aporte Monetario S/');
  const [amount, setAmount] = useState('');
  const [modal, setModal] = useState<ModalState>({ show: false, title: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModal({
      show: true,
      title: '¡Muchas Gracias! 💚',
      message: `Tu aporte de "${name}" ha sido registrado exitosamente. Nos pondremos en contacto contigo para coordinar la entrega en Huánuco. ¡Eres un aliado estratégico de MiPequeCrece!`,
    });
    setName('');
    setType('Aporte Monetario S/');
    setAmount('');
  };

  const benefits = [
    { emoji: '✅', text: '100% destinado a premios para familias puntuales en Huánuco' },
    { emoji: '🏅', text: 'Certificado de aporte social y reconocimiento como aliado estratégico' },
  ];

  const donorTypes = [
    { emoji: '🏢', title: 'Instituciones', desc: 'Municipalidades, ONGs y entidades públicas de Huánuco' },
    { emoji: '🏪', title: 'Empresas Locales', desc: 'Boticas, clínicas, tiendas y negocios huanuqueños' },
    { emoji: '👥', title: 'Ciudadanos', desc: 'Cualquier persona que quiera apoyar la primera infancia' },
  ];

  return (
    <div className="space-y-6">
      {/* Main grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Info */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
              style={{ background: '#dcfce7', color: '#15803d' }}>
              Apoya la Primera Infancia
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 mb-4 leading-tight">
              Haz un Donativo o Apoya a &quot;MiPequeCrece&quot;
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Los donativos sostienen el fondo de recompensas de las madres y padres que cumplen con el control CRED de sus hijos en Huánuco. Tu aporte, sea monetario o en especie, se convierte directamente en premios que incentivan la asistencia al centro de salud y mejoran la salud infantil en nuestra región.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: '#dcfce7' }}>
                    {b.emoji}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed pt-2">{b.text}</p>
                </div>
              ))}
            </div>

            {/* Donor types */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">¿Quién puede donar?</h3>
              {donorTypes.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f8fafc' }}>
                  <span className="text-2xl">{d.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{d.title}</div>
                    <div className="text-xs text-slate-500">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Formulario de Donación</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Nombre o Razón Social
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Ej. Boticas Huánuco S.A.C."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Tipo de Aporte
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                >
                  <option>Aporte Monetario S/</option>
                  <option>Donación de Pañales / Ropa / Juguetes</option>
                  <option>Alianza Institucional</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Monto (S/) o Descripción
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                  placeholder="Ej. S/ 200 o 50 paquetes de toallitas"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #059669, #0284c7)', boxShadow: '0 4px 16px rgba(5,150,105,0.3)' }}
              >
                💚 Enviar Donativo
              </button>
            </form>

            {/* Trust badge */}
            <div className="mt-5 p-4 rounded-2xl text-center" style={{ background: '#f0fdf4' }}>
              <p className="text-xs text-emerald-700 font-semibold">
                🔒 Tu información es confidencial. Nos contactaremos para coordinar la entrega en Huánuco.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: '100%', label: 'Destinado a premios para familias', emoji: '🎁' },
          { value: '18', label: 'Tipos de premios disponibles', emoji: '🛍️' },
          { value: 'Huánuco', label: 'Impacto local en la región', emoji: '📍' },
          { value: 'CRED', label: 'Programa del MINSA apoyado', emoji: '🏥' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
            <div className="text-2xl mb-2">{stat.emoji}</div>
            <div className="text-xl font-black text-emerald-700 mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500 leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl bg-emerald-100">
              💚
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{modal.title}</h3>
            <p className="text-sm text-slate-600 mb-6">{modal.message}</p>
            <button
              onClick={() => setModal(m => ({ ...m, show: false }))}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: '#1e293b' }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
