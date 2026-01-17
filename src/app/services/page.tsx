
"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { services } from '@/lib/services-data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    },
  },
};


export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <h1 className="text-4xl font-bold font-headline text-primary text-center">Our Services</h1>
            <p className="mt-4 text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              From advanced camera systems to robust fire alarms, we offer a complete suite of security products to build a comprehensive safety net for your property. Explore our offerings below.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.name} variants={itemVariants}>
                 <Link href={`/services/${service.slug}`} className="h-full block">
                  <Card className="text-center h-full hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
                    <CardHeader className="flex-grow">
                      <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                        <service.icon className="size-10" />
                      </div>
                      <CardTitle className="font-headline text-2xl pt-4">{service.name}</CardTitle>
                      <CardDescription className="text-base pt-2">{service.description}</CardDescription>
                    </CardHeader>
                    <div className="p-4 pt-0">
                       <Button variant="link" className="text-primary">
                        Learn More <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
