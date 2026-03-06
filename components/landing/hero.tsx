"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Sparkles, ShieldCheck, Zap, Star, Play } from "lucide-react";
import { useRef } from "react";

const stats = [
  { value: "+15,000", label: "متجر نشط", icon: "🏪" },
  { value: "+2 مليون", label: "طلب شهرياً", icon: "📦" },
  { value: "99.9%", label: "وقت التشغيل", icon: "⚡" },
];

const floatingCards = [
  { id: 1, x: -180, y: -100, delay: 0, icon: "🛍️", label: "طلب جديد" },
  { id: 2, x: 180, y: -80, delay: 0.2, icon: "💳", label: "تم الدفع" },
  { id: 3, x: -160, y: 80, delay: 0.4, icon: "📦", label: "جاري الشحن" },
  { id: 4, x: 160, y: 100, delay: 0.6, icon: "⭐", label: "تقييم 5 نجوم" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden pt-16">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-3xl"
        />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
          <span>الأفضل في المملكة العربية السعودية</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-2 w-2 rounded-full bg-primary"
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          أنشئ متجرك الإلكتروني
          <span className="relative mx-2 inline-block text-primary">
            في دقائق
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -bottom-2 left-0 h-3 w-full"
              viewBox="0 0 200 12"
              fill="none"
            >
              <motion.path
                d="M2 10C50 2 150 2 198 10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-primary/40"
              />
            </motion.svg>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          منصة YWP المتكاملة لإنشاء وإدارة متجرك الإلكتروني بكل سهولة. دعم كامل للغة
          العربية، بوابات دفع سعودية، وشحن محلي متكامل.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(30, 42, 58, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative">ابدأ تجربتك المجانية</span>
              <ArrowLeft className="relative h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </motion.button>
          </Link>
          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-2xl border border-border bg-card/50 px-8 py-4 text-lg font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
          >
            <Play className="h-5 w-5 text-primary" />
            شاهد كيف يعمل
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 rounded-full bg-card/50 px-3 py-1.5 backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            بدون بطاقة ائتمان
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 rounded-full bg-card/50 px-3 py-1.5 backdrop-blur-sm"
          >
            <Zap className="h-4 w-4 text-primary" />
            إعداد في 5 دقائق
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 rounded-full bg-card/50 px-3 py-1.5 backdrop-blur-sm"
          >
            <Star className="h-4 w-4 text-primary" />
            تقييم 4.9/5
          </motion.span>
        </motion.div>

        {/* Floating notification cards */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {floatingCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + card.delay }}
              style={{ left: `calc(50% + ${card.x}px)`, top: `calc(40% + ${card.y}px)` }}
              className="absolute"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: card.delay }}
                className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 shadow-lg backdrop-blur-sm"
              >
                <span className="text-lg">{card.icon}</span>
                <span className="text-sm font-medium text-foreground">{card.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border bg-card/80 p-4 text-center shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md sm:p-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="mb-2 text-2xl"
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Store preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative mt-20 w-full max-w-4xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl" />
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-primary/40" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-lg bg-background px-4 py-1 text-xs text-muted-foreground">
                <span className="text-primary">🔒</span>
                <span dir="ltr">mystore.ywp.sa</span>
              </div>
            </div>
            {/* Store mockup content */}
            <div className="relative h-64 bg-gradient-to-br from-background to-muted/30 p-6 sm:h-80">
              <div className="flex h-full flex-col items-center justify-center">
                <Image
                  src="/images/ywp-logo.jpg"
                  alt="YWP Store Preview"
                  width={80}
                  height={80}
                  className="mb-4 rounded-xl object-cover shadow-lg"
                />
                <div className="text-lg font-bold text-foreground">معاينة المتجر</div>
                <div className="mt-2 text-sm text-muted-foreground">متجرك الإلكتروني الاحترافي</div>
                <Link
                  href="/store"
                  className="mt-4 rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg"
                >
                  شاهد المعاينة الكاملة
                </Link>
              </div>
              {/* Animated elements */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-4 top-4 h-12 w-24 rounded-lg bg-primary/10"
              />
              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-4 right-4 h-8 w-32 rounded-lg bg-accent/30"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
