"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NeuralBackground } from "@/components/home/NeuralBackground";
import profile from "@content/profile.json";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden">
      <NeuralBackground />
      <div className="container-content relative flex min-h-[86vh] flex-col justify-center py-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="meta-label mb-6"
        >
          {profile.location} · Open to Software / ML Engineering internships
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-1 tracking-tight text-ink dark:text-ink-dark"
        >
          {profile.name}
        </motion.h1>

        <div className="mt-5 h-10 overflow-hidden sm:h-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl tracking-tight text-muted dark:text-muted-dark sm:text-3xl"
            >
              {profile.roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted dark:text-muted-dark"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button href="/projects" size="lg" showArrow>
            View Projects
          </Button>
          <Button href="/research" variant="outline" size="lg">
            Research
          </Button>
          <Button href={profile.links.resume} variant="ghost" size="lg" external>
            Download Resume
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Contact
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted dark:text-muted-dark" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
