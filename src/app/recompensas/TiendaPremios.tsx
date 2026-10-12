'use client';

import React, { useState } from 'react';
import { useRecompensas } from './RecompensasContext';

interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  emoji: string;
  bg: string;
  category: string;
}

const rewards: Reward[] = [
  // --- VÍVERES ---
  { id: 101, name: 'Bolsa de arroz extra (5 kg)', description: 'Arroz blanco de grano largo, rendidor y nutritivo', points: 1500, emoji: '🌾', bg: '#fef9c3', category: 'Víveres' },
  { id: 102, name: 'Aceite vegetal (1 litro)', description: 'Aceite de girasol para cocinar saludable', points: 1200, emoji: '🫙', bg: '#fef3c7', category: 'Víveres' },
  { id: 103, name: 'Azúcar blanca (2 kg)', description: 'Azúcar refinada para el hogar', points: 1000, emoji: '🍬', bg: '#fffbeb', category: 'Víveres' },
  { id: 104, name: 'Frijoles negros (1 kg)', description: 'Frijoles secos ricos en proteína y hierro', points: 900, emoji: '🫘', bg: '#fdf4ff', category: 'Víveres' },
  { id: 105, name: 'Avena instantánea (500 g)', description: 'Avena nutritiva para el desayuno familiar', points: 800, emoji: '🥣', bg: '#fef3c7', category: 'Víveres' },
  { id: 106, name: 'Leche evaporada (pack x6 latas)', description: 'Leche entera evaporada, ideal para niños', points: 2000, emoji: '🥛', bg: '#e0f2fe', category: 'Víveres' },
  { id: 107, name: 'Fideos spaghetti (pack x3 bolsas)', description: 'Pasta de trigo para comidas rápidas y nutritivas', points: 1100, emoji: '🍝', bg: '#fef9c3', category: 'Víveres' },
  { id: 108, name: 'Sal yodada (1 kg)', description: 'Sal con yodo para prevenir deficiencias nutricionales', points: 500, emoji: '🧂', bg: '#f0fdf4', category: 'Víveres' },
  { id: 109, name: 'Lentejas (1 kg)', description: 'Legumbre rica en hierro y proteínas vegetales', points: 950, emoji: '🫘', bg: '#d1fae5', category: 'Víveres' },
  { id: 110, name: 'Atún en lata (pack x4)', description: 'Proteína de alta calidad para toda la familia', points: 1800, emoji: '🐟', bg: '#cffafe', category: 'Víveres' },
  { id: 111, name: 'Quinua orgánica (500 g)', description: 'Superalimento andino rico en proteínas y minerales', points: 2200, emoji: '🌿', bg: '#dcfce7', category: 'Víveres' },
  { id: 112, name: 'Harina de trigo (1 kg)', description: 'Harina multiusos para preparar pan y tortillas', points: 700, emoji: '🌾', bg: '#fef3c7', category: 'Víveres' },
  { id: 113, name: 'Aceite de oliva extra virgen (500 ml)', description: 'Aceite premium para ensaladas y cocina saludable', points: 2500, emoji: '🫒', bg: '#d1fae5', category: 'Víveres' },
  { id: 114, name: 'Maíz morado (500 g)', description: 'Maíz andino para chicha morada y postres', points: 1000, emoji: '🌽', bg: '#ede9fe', category: 'Víveres' },
  { id: 115, name: 'Canasta básica familiar (arroz+frijoles+aceite)', description: 'Combo de víveres esenciales para una semana', points: 4500, emoji: '🧺', bg: '#fef9c3', category: 'Víveres' },

  // --- JUGUETES ---
  { id: 201, name: 'Juguete didáctico de encaje Montessori', description: 'Estimula la coordinación y el aprendizaje', points: 6000, emoji: '🧩', bg: '#f3e8ff', category: 'Juguetes' },
  { id: 202, name: 'Set de bloques de construcción (50 piezas)', description: 'Bloques coloridos para desarrollar creatividad', points: 5500, emoji: '🏗️', bg: '#dbeafe', category: 'Juguetes' },
  { id: 203, name: 'Pelota de goma suave multicolor', description: 'Pelota segura para bebés y niños pequeños', points: 2000, emoji: '⚽', bg: '#dcfce7', category: 'Juguetes' },
  { id: 204, name: 'Muñeca de tela artesanal', description: 'Muñeca suave y segura para niñas de 1 a 4 años', points: 3500, emoji: '🪆', bg: '#ffe4e6', category: 'Juguetes' },
  { id: 205, name: 'Carrito de madera de empuje', description: 'Ayuda al bebé a dar sus primeros pasos', points: 7000, emoji: '🚗', bg: '#fef3c7', category: 'Juguetes' },
  { id: 206, name: 'Xilófono de colores para bebé', description: 'Instrumento musical que estimula el oído y la motricidad', points: 4000, emoji: '🎵', bg: '#e0f2fe', category: 'Juguetes' },
  { id: 207, name: 'Rompecabezas de animales (12 piezas)', description: 'Puzzle de madera con animales del Perú', points: 3000, emoji: '🦙', bg: '#d1fae5', category: 'Juguetes' },
  { id: 208, name: 'Kit de plastilina no tóxica (8 colores)', description: 'Plastilina segura para desarrollar creatividad', points: 2500, emoji: '🎨', bg: '#fdf4ff', category: 'Juguetes' },
  { id: 209, name: 'Libro de tela con texturas para bebé', description: 'Estimulación sensorial con páginas de tela suave', points: 3200, emoji: '📚', bg: '#cffafe', category: 'Juguetes' },
  { id: 210, name: 'Sonajero y mordedor de silicona', description: 'Seguro para la dentición del bebé, libre de BPA', points: 1800, emoji: '🔔', bg: '#ffe4e6', category: 'Juguetes' },
  { id: 211, name: 'Set de juego de cocina de madera', description: 'Juego de roles con utensilios de cocina de madera', points: 8000, emoji: '🍳', bg: '#fef9c3', category: 'Juguetes' },
  { id: 212, name: 'Bicicleta de equilibrio sin pedales', description: 'Desarrolla el equilibrio y la coordinación', points: 16000, emoji: '🚲', bg: '#ede9fe', category: 'Juguetes' },
  { id: 213, name: 'Pelota de fútbol infantil N°3', description: 'Pelota oficial tamaño infantil para jugar al aire libre', points: 4500, emoji: '⚽', bg: '#dcfce7', category: 'Juguetes' },
  { id: 214, name: 'Títeres de mano (set de 4 animales)', description: 'Títeres para estimular el lenguaje y la imaginación', points: 3800, emoji: '🐻', bg: '#fdf4ff', category: 'Juguetes' },

  // --- SALUD Y CUIDADO ---
  { id: 301, name: 'Paquete de toallitas húmedas hipoalergénicas', description: 'Suaves y seguras para la piel del bebé', points: 1000, emoji: '🧴', bg: '#dcfce7', category: 'Salud' },
  { id: 302, name: 'Termómetro digital clínico flexible', description: 'Medición precisa y segura para niños', points: 2000, emoji: '🌡️', bg: '#e0f2fe', category: 'Salud' },
  { id: 303, name: 'Jarabe vitamínico de hierro infantil', description: 'Prevención de anemia en la primera infancia', points: 3000, emoji: '💊', bg: '#d1fae5', category: 'Salud' },
  { id: 304, name: 'Paquete familiar de pañales etapa 3 o 4', description: 'Comodidad y protección para tu bebé', points: 4000, emoji: '📦', bg: '#fef3c7', category: 'Salud' },
  { id: 305, name: 'Kit de aseo e higiene dental infantil', description: 'Cepillo, pasta y hilo dental para niños', points: 2800, emoji: '🦷', bg: '#ccfbf1', category: 'Salud' },
  { id: 306, name: 'Botiquín de primeros auxilios familiar', description: 'Preparación ante emergencias en el hogar', points: 5000, emoji: '🩺', bg: '#fee2e2', category: 'Salud' },
  { id: 307, name: 'Nebulizador portátil ultrasónico', description: 'Tratamiento respiratorio en casa', points: 15000, emoji: '💨', bg: '#e0f2fe', category: 'Salud' },
  { id: 308, name: 'Vaso entrenador anti-derrames libre de BPA', description: 'Transición segura del biberón al vaso', points: 1500, emoji: '🥤', bg: '#ffe4e6', category: 'Salud' },

  // --- ROPA Y ACCESORIOS ---
  { id: 401, name: 'Ropa térmica infantil para clima de Huánuco', description: 'Abrigo ideal para el frío andino', points: 5000, emoji: '👕', bg: '#ede9fe', category: 'Ropa' },
  { id: 402, name: 'Zapatitos ergonómicos para primeros pasos', description: 'Soporte ideal para el desarrollo del pie', points: 6500, emoji: '👟', bg: '#cffafe', category: 'Ropa' },
  { id: 403, name: 'Gorro y guantes de lana artesanal', description: 'Tejido a mano, abriga del frío de la sierra', points: 3000, emoji: '🧤', bg: '#fdf4ff', category: 'Ropa' },
  { id: 404, name: 'Pijama de polar para bebé (0-12 meses)', description: 'Suave y cálida para las noches frías', points: 4200, emoji: '🌙', bg: '#dbeafe', category: 'Ropa' },
  { id: 405, name: 'Mochila ergonómica portabebé frontal', description: 'Carga cómoda y segura para el bebé', points: 14000, emoji: '🎒', bg: '#e0e7ff', category: 'Ropa' },
];

