'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

interface HuanucoMapProps {
  healthPoints: HealthPoint[];
  selectedPoint: number | null;
  onSelectPoint: (id: number | null) => void;
}

function MapController({ selectedPoint, healthPoints }: { selectedPoint: number | null; healthPoints: HealthPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedPoint) {
      const point = healthPoints.find(p => p.id === selectedPoint);
      if (point) {
        map.setView([point.lat, point.lng], 15, { animate: true });
      }
    }
  }, [selectedPoint, healthPoints, map]);
  return null;
}

const radiusByType: Record<string, number> = {
  'Hospital': 14,
  'Centro de Salud': 10,
  'Posta Médica': 7,
};

export default function HuanucoMap({ healthPoints, selectedPoint, onSelectPoint }: HuanucoMapProps) {
  return (
    <MapContainer
      center={[-9.9306, -76.2422]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedPoint={selectedPoint} healthPoints={healthPoints} />
      {healthPoints.map((point) => (
        <CircleMarker
          key={point.id}
          center={[point.lat, point.lng]}
          radius={radiusByType[point.type] ?? 8}
          pathOptions={{
            color: 'white',
            weight: 2,
            fillColor: point.color,
            fillOpacity: selectedPoint === point.id ? 1 : 0.85,
            opacity: 1,
          }}
          eventHandlers={{
            click: () => onSelectPoint(point.id === selectedPoint ? null : point.id),
          }}
        >
          <Popup>
            <div style={{ minWidth: '200px', fontFamily: 'sans-serif' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '20px' }}>{point.icon}</span>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: point.color, margin: 0 }}>{point.type}</p>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: '#0f1923', margin: 0, lineHeight: 1.3 }}>{point.name}</p>
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 4px 0' }}>📍 Distrito: {point.district}</p>
              <p style={{ fontSize: '11px', color: '#475569', margin: 0, lineHeight: 1.5 }}>{point.desc}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
