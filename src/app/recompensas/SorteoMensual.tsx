'use client';

import React, { useState } from 'react';
import { useRecompensas } from './RecompensasContext';

interface SorteoItem {
  id: number;
  name: string;
  emoji: string;
  bg: string;
  value: number;
  category: string;
}

interface ModalState {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const TICKET_COST = 500;

const sorteoItems: SorteoItem[] = [
  { id: 1, name: 'Canasta básica familiar', emoji: '🧺', bg: '#fef9c3', value: 4500, category: 'Víveres' },
  { id: 2, name: 'Bicicleta de equilibrio sin pedales', emoji: '🚲', bg: '#ede9fe', value: 16000, category: 'Juguetes' },
  { id: 3, name: 'Nebulizador portátil ultrasónico', emoji: '💨', bg: '#e0f2fe', value: 15000, category: 'Salud' },
  { id: 4, name: 'Mochila ergonómica portabebé frontal', emoji: '🎒', bg: '#e0e7ff', value: 14000, category: 'Ropa' },
  { id: 5, name: 'Juguete didáctico Montessori', emoji: '🧩', bg: '#f3e8ff', value: 6000, category: 'Juguetes' },
  { id: 6, name: 'Botiquín de primeros auxilios familiar', emoji: '🩺', bg: '#fee2e2', value: 5000, category: 'Salud' },
];

const DRAW_DATE = 'Noviembre 30, 2026';
const TOTAL_TICKETS = 200;
const SOLD_TICKETS = 87;

export default function SorteoMensual() {
  const { user, isLoggedIn, setShowAuthModal, setAuthMode } = useRecompensas();
  const [ticketsToBuy, setTicketsToBuy] = useState(1);
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'success', title: '', message: '' });
  const [myTickets, setMyTickets] = useState(0);
  const [localPoints, setLocalPoints] = useState<number | null>(null);

  const currentPoints = localPoints !== null ? localPoints : (user?.points ?? 0);
  const totalCost = ticketsToBuy * TICKET_COST;
  const canAfford = currentPoints >= totalCost;
  const progressPct = Math.round((SOLD_TICKETS / TOTAL_TICKETS) * 100);

  const handleBuyTickets = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    if (!canAfford) {
      setModal({
        show: true,
        type: 'error',
        title: 'Puntos Insuficientes',
        message: `Necesitas ${totalCost.toLocaleString('es-PE')} pts para comprar ${ticketsToBuy} boleto${ticketsToBuy > 1 ? 's' : ''}. Te faltan ${(totalCost - currentPoints).toLocaleString('es-PE')} pts.`,
      });
      return;
    }
    const newPoints = currentPoints - totalCost;
    setLocalPoints(newPoints);
    setMyTickets(prev => prev + ticketsToBuy);
    setModal({
      show: true,
      type: 'success',
      title: '¡Boletos Comprados! 🎟️',
      message: `Compraste ${ticketsToBuy} boleto${ticketsToBuy > 1 ? 's' : ''} para el sorteo de Noviembre. Ahora tienes ${myTickets + ticketsToBuy} boleto${myTickets + ticketsToBuy !== 1 ? 's' : ''} en total. ¡Mucha suerte!`,
    });
    setTicketsToBuy(1);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">🎰</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80 bg-white bg-opacity-20 px-3 py-1 rounded-full">Sorteo Mensual</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mb-1">Gran Sorteo de Noviembre</h1>
              <p className="text-sm opacity-80">Usa tus puntos CRED para comprar boletos y ganar premios de la tienda</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
              <div className="bg-white bg-opacity-20 rounded-2xl px-5 py-3 text-center">
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">Fecha del Sorteo</div>
                <div className="text-lg font-black">{DRAW_DATE}</div>
              </div>
              {isLoggedIn && (
                <div className="bg-white bg-opacity-20 rounded-2xl px-5 py-3 text-center">
                  <div className="text-xs font-bold uppercase tracking-wider opacity-80">Tus Puntos</div>
                  <div className="text-lg font-black">{currentPoints.toLocaleString('es-PE')} pts</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Buy Tickets */}
        <div className="lg:col-span-1 space-y-5">
          {/* Ticket Purchase Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-1">🎟️ Comprar Boletos</h2>
            <p className="text-xs text-slate-500 mb-5">Cada boleto cuesta <span className="font-bold text-violet-700">{TICKET_COST.toLocaleString('es-PE')} puntos</span></p>

            {/* Ticket count selector */}
            <div className="mb-5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Cantidad de boletos</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTicketsToBuy(t => Math.max(1, t - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-black text-lg hover:bg-slate-200 transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-black text-violet-700">{ticketsToBuy}</span>
                </div>
                <button
                  onClick={() => setTicketsToBuy(t => Math.min(20, t + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-black text-lg hover:bg-slate-200 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Quick select */}
            <div className="flex gap-2 mb-5">
              {[1, 3, 5, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setTicketsToBuy(n)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    ticketsToBuy === n ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  x{n}
                </button>
              ))}
            </div>

            {/* Cost summary */}
            <div className="rounded-2xl p-4 mb-5" style={{ background: '#f5f3ff' }}>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Boletos × {ticketsToBuy}</span>
                <span>{totalCost.toLocaleString('es-PE')} pts</span>
              </div>
              {isLoggedIn && (
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Puntos disponibles</span>
                  <span className={canAfford ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                    {currentPoints.toLocaleString('es-PE')} pts
                  </span>
                </div>
              )}
              <div className="border-t border-violet-200 mt-2 pt-2 flex justify-between text-sm font-black">
                <span className="text-slate-800">Total a pagar</span>
                <span className="text-violet-700">{totalCost.toLocaleString('es-PE')} pts</span>
              </div>
            </div>

            <button
              onClick={handleBuyTickets}
              className={`w-full py-3 rounded-2xl text-sm font-black transition-all duration-200 ${
                !isLoggedIn
                  ? 'text-white hover:opacity-90'
                  : canAfford
                  ? 'text-white hover:opacity-90 hover:shadow-lg'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              style={!isLoggedIn || canAfford ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}
            >
              {!isLoggedIn ? '🔐 Iniciar Sesión para Participar' : canAfford ? '🎟️ Comprar Boletos' : '⚠️ Puntos Insuficientes'}
            </button>

            {/* My tickets */}
            {isLoggedIn && myTickets > 0 && (
              <div className="mt-4 rounded-2xl p-4 text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div className="text-2xl font-black text-emerald-700">{myTickets}</div>
                <div className="text-xs font-bold text-emerald-600">boleto{myTickets !== 1 ? 's' : ''} en este sorteo</div>
              </div>
            )}
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 mb-4">📊 Estado del Sorteo</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Boletos vendidos</span>
                <span className="font-bold">{SOLD_TICKETS} / {TOTAL_TICKETS}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #7c3aed, #db2777)' }}
                />
              </div>
              <div className="text-xs text-slate-500 text-right">{progressPct}% vendido</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-3 text-center" style={{ background: '#f5f3ff' }}>
                <div className="text-lg font-black text-violet-700">{TOTAL_TICKETS - SOLD_TICKETS}</div>
                <div className="text-xs text-slate-500">boletos restantes</div>
              </div>
              <div className="rounded-2xl p-3 text-center" style={{ background: '#fdf2f8' }}>
                <div className="text-lg font-black text-pink-600">{SOLD_TICKETS}</div>
                <div className="text-xs text-slate-500">participantes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Prizes */}
        <div className="lg:col-span-2 space-y-5">
          {/* Prizes this month */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-black text-slate-800">🏆 Premios de Este Mes</h2>
                <p className="text-xs text-slate-500 mt-0.5">Artículos de la tienda de recompensas que se sortearán</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                {sorteoItems.length} premios
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sorteoItems.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-violet-200 transition-colors">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: item.bg }}>
                      {item.emoji}
                    </div>
                    <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 leading-snug truncate">{item.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.category}</div>
                    <div className="text-xs font-bold text-violet-600 mt-0.5">Valor: {item.value.toLocaleString('es-PE')} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-5">📋 ¿Cómo Funciona el Sorteo?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { step: '1', icon: '🪙', title: 'Acumula Puntos', desc: 'Asiste a tus controles CRED y gana puntos por cada visita registrada.' },
                { step: '2', icon: '🎟️', title: 'Compra Boletos', desc: `Cada boleto cuesta ${TICKET_COST.toLocaleString('es-PE')} puntos. Puedes comprar hasta 20 boletos por sorteo.` },
                { step: '3', icon: '🎰', title: 'Espera el Sorteo', desc: `El sorteo se realiza el último día de cada mes. Todos los boletos participan automáticamente.` },
                { step: '4', icon: '🏆', title: 'Recoge tu Premio', desc: 'Si ganas, recibirás un código de recojo para presentar en tu centro de salud.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4 p-4 rounded-2xl" style={{ background: '#f8fafc' }}>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0" style={{ background: '#f5f3ff' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="rounded-2xl p-5 border" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">⚠️</span>
              <div>
                <div className="text-sm font-black text-amber-800 mb-1">Términos del Sorteo</div>
                <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                  <li>Los puntos usados para boletos no son reembolsables.</li>
                  <li>Máximo 20 boletos por participante por sorteo mensual.</li>
                  <li>El sorteo se realiza de forma aleatoria el último día del mes.</li>
                  <li>Los ganadores serán notificados y tendrán 15 días para recoger su premio.</li>
                  <li>Solo participantes con cuenta activa y controles CRED al día.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ${
              modal.type === 'success' ? 'bg-violet-100' : 'bg-rose-100'
            }`}>
              {modal.type === 'success' ? '🎟️' : '⚠️'}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{modal.title}</h3>
            <p className="text-sm text-slate-600 mb-6">{modal.message}</p>
            <button
              onClick={() => setModal(m => ({ ...m, show: false }))}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
