'use client';

import React from 'react';
import { useRecompensas } from './RecompensasContext';
import Dashboard from './Dashboard';
import TiendaPremios from './TiendaPremios';
import ImportanciaCRED from './ImportanciaCRED';
import EducacionVideos from './EducacionVideos';
import Donativos from './Donativos';
import AuthModal from './AuthModal';
import SorteoMensual from './SorteoMensual';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', emoji: '📊' },
  { id: 'tienda', label: 'Tienda de Premios', emoji: '🛍️' },
  { id: 'sorteo', label: 'Sorteo Mensual', emoji: '🎰' },
  { id: 'importancia', label: 'Importancia CRED', emoji: '💡' },
  { id: 'educacion', label: 'Educación y Videos', emoji: '🎥' },
  { id: 'donativos', label: 'Donativos', emoji: '💚' },
];

export default function RecompensasLayout() {
  const { user, isLoggedIn, activeTab, setActiveTab, showAuthModal, setShowAuthModal, setAuthMode, logout } = useRecompensas();

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tienda': return <TiendaPremios />;
      case 'sorteo': return <SorteoMensual />;
      case 'importancia': return <ImportanciaCRED />;
      case 'educacion': return <EducacionVideos />;
      case 'donativos': return <Donativos />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg font-black"
              style={{ background: 'linear-gradient(135deg, #059669, #0284c7)' }}>
              🌱
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-black" style={{ background: 'linear-gradient(135deg, #047857, #0369a1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                MiPequeCrece
              </div>
              <div className="text-xs text-slate-400 font-medium">Programa CRED · Huánuco</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-emerald-50 text-emerald-700' :'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {tab?.emoji} {tab?.label}
              </button>
            ))}
          </nav>

          {/* Mobile Nav */}
          <div className="flex lg:hidden items-center gap-1 overflow-x-auto">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-emerald-50 text-emerald-700' :'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab?.emoji}
              </button>
            ))}
          </div>

          {/* User widget */}
          <div className="flex items-center gap-2 shrink-0">
            {isLoggedIn && user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black"
                    style={{ background: 'linear-gradient(135deg, #059669, #0284c7)' }}>
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{user?.name?.split(' ')?.[0]}</div>
                    <div className="text-xs text-emerald-600 font-semibold">🪙 {user?.points?.toLocaleString('es-PE')} pts</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  title="Cerrar sesión"
                >
                  ⏻
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #059669, #0284c7)' }}
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {renderTab()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600">🌱</span>
            <span className="text-sm font-bold text-slate-800">MiPequeCrece © 2026 - Huánuco, Perú</span>
          </div>
          <p className="text-xs text-slate-500">Sistema Gamificado de Incentivos para el Control de Crecimiento y Desarrollo Infantil.</p>
        </div>
      </footer>

      {showAuthModal && <AuthModal />}
    </div>
  );
}
