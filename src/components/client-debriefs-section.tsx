'use client';
import { testimonials } from '@/lib/testimonials-data';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
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

export default function ClientDebriefsSection({ id }: { id: string }) {
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
            Client De-briefs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear from leaders who have partnered with EyeFortress to elevate their security.
          </p>
        </motion.div>

        <motion.div 
            className="mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div className="p-4" variants={itemVariants}>
                    <Card className="h-full flex flex-col shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                      <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                        <Quote className="size-8 text-primary/50 mb-4" />
                        <p className="text-muted-foreground italic">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex mt-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="size-4 text-yellow-400 fill-current" />
                            ))}
                        </div>
                      </CardContent>
                      <div className="bg-secondary/50 p-6 border-t flex flex-col items-center text-center mt-auto">
                          <Image
                            src={testimonial.avatar.imageUrl}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            data-ai-hint={testimonial.avatar.imageHint}
                            className="rounded-full mb-4 border-2 border-primary"
                          />
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.company}</p>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
