'use client';
import Image from 'next/image';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';

type AboutSectionProps = {
  id: string;
  image?: ImagePlaceholder;
};

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const imageItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};


export default function AboutSection({ id, image }: AboutSectionProps) {
  return (
    <section 
      id={id} 
      className="py-24 sm:py-32 bg-secondary"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={contentContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={textItemVariants}>
            <h2 className="font-headline text-4xl font-bold uppercase tracking-wider text-primary">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              EyeFortress is dedicated to pioneering the future of security. We were founded on the principle that modern threats require smarter, more adaptive solutions. Our mission is to empower organizations with intelligent surveillance systems that not only record events but actively identify, predict, and help prevent security breaches before they occur. We are committed to creating a safer world through technological innovation.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our team consists of leading experts in artificial intelligence, optical engineering, and cybersecurity. We are driven by a passion for excellence and a relentless pursuit of perfection. By integrating cutting-edge AI and machine learning into our robust hardware, we deliver unparalleled reliability and performance. At EyeFortress, we don't just sell cameras; we provide comprehensive security intelligence.
            </p>
          </motion.div>
          <motion.div className="flex justify-center" variants={imageItemVariants}>
            {image && (
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={800}
                    height={600}
                    data-ai-hint={image.imageHint}
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
