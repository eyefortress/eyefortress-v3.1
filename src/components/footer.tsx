"use client";

import { Facebook, Instagram, Linkedin, Aperture, Mail, Phone, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-background border-t border-border/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 px-4 py-12">
        <motion.div className="col-span-2 md:col-span-1" variants={itemVariants}>
          <Link
            href="/"
            className="flex items-center gap-2 font-headline text-xl font-bold uppercase tracking-widest"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 10,
                ease: 'linear',
              }}
            >
              <Aperture className="size-5 text-primary" />
            </motion.div>
            <span>Eye<span className="text-primary">Fortress</span></span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Intelligent Security Solutions
          </p>
           <div className="mt-4 space-y-2 text-sm">
            <a href="mailto:support@eyefortress.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <Mail className="size-4" />
              support@eyefortress.com
            </a>
            <a href="tel:+918178067038" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <Phone className="size-4" />
              +91 8178067038
            </a>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-semibold text-foreground">Solutions</h4>
          <ul className="space-y-2 mt-4 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-primary">Urban Security</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Industrial Monitoring</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Residential Protection</a></li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-semibold text-foreground">Platform</h4>
          <ul className="space-y-2 mt-4 text-sm">
            <li><Link href="/services" className="text-muted-foreground hover:text-primary">Our Services</Link></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">AI Analytics</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Command Center</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Integrations</a></li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-semibold text-foreground">Company</h4>
          <ul className="space-y-2 mt-4 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-primary">About Us</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Press</a></li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-semibold text-foreground">Resources</h4>
          <ul className="space-y-2 mt-4 text-sm">
            <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Case Studies</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary">Support</a></li>
          </ul>
        </motion.div>
      </div>
      <motion.div 
        className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row border-t border-border/20"
        variants={itemVariants}
      >
        <p className="text-sm text-muted-foreground">
          &copy; {year} EyeFortress Inc. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Twitter" className="text-muted-foreground transition-colors hover:text-primary">
              <Twitter className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-primary">
              <Facebook className="size-5" />
            </a>
          </Button>
           <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-primary">
              <Instagram className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="YouTube" className="text-muted-foreground transition-colors hover:text-primary">
              <Youtube className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
              <Linkedin className="size-5" />
            </a>
          </Button>
        </div>
      </motion.div>
    </motion.footer>
  );
}
