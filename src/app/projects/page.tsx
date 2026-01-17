
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format, isAfter, subYears } from 'date-fns';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { projects, type Project, type ProjectCategory } from '@/lib/projects-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      ease: 'easeOut',
    }
  },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    let sortedProjects = [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (filter === 'new') {
      const oneYearAgo = subYears(new Date(), 1);
      return sortedProjects.filter(p => isAfter(new Date(p.date), oneYearAgo));
    }
    if (filter === 'old') {
      const oneYearAgo = subYears(new Date(), 1);
      return sortedProjects.filter(p => !isAfter(new Date(p.date), oneYearAgo));
    }
    return sortedProjects;
  }, [filter]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold font-headline text-primary">Our Projects</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              See our technology in action. We've delivered robust security solutions for a diverse range of clients, from corporate headquarters to entire city districts.
            </p>
          </motion.div>

          <div className="flex justify-center my-12">
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="old">Old</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <motion.div
            key={filter} // Re-trigger animation on filter change
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="h-full flex flex-col overflow-hidden group shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.name}
                      fill
                      data-ai-hint={project.image.imageHint}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge variant="secondary" className="absolute top-3 right-3">{project.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
                    <CardDescription>
                      {format(new Date(project.date), 'MMMM yyyy')} &bull; Solution: <span className="text-primary font-medium">{project.solution}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="outline">View Case Study</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
