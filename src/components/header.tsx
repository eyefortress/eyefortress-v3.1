"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, Search, ShoppingCart, User, Aperture, Wrench } from 'lucide-react';
import { MotionLink } from './motion/motion-link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemeToggle } from './theme-toggle';


const sections = [
  { href: '/services', title: 'Services' },
  { href: '/shop', title: 'Shop' },
  { href: '/projects', title: 'Projects' },
  { href: '/blog', title: 'Blog' },
  { href: '/why-us', title: 'Why Us' },
  { href: '/contact', title: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    setIsScrolled(latest > 10);

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  
  useEffect(() => {
    // Close search and mobile menu on route change
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const hasSolidBg = isScrolled || pathname !== '/';

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        hasSolidBg
          ? 'bg-background/80 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              key="mobile-search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden absolute inset-0 z-10 flex h-full items-center bg-background px-4"
            >
              <div className="relative flex w-full items-center">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pr-10"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 text-muted-foreground"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <MotionLink
          href="/"
          className={cn(
            "flex items-center gap-2 font-headline text-xl font-bold uppercase tracking-widest",
            !hasSolidBg && "text-primary-foreground",
            isSearchOpen && 'invisible md:visible'
          )}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
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
        </MotionLink>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center flex-1 justify-center">
          {sections.map(section => (
            <Link
              key={section.href}
              href={section.href}
              onMouseEnter={() => setHoveredPath(section.href)}
              onMouseLeave={() => setHoveredPath(null)}
              className={cn(
                'relative rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors',
                pathname === section.href
                  ? 'text-primary'
                  : hasSolidBg
                  ? 'text-foreground/60 hover:text-primary'
                  : 'text-primary-foreground/70 hover:text-primary-foreground'
              )}
            >
              {section.title}
              {(pathname === section.href || hoveredPath === section.href) && (
                <motion.div
                  layoutId="header-nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          ))}
        </nav>
        
        <div className={cn(
          "hidden md:flex items-center justify-end space-x-1",
        )}>
           <AnimatePresence mode="wait">
            {isSearchOpen ? (
              <motion.div
                key="search-input"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 150, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative flex items-center"
              >
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pr-10"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 text-muted-foreground"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="search-icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn("flex items-center space-x-1", !hasSolidBg && "text-primary-foreground")}
              >
                <ThemeToggle className={cn(!hasSolidBg && "hover:bg-white/10")} />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
                        <Search />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="User Account">
                        <User />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>My Account</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Shopping Cart">
                        <ShoppingCart />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shopping Cart</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/technician-login" aria-label="Technician Login">
                          <Wrench />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Technician Login</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Mobile Nav */}
        <div className={cn("md:hidden flex items-center gap-0.5", !hasSolidBg && "text-primary-foreground", isSearchOpen && 'invisible')}>
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSearchOpen(true)} className={cn(!hasSolidBg && "hover:bg-white/10 hover:text-primary-foreground")}>
            <Search />
          </Button>
          <ThemeToggle className={cn(!hasSolidBg && "hover:bg-white/10 hover:text-primary-foreground")} />
          <Button variant="ghost" size="icon" aria-label="User Account" className={cn(!hasSolidBg && "hover:bg-white/10 hover:text-primary-foreground")}>
            <User />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Shopping Cart" className={cn(!hasSolidBg && "hover:bg-white/10 hover:text-primary-foreground")}>
            <ShoppingCart />
          </Button>
          <Button variant="ghost" size="icon" asChild className={cn(!hasSolidBg && "hover:bg-white/10 hover:text-primary-foreground")}>
            <Link href="/technician-login" aria-label="Technician Login">
              <Wrench />
            </Link>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("ml-1", !hasSolidBg && "hover:bg-white/10")}>
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold uppercase tracking-widest">
                      <Aperture className="size-5 text-primary" />
                      <span>Eye<span className="text-primary">Fortress</span></span>
                    </Link>
                </div>
                <nav className="flex flex-col space-y-4 flex-grow">
                  {sections.map(section => (
                    <Link
                      key={section.href}
                      href={section.href}
                      className={cn(
                        'text-lg font-medium uppercase',
                        pathname === section.href ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {section.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
