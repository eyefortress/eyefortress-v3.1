'use client';

import React, { useEffect, useRef } from 'react';
import { Award, Cpu, Wallet, Clock, Shield, TrendingUp } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  {
    icon: Award,
    title: 'Expertise You Can Trust',
    description: 'Certified professionals with military-grade training.',
  },
  {
    icon: Cpu,
    title: 'Top-Notch Technology',
    description: 'Deploying the latest AI and IR sensors available.',
  },
  {
    icon: Wallet,
    title: 'Budget Friendly',
    description: 'Custom solutions tailored to every financial plan.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock maintenance and emergency response.',
  },
  {
    icon: Shield,
    title: 'Comprehensive Security',
    description: 'End-to-end protection from perimeter to core.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Track Record',
    description: 'Consistent history of preventing security breaches.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, to, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return <span ref={ref}>0</span>;
}

export default function WhyChooseUsSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="font-headline text-4xl font-bold uppercase tracking-wider text-primary">
            Why Choose Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Unmatched Surveillance, Unrivaled Protection
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <motion.div
            className="flex flex-col items-center justify-center text-center p-8 lg:col-span-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="font-headline font-bold text-primary" style={{ fontSize: '10rem', lineHeight: 1 }}>
              <Counter to={15} />
            </div>
            <p className="font-headline text-3xl font-bold mt-4">
              Years of Experience
            </p>
            <p className="text-muted-foreground text-lg mt-1">Since 2010</p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.title} className="flex gap-4 items-start" variants={itemVariants}>
                <div className="p-3 bg-primary/10 rounded-lg text-primary mt-1">
                  <stat.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{stat.title}</h3>
                  <p className="text-muted-foreground mt-1">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}