"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen bg-background p-4 sm:p-8 md:p-12 font-sans"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header variants={itemVariants} className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={120}
              height={24}
              className="dark:invert"
            />
            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">v15</span>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <a href="https://ui.shadcn.com/docs">Docs</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="https://ui.shadcn.com/docs/components/accordion">Examples</a>
            </Button>
            <Button asChild>
              <a href="https://ui.shadcn.com/blocks">Dashboard</a>
            </Button>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mb-16 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Build Fast, Ship Faster
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A starter template with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Firebase, Nprogress and Lenis.
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg" asChild>
              <a href="/getting-started">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/your-repo" target="_blank">
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.section variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-xl font-semibold">Next.js 15</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  App Router, Server Components, Streaming, and all the latest features.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-xl font-semibold">shadcn/ui</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Beautifully designed components that you can copy and paste into your apps.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-xl font-semibold">Framer Motion</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Production-ready animations for React. Perfect for gestures and interactions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* New Cards */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-xl font-semibold">NProgress</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatic loading indicators for page transitions. Already configured for routing.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-xl font-semibold">Firebase</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Backend services ready to use. Just add your API keys in the .env.local file.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-xl font-semibold">Lenis</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Buttery smooth scrolling experience. Auto-configured for your app.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          variants={itemVariants}
          className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="#">Privacy</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#">Terms</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#">Contact</a>
            </Button>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
}