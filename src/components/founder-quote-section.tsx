'use client';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const founder = {
    id: 'testimonial-11',
    name: 'Deepak Sharma',
    title: 'Founder & CEO',
    company: 'EyeFortress',
    quote: "In an age of uncertainty, visibility is your greatest defense. We built Eyefortress to provide that visibility with military-grade precision and uncompromising reliability.",
    avatarId: 'avatar-11'
};


export default function FounderQuoteSection({ id }: { id: string }) {
    const avatar = PlaceHolderImages.find(img => img.id === founder.avatarId);

    const quoteChars = Array.from(founder.quote);

    const quoteContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.02,
                delayChildren: 0.3,
            }
        }
    };

    const charVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                ease: 'easeOut',
                duration: 0.3
            }
        }
    };

    return (
        <section id={id} className="py-24 sm:py-32 bg-secondary">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {avatar && (
                         <Image
                            src={avatar.imageUrl}
                            alt={founder.name}
                            width={100}
                            height={100}
                            data-ai-hint={avatar.imageHint}
                            className="rounded-full mb-6 border-4 border-primary mx-auto"
                          />
                    )}
                    <Quote className="size-10 text-primary/50 mx-auto mb-6" />
                    
                    <motion.p 
                        className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed italic"
                        variants={quoteContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                      <span className="pr-1">"</span>
                      {quoteChars.map((char, index) => (
                        <motion.span
                          key={index}
                          variants={charVariants}
                          className="inline-block"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                      <span className="pl-1">"</span>
                    </motion.p>
                    
                    <div className="mt-8">
                        <p className="font-headline text-xl font-bold text-primary">{founder.name}</p>
                        <p className="text-md text-muted-foreground">{founder.title}, {founder.company}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
