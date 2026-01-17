'use client';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection({ id }: { id: string }) {
  const contactImage = PlaceHolderImages.find(img => img.id === 'contact-bg');

  return (
    <motion.section 
      id={id} 
      className="relative py-24 sm:py-32 text-primary-foreground overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.3 }}
    >
      {contactImage && (
         <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <Image
                src={contactImage.imageUrl}
                alt={contactImage.description}
                fill
                data-ai-hint={contactImage.imageHint}
                className="object-cover"
            />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-black/70" />
      <motion.div 
        className="relative container mx-auto px-4 text-center"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="font-headline text-4xl font-bold uppercase tracking-wider text-primary">
          Upgrade Your Security
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/80">
          Ready to elevate your security infrastructure? Contact our sales team for a personalized demo and discover how EyeFortress can protect your assets with our advanced AI capabilities.
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Don't settle for standard surveillance. Experience the future of security intelligence today.
        </p>
        <div className="mt-10">
            <Button asChild size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                    Get a Demo
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
      </motion.div>
    </motion.section>
  );
}
