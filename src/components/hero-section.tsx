
"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { type Solution } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  id: string;
  solutions: Solution[];
  activeSolution: Solution;
  setActiveSolution: (solution: Solution) => void;
}

const SLIDE_DURATION = 5000; // 5 seconds

export default function HeroSection({ id, solutions, activeSolution, setActiveSolution }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const solutionChangeInterval = useRef<NodeJS.Timeout | null>(null);

  const imageUrl = useMemo(() =>
    activeSolution.imageUrl,
    [activeSolution]
  );

  const scheduleNextSolution = () => {
    if (solutionChangeInterval.current) {
      clearInterval(solutionChangeInterval.current);
    }
    solutionChangeInterval.current = setInterval(() => {
      const currentIndex = solutions.findIndex(s => s.id === activeSolution.id);
      const nextIndex = (currentIndex + 1) % solutions.length;
      handleSolutionChange(solutions[nextIndex], true);
    }, SLIDE_DURATION);
  };
  
  useEffect(() => {
    scheduleNextSolution();
    return () => {
      if (solutionChangeInterval.current) {
        clearInterval(solutionChangeInterval.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSolution, solutions]);

  const handleSolutionChange = (solution: Solution, auto: boolean = false) => {
    if (solution.id === activeSolution.id) return;
    setActiveSolution(solution);
    if (!auto) {
        scheduleNextSolution(); // Restart timer on manual change
    }
  };
  
  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-accent', activeSolution.themeColor);
  }, [activeSolution]);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] // A more cinematic ease
      }
    },
  };

  return (
    <section ref={heroRef} id={id} className="relative h-screen text-primary-foreground">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={imageUrl}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={imageUrl}
                alt={`Image for ${activeSolution.name}`}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content */}
        <div className="relative z-20 h-full container mx-auto px-4 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolution.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-12 gap-4 w-full"
            >
              <div className="col-span-12 md:col-span-7 lg:col-span-6">
                <motion.h1 variants={itemVariants} className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-wider" style={{ color: activeSolution.themeColor }}>
                  {activeSolution.name}
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-4 text-lg md:text-xl text-primary-foreground/90 max-w-lg">
                  {activeSolution.subtitle}
                </motion.p>
                <motion.p variants={itemVariants} className="mt-2 text-base text-primary-foreground/70 max-w-lg">
                  {activeSolution.description}
                </motion.p>
                <motion.div variants={itemVariants} className="mt-8">
                  <motion.a
                    href="#solutions"
                    whileHover={{ scale: 1.02 }}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out bg-black/20 border border-white/20 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                      boxShadow: `0 0 20px 5px ${activeSolution.themeColor}, inset 0 0 10px ${activeSolution.themeColor}`,
                      border: `1px solid ${activeSolution.themeColor}`
                    }} />
                    <span className="relative">Explore {activeSolution.mode} Solution</span>
                    <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.a>
                </motion.div>
              </div>
              <div className="hidden md:flex md:col-span-1 md:col-start-12 items-center justify-center">
                <motion.div variants={itemVariants} className="flex flex-col space-y-6">
                  {solutions.map(sol => (
                    <button
                      key={sol.id}
                      onClick={() => handleSolutionChange(sol)}
                      className="relative flex h-8 w-8 items-center justify-center rounded-full"
                      aria-label={`Select ${sol.name}`}
                    >
                      <div className="h-full w-px bg-white/20 absolute" />
                      <AnimatePresence>
                        {activeSolution.id === sol.id && (
                          <motion.div
                            key={`${sol.id}-progress`}
                            initial={{ height: '0%' }}
                            animate={{ height: '100%' }}
                            transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                            className="absolute bottom-0 left-0 w-full h-full"
                          >
                            <div className="w-px h-full mx-auto" style={{background: activeSolution.themeColor, boxShadow: `0 0 5px ${activeSolution.themeColor}`}}/>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className={cn(
                        "relative h-2 w-2 rounded-full transition-colors duration-300",
                        activeSolution.id === sol.id ? 'bg-primary' : 'bg-white/50 group-hover:bg-white'
                      )} style={{backgroundColor: activeSolution.id === sol.id ? activeSolution.themeColor : undefined}}></div>

                      <span className="sr-only">{sol.name}</span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
