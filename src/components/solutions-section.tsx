'use client';
import Image from 'next/image';
import { solutions } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function SolutionsSection({ id }: { id: string }) {
  const solutionImages = {
    'sentinel-pro': PlaceHolderImages.find(img => img.id === 'solution-card-1'),
    'guardian-360': PlaceHolderImages.find(img => img.id === 'solution-card-2'),
    'aegis-home': PlaceHolderImages.find(img => img.id === 'solution-card-3'),
  };

  return (
    <section id={id} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="font-headline text-4xl font-bold uppercase tracking-wider text-primary">
            Tailored for Every Need
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            From vast industrial complexes to the comfort of your home, EyeFortress provides a bespoke security solution designed for your specific environment.
          </p>
        </motion.div>
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution) => {
            const image = solutionImages[solution.id as keyof typeof solutionImages];
            return (
              <motion.div key={solution.id} variants={itemVariants}>
                <Card className="flex flex-col overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                  {image && (
                    <div className="overflow-hidden">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={600}
                        height={400}
                        data-ai-hint={image.imageHint}
                        className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl" style={{color: solution.themeColor}}>{solution.name}</CardTitle>
                    <CardDescription className="pt-2">{solution.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="ghost" className="w-full justify-start p-0 h-auto text-sm text-white hover:text-primary hover:bg-transparent" asChild>
                      <a href="#home" onClick={() => {
                          // In a real app, this would likely update the hero section
                          console.log(`Switching to ${solution.name}`);
                      }}>
                        Learn More <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
