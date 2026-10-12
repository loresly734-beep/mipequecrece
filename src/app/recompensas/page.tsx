import React from 'react';
import { RecompensasProvider } from './RecompensasContext';
import RecompensasLayout from './RecompensasLayout';

export default function RecompensasPage() {
  return (
    <RecompensasProvider>
      <RecompensasLayout />
    </RecompensasProvider>
  );
}
