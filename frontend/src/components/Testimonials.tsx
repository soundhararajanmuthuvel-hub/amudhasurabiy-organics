"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";
import { testimonials, Testimonial } from "@/lib/data/testimonials";

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials 3 times for a seamless, continuous 60fps marquee loop
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream via-cream-dark/20 to-cream border-b border-walnut-brown/10 relative overflow-hidden">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-moss-green/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-600 font-heading text-xs font-bold uppercase tracking-widest border border-amber-500/20">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>GOOGLE VERIFIED REVIEWS</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-walnut-brown tracking-tight">
          Loved by Families Across Tamil Nadu
        </h2>

        {/* Description */}
        <p className="font-body text-sm sm:text-base text-walnut-brown/75 max-w-2xl mx-auto leading-relaxed">
          More than <strong className="text-walnut-brown font-semibold">40+ genuine Google Reviews</strong> from parents who trust <strong className="text-moss-green font-semibold">Amudhasurabiy Organics</strong> for pure, chemical-free daily nutrition.
        </p>
      </div>

      {/* Marquee Track Container */}
      <div
        className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Customer Reviews Marquee"
        role="region"
      >
        {/* Gradient Fades on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        {/* Animated Marquee Strip */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{
            x: isPaused ? undefined : ["0%", "-33.333%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {marqueeItems.map((item: Testimonial, index: number) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[300px] sm:w-[360px] shrink-0 rounded-3xl bg-white p-6 sm:p-7 border border-walnut-brown/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top border highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-moss-green/40 via-amber-400/40 to-moss-green/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Stars & Google Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold text-slate-600 dark:text-slate-300">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google Review</span>
                  </div>
                </div>

                {/* Quote Icon */}
                <Quote className="h-6 w-6 text-moss-green/20 mb-2" />

                {/* Content */}
                <p className="font-body text-xs sm:text-sm text-walnut-brown/85 leading-relaxed mb-6 font-normal">
                  &quot;{item.content}&quot;
                </p>
              </div>

              {/* Footer Author Info */}
              <div className="pt-4 border-t border-walnut-brown/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-moss-green text-white font-heading text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                    {item.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading text-xs font-bold text-walnut-brown">
                        {item.name}
                      </h4>
                      {item.verifiedGoogle && (
                        <span title="Verified Customer">
                          <CheckCircle className="h-3.5 w-3.5 text-moss-green shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="font-body text-[11px] text-walnut-brown/60">
                      {item.location}
                    </p>
                  </div>
                </div>

                {item.productMentioned && (
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-cream-dark/60 text-walnut-brown/70 font-heading text-[10px] font-semibold truncate max-w-[110px]">
                    {item.productMentioned}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trust Footer note */}
      <div className="mt-8 text-center">
        <p className="font-body text-xs text-walnut-brown/60 inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-walnut-brown/10 shadow-sm">
          <CheckCircle className="h-4 w-4 text-moss-green" />
          <span>Collected directly from our Google Business Profile in Kumbakonam</span>
        </p>
      </div>
    </section>
  );
}
