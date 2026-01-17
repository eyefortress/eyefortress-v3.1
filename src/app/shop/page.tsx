
'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { products, categories, type Product, type ProductCategory } from '@/lib/products-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, ShoppingCart, Filter, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardSkeleton } from '@/components/product-card-skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
        duration: 0.5,
        ease: 'easeOut',
    }
  },
};

const PRODUCTS_PER_PAGE = 12;

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 8000]);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [sortBy, setSortBy] = useState('default');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);


  const loaderRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedPriceRange = useDebounce(priceRange, 300);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 8000;
    const highestPrice = Math.max(...products.map(p => p.price));
    return Math.ceil(highestPrice / 1000) * 1000;
  }, []);
  
  useEffect(() => {
    // Set initial price range max to the calculated max price
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);
  
  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const runFilter = useCallback(() => {
    let filtered = [...products];

    if (debouncedSearchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }

    filtered = filtered.filter(p => p.price >= debouncedPriceRange[0] && p.price <= debouncedPriceRange[1]);

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order for default
        break;
    }

    setFilteredProducts(filtered);
    setDisplayProducts(filtered.slice(0, PRODUCTS_PER_PAGE));
    setPage(1);
    setHasMore(filtered.length > PRODUCTS_PER_PAGE);
  }, [debouncedSearchTerm, debouncedPriceRange, selectedCategories, sortBy]);

  const loadMoreProducts = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const nextPage = page + 1;
      const newProducts = filteredProducts.slice(0, nextPage * PRODUCTS_PER_PAGE);
      
      setDisplayProducts(newProducts);
      setPage(nextPage);
      setHasMore(newProducts.length < filteredProducts.length);
      setIsLoading(false);
    }, 1000); // Simulate network latency
  }, [page, isLoading, hasMore, filteredProducts]);
  
  useEffect(() => {
    runFilter();
  }, [runFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { rootMargin: '200px' }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreProducts]);


  const renderDesktopFilters = () => (
    <>
      <h2 className="text-2xl font-headline font-semibold mb-6">Filters</h2>
      
      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search-desktop" className="block text-sm font-medium mb-2">Search Products</label>
        <div className="relative">
            <Input 
                id="search-desktop"
                type="text" 
                placeholder="e.g. 4K AI Dome Camera"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium mb-4">Categories</label>
        <ScrollArea className="h-72">
          <div className="space-y-3 pr-4">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <Checkbox 
                  id={`desktop-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label 
                  htmlFor={`desktop-${category}`}
                  className="ml-2 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );

  const renderMobileFilters = () => (
    <>
      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search-mobile" className="block text-sm font-medium mb-2">Search Products</label>
        <div className="relative">
            <Input 
                id="search-mobile"
                type="text" 
                placeholder="e.g. 4K AI Dome Camera"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium mb-4">Categories</label>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-3 pr-4">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <Checkbox 
                  id={`mobile-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label 
                  htmlFor={`mobile-${category}`}
                  className="ml-2 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline text-primary">Shop Our Products</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our selection of cutting-edge security hardware. Use the filters to find the perfect solution for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 bg-card p-6 rounded-lg shadow-sm h-fit sticky top-24">
              {renderDesktopFilters()}
            </aside>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="lg:hidden mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={debouncedSearchTerm + debouncedPriceRange.join('-') + selectedCategories.join('-') + sortBy}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {displayProducts.map(product => (
                    <motion.div key={product.id} variants={itemVariants}>
                      <Card className="h-full flex flex-col overflow-hidden group shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                        <div className="relative overflow-hidden aspect-video">
                          <Image
                            src={product.image.imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint={product.image.imageHint}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="font-headline text-xl h-12 overflow-hidden">{product.name}</CardTitle>
                          <CardDescription className="text-primary font-semibold text-lg">
                              {product.price > 0 ? `₹${product.price.toFixed(2)}` : 'Price on request'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                          <Button className="w-full">
                            <ShoppingCart className="mr-2 size-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              <div ref={loaderRef} className="h-10" />

              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ProductCardSkeleton key={`skel-${index}`} />
                  ))}
                </div>
              )}
              
              {!isLoading && displayProducts.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Mobile Sort & Filter Bar */}
      <div className="lg:hidden fixed bottom-4 inset-x-0 z-40 flex justify-center">
          <div className="flex items-center justify-evenly bg-card border text-card-foreground rounded-full shadow-lg h-14 w-[90vw] max-w-xs">
              {/* Sort Button */}
              <Sheet open={sortSheetOpen} onOpenChange={setSortSheetOpen}>
                  <SheetTrigger asChild>
                      <Button variant="ghost" className="flex-1 rounded-full text-sm font-semibold flex items-center justify-center gap-2 h-full uppercase">
                          <ArrowUpDown className="size-4" />
                          Sort
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="rounded-t-lg">
                      <SheetHeader className="text-left p-4 pb-0">
                          <SheetTitle>Sort by</SheetTitle>
                      </SheetHeader>
                      <div className="p-4 text-foreground">
                          <RadioGroup value={sortBy} onValueChange={(value) => {
                              setSortBy(value);
                              setSortSheetOpen(false);
                          }}>
                              <div className="space-y-1">
                                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent group">
                                      <RadioGroupItem value="default" id="r-default" />
                                      <Label htmlFor="r-default" className="w-full cursor-pointer group-hover:text-accent-foreground">Default</Label>
                                  </div>
                                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent group">
                                      <RadioGroupItem value="price-asc" id="r-price-asc" />
                                      <Label htmlFor="r-price-asc" className="w-full cursor-pointer group-hover:text-accent-foreground">Price: Low to High</Label>
                                  </div>
                                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent group">
                                      <RadioGroupItem value="price-desc" id="r-price-desc" />
                                      <Label htmlFor="r-price-desc" className="w-full cursor-pointer group-hover:text-accent-foreground">Price: High to Low</Label>
                                  </div>
                                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent group">
                                      <RadioGroupItem value="name-asc" id="r-name-asc" />
                                      <Label htmlFor="r-name-asc" className="w-full cursor-pointer group-hover:text-accent-foreground">Alphabetical: A-Z</Label>
                                  </div>
                                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent group">
                                      <RadioGroupItem value="name-desc" id="r-name-desc" />
                                      <Label htmlFor="r-name-desc" className="w-full cursor-pointer group-hover:text-accent-foreground">Alphabetical: Z-A</Label>
                                  </div>
                              </div>
                          </RadioGroup>
                      </div>
                  </SheetContent>
              </Sheet>

              <Separator orientation="vertical" className="h-6" />

              {/* Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                        <Button variant="ghost" className="flex-1 rounded-full text-sm font-semibold flex items-center justify-center gap-2 h-full uppercase">
                          <Filter className="size-4" />
                          Filter
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                      <SheetHeader className="p-6 pb-4 border-b">
                          <SheetTitle className="text-2xl font-headline">Filters</SheetTitle>
                      </SheetHeader>
                      <div className="p-6 flex-grow overflow-hidden">
                        {renderMobileFilters()}
                      </div>
                      <div className="p-6 border-t">
                          <Button onClick={() => setMobileFiltersOpen(false)} className="w-full">
                            View Results
                          </Button>
                      </div>
                  </SheetContent>
              </Sheet>
          </div>
      </div>
    </div>
  );
}

    

    