const categories = ['Todos', 'Víveres', 'Juguetes', 'Salud', 'Ropa'];

const categoryColors: Record<string, string> = {
  Todos: '#1e293b',
  Víveres: '#92400e',
  Juguetes: '#7c3aed',
  Salud: '#065f46',
  Ropa: '#1d4ed8',
};

const categoryBgs: Record<string, string> = {
  Todos: '#f1f5f9',
  Víveres: '#fef3c7',
  Juguetes: '#ede9fe',
  Salud: '#d1fae5',
  Ropa: '#dbeafe',
};

interface ModalState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export default function TiendaPremios() {
  const { user, isLoggedIn, redeemReward, setShowAuthModal, setAuthMode } = useRecompensas();
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'success', title: '', message: '' });
  const [activeCategory, setActiveCategory] = useState('Todos');

  const handleRedeem = (reward: Reward) => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    const result = redeemReward(reward.name, reward.points);
    if (result.success) {
      setModal({
        show: true,
        type: 'success',
        title: '¡Premio Canjeado! 🎉',
        message: `Has canjeado "${reward.name}". Tu código de recojo es: ${result.code}. Preséntalo en tu centro de salud.`,
      });
    } else {
      setModal({ show: true, type: 'error', title: 'Puntos Insuficientes', message: result.message });
    }
  };

  const currentPoints = user?.points ?? 0;
  const filtered = activeCategory === 'Todos' ? rewards : rewards.filter(r => r.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Tienda de Recompensas MiPequeCrece</h1>
            <p className="text-slate-500 text-sm mt-1">Canjea tus puntos CRED por artículos certificados de cuidado infantil en Huánuco</p>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border shrink-0" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <span className="text-xl">👛</span>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tus Puntos Actuales</div>
              <div className="text-xl font-black text-emerald-700">{currentPoints.toLocaleString('es-PE')} pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border"
              style={{
                background: isActive ? categoryColors[cat] : categoryBgs[cat],
                color: isActive ? '#fff' : categoryColors[cat],
                borderColor: isActive ? categoryColors[cat] : 'transparent',
              }}
            >
              {cat === 'Todos' && '🛍️ '}
              {cat === 'Víveres' && '🌾 '}
              {cat === 'Juguetes' && '🧩 '}
              {cat === 'Salud' && '💊 '}
              {cat === 'Ropa' && '👕 '}
              {cat}
              <span className="ml-1 opacity-70 text-xs">
                ({cat === 'Todos' ? rewards.length : rewards.filter(r => r.category === cat).length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(reward => {
          const canAfford = currentPoints >= reward.points;
          return (
            <div key={reward.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: reward.bg }}>
                  {reward.emoji}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    canAfford ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {reward.points.toLocaleString('es-PE')} pts
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: categoryBgs[reward.category], color: categoryColors[reward.category] }}>
                    {reward.category}
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1 leading-snug">{reward.name}</h3>
              <p className="text-xs text-slate-500 mb-4 flex-1">{reward.description}</p>
              <button
                onClick={() => handleRedeem(reward)}
                disabled={isLoggedIn && !canAfford}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  !isLoggedIn
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : canAfford
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {!isLoggedIn ? 'Iniciar Sesión para Canjear' : canAfford ? '🎁 Canjear Premio' : `Faltan ${(reward.points - currentPoints).toLocaleString('es-PE')} pts`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ${
              modal.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'
            }`}>
              {modal.type === 'success' ? '✅' : '⚠️'}
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
