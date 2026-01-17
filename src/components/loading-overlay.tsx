
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aperture } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const loadingText = "Initializing Security Matrix...";

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
};

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 95 : prev + 5));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md p-4 text-center">
        <div className="flex items-center justify-center gap-4 font-headline text-4xl font-bold uppercase tracking-widest">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 10,
                ease: 'linear',
                }}
            >
                <Aperture className="size-10 text-primary" />
            </motion.div>
            <h1 className="text-foreground">Eye<span className="text-primary">Fortress</span></h1>
        </div>

        <div className="mt-4 text-sm text-muted-foreground h-5">
           <AnimatePresence>
            <motion.span
              key="loading-text"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              aria-label={loadingText}
            >
              {loadingText.split("").map((char, index) => (
                <motion.span key={index} variants={textVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </div>
        
        <Progress value={progress} className="mt-4 h-2 w-full" />
      </div>
    </div>
  );
}
