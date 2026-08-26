"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import profile from "@content/profile.json";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix ?? ""}
    </span>
  );
}

export function Stats() {
  return (
    <section className="hairline">
      <div className="container-content grid grid-cols-2 gap-8 py-16 sm:grid-cols-3 lg:grid-cols-6">
        {profile.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <p className="font-display text-3xl tracking-tight text-ink dark:text-ink-dark">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-sm text-muted dark:text-muted-dark">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
