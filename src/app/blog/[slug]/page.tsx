
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-data';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'heading':
        return <h2 key={index} className="text-2xl md:text-3xl font-headline font-semibold mt-12 mb-6 text-primary">{item.content}</h2>;
      case 'paragraph':
        return <p key={index} className="text-lg leading-relaxed text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
      case 'list':
        return (
          <ul key={index} className="space-y-4 mb-6 pl-6">
            {item.content.map((li: string, i: number) => (
              <li key={i} className="flex">
                <span className="text-primary mr-3 mt-1">▶</span>
                <span className="text-lg text-muted-foreground flex-1" dangerouslySetInnerHTML={{ __html: li.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Header />
      <main className="flex-grow pt-20">
        <article>
          <motion.div 
            className="relative h-[40vh] md:h-[50vh] min-h-[300px]"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <Image
              src={post.image.imageUrl}
              alt={post.title}
              fill
              priority
              data-ai-hint={post.image.imageHint}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </motion.div>
          
          <div className="container -mt-32 md:-mt-48 relative z-10 mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              >
                  <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>{post.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 mt-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <p>{format(new Date(post.date), 'MMMM d, yyyy')}</p>
                    </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="prose prose-lg dark:prose-invert max-w-none mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                {post.structuredContent.map(renderContent)}
              </motion.div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </motion.div>
  );
}
