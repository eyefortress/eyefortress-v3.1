'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { solutions, type Solution } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import SolutionsSection from '@/components/solutions-section';
import ServicesSection from '@/components/services-section';
import ContactSection from '@/components/contact-section';
import LoadingOverlay from '@/components/loading-overlay';
import FaqSection from '@/components/faq-section';
import WhyChooseUsSection from '@/components/why-choose-us-section';
import FounderQuoteSection from '@/components/founder-quote-section';
import ClientDebriefsSection from '@/components/client-debriefs-section';

export default function Home() {
  const [activeSolution, setActiveSolution] = useState<Solution>(solutions[0]);
  const [loading, setLoading] = useState(true);
  const aboutImage = useMemo(() => PlaceHolderImages.find(img => img.id === 'about-image'), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection
          id="home"
          solutions={solutions}
          activeSolution={activeSolution}
          setActiveSolution={setActiveSolution}
        />
        <AboutSection id="about" image={aboutImage} />
        <WhyChooseUsSection id="why-us-section" />
        <FounderQuoteSection id="founder-quote" />
        <SolutionsSection id="solutions" />
        <ServicesSection id="services" />
        <ClientDebriefsSection id="testimonials" />
        <FaqSection id="faq" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </div>
  );
}
