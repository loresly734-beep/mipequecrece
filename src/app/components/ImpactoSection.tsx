'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface HealthPoint {
  id: number;
  name: string;
  type: 'Hospital' | 'Centro de Salud' | 'Posta Médica';
  lat: number;
  lng: number;
  color: string;
  desc: string;
  icon: string;
  district: string;
}

const HEALTH_POINTS: HealthPoint[] = [
  { id: 1, name: 'Hospital Regional Hermilio Valdizán Medrano', type: 'Hospital', lat: -9.9306, lng: -76.2422, color: '#e53e3e', desc: 'Principal hospital de referencia regional. Atención pediátrica especializada y control CRED.', icon: '🏥', district: 'Huánuco' },
  { id: 2, name: 'Hospital de Contingencia Hermilio Valdizán', type: 'Hospital', lat: -9.9280, lng: -76.2390, color: '#e53e3e', desc: 'Hospital de contingencia con servicios de pediatría y emergencias.', icon: '🏥', district: 'Huánuco' },
  { id: 3, name: 'C.S. Carlos Showing Ferrari', type: 'Centro de Salud', lat: -9.9350, lng: -76.2480, color: '#00a8cc', desc: 'Centro de salud con programa CRED y atención materno-infantil.', icon: '🏨', district: 'Amarilis' },
  { id: 4, name: 'C.S. Aparicio Pomares', type: 'Centro de Salud', lat: -9.9220, lng: -76.2350, color: '#00a8cc', desc: 'Atención primaria y control de crecimiento para niños de 0-5 años en zona urbana.', icon: '🏨', district: 'Huánuco' },
  { id: 5, name: 'C.S. Llicua', type: 'Centro de Salud', lat: -9.9150, lng: -76.2280, color: '#00a8cc', desc: 'Programa CRED y educación nutricional para familias de Llicua.', icon: '🏨', district: 'Amarilis' },
  { id: 6, name: 'C.S. Amarilis', type: 'Centro de Salud', lat: -9.9400, lng: -76.2520, color: '#00a8cc', desc: 'Control de desarrollo infantil y nutrición en el distrito de Amarilis.', icon: '🏨', district: 'Amarilis' },
  { id: 7, name: 'C.S. Pillco Marca', type: 'Centro de Salud', lat: -9.9500, lng: -76.2600, color: '#00a8cc', desc: 'Seguimiento CRED y vacunación en el distrito de Pillco Marca.', icon: '🏨', district: 'Pillco Marca' },
  { id: 8, name: 'C.S. Acomayo', type: 'Centro de Salud', lat: -9.9180, lng: -76.2450, color: '#00a8cc', desc: 'Atención integral y control CRED en el sector Acomayo.', icon: '🏨', district: 'Huánuco' },
  { id: 9, name: 'Posta Médica Cayhuayna', type: 'Posta Médica', lat: -9.9460, lng: -76.2560, color: '#00c896', desc: 'Seguimiento de niños en riesgo nutricional en Cayhuayna.', icon: '🏠', district: 'Pillco Marca' },
  { id: 10, name: 'Posta Médica Huánuco Norte', type: 'Posta Médica', lat: -9.9100, lng: -76.2320, color: '#00c896', desc: 'Atención comunitaria y visitas domiciliarias en zona norte de Huánuco.', icon: '🏠', district: 'Huánuco' },
  { id: 11, name: 'Posta Médica San Luis', type: 'Posta Médica', lat: -9.9260, lng: -76.2180, color: '#00c896', desc: 'Atención integral y control CRED en el sector San Luis.', icon: '🏠', district: 'Huánuco' },
  { id: 12, name: 'Posta Médica La Esperanza', type: 'Posta Médica', lat: -9.9380, lng: -76.2300, color: '#00c896', desc: 'Atención primaria y vacunación infantil en La Esperanza.', icon: '🏠', district: 'Amarilis' },
  { id: 13, name: 'Posta Médica Supte San Jorge', type: 'Posta Médica', lat: -9.9550, lng: -76.2650, color: '#00c896', desc: 'Atención comunitaria en zona periurbana de Pillco Marca.', icon: '🏠', district: 'Pillco Marca' },
  { id: 14, name: 'C.S. Perú Corea', type: 'Centro de Salud', lat: -9.9320, lng: -76.2550, color: '#00a8cc', desc: 'Centro de salud con servicios de pediatría y control nutricional.', icon: '🏨', district: 'Amarilis' },
  { id: 15, name: 'Posta Médica Paucarbamba', type: 'Posta Médica', lat: -9.9420, lng: -76.2480, color: '#00c896', desc: 'Atención primaria y seguimiento CRED en Paucarbamba.', icon: '🏠', district: 'Amarilis' },
];

// Dynamic import to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./HuanucoMap'), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center" style={{ background: '#e8f6fb', minHeight: '400px' }}>
    <div className="text-center">
      <div className="text-4xl mb-3">🗺️</div>
      <p className="text-sm text-slate-500">Cargando mapa de Huánuco...</p>
    </div>
  </div>
)});

