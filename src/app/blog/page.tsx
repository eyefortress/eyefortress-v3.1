
'use client';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from 'framer-motion';
import { blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    }
  },
};


export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold font-headline text-primary">Blog</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights and expertise from the front lines of the security industry.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 max-w-4xl mx-auto space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
               <motion.div key={post.slug} variants={itemVariants}>
                <Card className="h-full flex flex-col md:flex-row overflow-hidden group shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                    <div className="md:w-1/3 relative overflow-hidden aspect-video md:aspect-auto">
                         <Image
                            src={post.image.imageUrl}
                            alt={post.title}
                            fill
                            data-ai-hint={post.image.imageHint}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex flex-col md:w-2/3">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                                <Link href={`/blog/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </CardTitle>
                            <CardDescription>
                                {format(new Date(post.date), 'MMMM d, yyyy')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{post.excerpt}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button asChild variant="link" className="p-0 text-primary">
                                <Link href={`/blog/${post.slug}`}>
                                    Read More <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
