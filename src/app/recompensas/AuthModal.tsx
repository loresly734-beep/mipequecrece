'use client';

import React, { useState } from 'react';
import { useRecompensas } from './RecompensasContext';

interface ModalState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, login, register } = useRecompensas();
  const [email, setEmail] = useState('maria.huanuco@gmail.com');
  const [password, setPassword] = useState('123456');
  const [regName, setRegName] = useState('');
  const [regChild, setRegChild] = useState('');
  const [regCenter, setRegCenter] = useState('CS Aparicio Pomares');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'success', title: '', message: '' });

  if (!showAuthModal) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setModal({ show: true, type: 'error', title: 'Credenciales incorrectas', message: 'Correo o contraseña inválidos. Usa maria.huanuco@gmail.com / 123456 para la demo.' });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(regName, regChild, regCenter, regEmail);
    setModal({ show: true, type: 'success', title: '¡Registro Exitoso!', message: `¡Bienvenida, ${regName}! Has recibido 2,500 puntos de regalo por unirte a MiPequeCrece.` });
  };

  const centers = ['CS Aparicio Pomares', 'CS Pillco Marca', 'CS Huánuco Metropolitano', 'Puesto de Salud Las Moras'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}>
      {modal.show ? (
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${modal.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            <span className="text-3xl">{modal.type === 'success' ? '✅' : '⚠️'}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{modal.title}</h3>
          <p className="text-sm text-slate-600 mb-6">{modal.message}</p>
          <button
            onClick={() => { setModal(m => ({ ...m, show: false })); setShowAuthModal(false); }}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: '#1e293b' }}
          >
            Entendido
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>

          {authMode === 'login' ? (
            <>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#dcfce7' }}>
                <span className="text-2xl">🛡️</span>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-1">Bienvenido a MiPequeCrece</h2>
              <p className="text-sm text-slate-500 mb-6">Inicia sesión para gestionar tus puntos CRED</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Contraseña</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #059669, #0284c7)' }}>
                  Ingresar al Sistema
                </button>
              </form>
              <p className="text-center text-sm text-slate-500 mt-4">
                ¿No tienes cuenta?{' '}
                <button onClick={() => setAuthMode('register')} className="text-emerald-600 font-semibold hover:underline">
                  Regístrate aquí
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#e0f2fe' }}>
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-1">Crea tu Cuenta</h2>
              <p className="text-sm text-slate-500 mb-6">Recibe <strong className="text-emerald-600">2,500 Puntos de Regalo</strong> por unirte</p>
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nombre del Padre / Madre</label>
                  <input type="text" value={regName} onChange={e => setRegName(e.target.value)} required placeholder="Ej. Rosa Mendoza"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Nombre y Edad del Niño/a</label>
                  <input type="text" value={regChild} onChange={e => setRegChild(e.target.value)} required placeholder="Ej. Carlitos (8 meses)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Centro de Salud (Huánuco)</label>
                  <select value={regCenter} onChange={e => setRegCenter(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white">
                    {centers.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                  <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Contraseña</label>
                  <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}>
                  Registrarse y Ganar Puntos 🎁
                </button>
              </form>
              <p className="text-center text-sm text-slate-500 mt-4">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => setAuthMode('login')} className="text-sky-600 font-semibold hover:underline">
                  Inicia sesión
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