export default function ImpactoSection() {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
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

  const selectedFacility = HEALTH_POINTS.find(p => p.id === selectedPoint);

  return (
    <section
      id="infraestructura"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #e8f6fb 0%, #f8fafc 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(0,168,204,0.4) 0%, transparent 70%)' }}
        />
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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: 'rgba(0,168,204,0.1)',
              border: '1px solid rgba(0,168,204,0.3)',
              color: '#0090b0',
            }}
          >
            🗺️ Red de Salud
          </span>
          <h2
            className="text-section-heading font-black mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#0f1923' }}
          >
            Infraestructura y Red de Salud en Huánuco
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#475569' }}>
            Mapa real de la ciudad de Huánuco con todos sus establecimientos de salud.
            <span className="block text-sm mt-1 text-slate-400">Haz clic en cada marcador para ver detalles del establecimiento.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div
            className="lg:col-span-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
            }}
          >
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                height: '520px',
                border: '1.5px solid rgba(0,168,204,0.3)',
                boxShadow: '0 8px 40px rgba(0,168,204,0.15)',
              }}
            >
              <MapComponent
                healthPoints={HEALTH_POINTS}
                selectedPoint={selectedPoint}
                onSelectPoint={setSelectedPoint}
              />

              {/* Legend overlay */}
              <div
                className="absolute bottom-4 left-4 z-50 rounded-2xl p-3 flex flex-col gap-1.5"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,168,204,0.2)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                <p className="text-xs font-bold text-slate-600 mb-1">Leyenda</p>
                {[
                  { color: '#e53e3e', label: 'Hospital' },
                  { color: '#00a8cc', label: 'Centro de Salud' },
                  { color: '#00c896', label: 'Posta Médica' },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: l.color, boxShadow: `0 0 4px ${l.color}80` }} />
                    <span className="text-xs text-slate-600">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.8s 0.4s ease, transform 0.8s 0.4s ease',
            }}
          >
            {/* Selected facility info */}
            {selectedFacility ? (
              <div
                className="glass-panel p-5 rounded-2xl"
                style={{ border: `1.5px solid ${selectedFacility.color}40`, background: 'rgba(255,255,255,0.95)' }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{selectedFacility.icon}</span>
                  <div>
                    <span
                      className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1"
                      style={{ background: `${selectedFacility.color}15`, color: selectedFacility.color }}
                    >
                      {selectedFacility.type}
                    </span>
                    <h3 className="font-black text-sm leading-tight" style={{ color: '#0f1923', fontFamily: 'var(--font-display)' }}>
                      {selectedFacility.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">📍 {selectedFacility.district}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{selectedFacility.desc}</p>
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ✕ Cerrar
                </button>
              </div>
            ) : (
              <div
                className="rounded-2xl p-4 text-center"
                style={{
                  background: 'rgba(135,206,235,0.1)',
                  border: '1px dashed rgba(135,206,235,0.5)',
                }}
              >
                <p className="text-2xl mb-2">👆</p>
                <p className="text-xs text-slate-500">
                  Haz clic en cualquier marcador del mapa para ver información del establecimiento de salud
                </p>
              </div>
            )}

            <div className="glass-panel p-5" style={{ border: '1.5px solid rgba(0,200,150,0.3)' }}>
              <h3 className="font-black text-base mb-4" style={{ fontFamily: 'var(--font-display)', color: '#0f1923' }}>
                Red de Actores
              </h3>
              {[
                { icon: '🏥', label: 'Establecimientos de Salud', count: `${HEALTH_POINTS.length}`, color: '#00c896' },
                { icon: '👩‍⚕️', label: 'Agentes Comunitarios', count: '48', color: '#00a8cc' },
                { icon: '👨‍👩‍👧', label: 'Familias Beneficiarias', count: '2,400+', color: '#ffb347' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="font-black text-lg" style={{ color: item.color, fontFamily: 'var(--font-display)' }}>
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact metrics */}
            <div className="glass-panel p-5" style={{ border: '1.5px solid rgba(0,168,204,0.3)' }}>
              <h3 className="font-black text-base mb-4" style={{ fontFamily: 'var(--font-display)', color: '#0f1923' }}>
                Impacto Proyectado
              </h3>
              {[
                { label: 'Reducción de inasistencia', value: 65, color: '#00c896' },
                { label: 'Cobertura CRED', value: 95, color: '#00a8cc' },
                { label: 'Satisfacción familiar', value: 88, color: '#ffb347' },
              ].map((m, i) => (
                <div key={m.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-600">{m.label}</span>
                    <span className="text-xs font-bold" style={{ color: m.color }}>{m.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: m.color,
                        width: visible ? `${m.value}%` : '0%',
                        transition: `width 1.4s ${0.6 + i * 0.2}s cubic-bezier(0.22,1,0.36,1)`,
                        boxShadow: `0 0 6px ${m.color}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
