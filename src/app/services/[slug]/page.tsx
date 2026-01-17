'use client';

import { notFound } from 'next/navigation';
import { services } from '@/lib/services-data';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { motion } from 'framer-motion';

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service || !service.details) {
    notFound();
  }

  const containerVariants = {
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Header />
      <main className="flex-grow pt-20">
        <motion.div 
          className="bg-secondary"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="container mx-auto px-4 py-12">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/services">Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{service.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-6 mt-6">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <service.icon className="size-12" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold font-headline text-primary">
                        {service.name}
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground max-w-3xl">
                        {service.description}
                    </p>
                </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="container mx-auto px-4 py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl font-headline font-semibold mb-4">Service Overview</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {service.details.introduction}
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-12">
                    <h3 className="text-2xl font-headline font-semibold mb-6">Key Features</h3>
                    <div className="space-y-6">
                        {service.details.features.map((feature) => (
                            <div key={feature.title} className="flex gap-4">
                                <CheckCircle className="size-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg">{feature.title}</h4>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
}
