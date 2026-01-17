'use client';

import { faqs } from '@/lib/faq-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function FaqSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold uppercase tracking-wider text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your questions, answered. Find out everything you need to know about our intelligent security solutions.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border-b-0 bg-background rounded-lg shadow-md overflow-hidden transition-all duration-300 group hover:shadow-primary/10 hover:shadow-lg data-[state=open]:shadow-primary/20 data-[state=open]:shadow-xl"
                >
                  <AccordionTrigger className="p-6 text-lg font-semibold text-left hover:no-underline transition-colors group-hover:text-primary data-[state=open]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
