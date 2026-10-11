'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import FasesSection from './components/FasesSection';
import ImpactoSection from './components/ImpactoSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <ProblemSection />
      <FasesSection />
      <ImpactoSection />
      <Footer />
    </div>
  );
}