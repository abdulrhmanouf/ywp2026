"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ShieldCheck, Zap } from "lucide-react";

const stats = [
  { value: "+15,000", label: "متجر نشط" },
  { value: "+2 مليون", label: "طلب شهرياً" },
  { value: "99.9%", label: "وقت التشغيل" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
        >
          <Sparkles className="h-4 w-4" />
          <span>الأفضل في المملكة العربية السعودية</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          أنشئ متجرك الإلكتروني
          <span className="relative mx-2 inline-block text-primary">
            في دقائق
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-1 left-0 h-1 w-full origin-right rounded-full bg-primary/30"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          منصة YWP المتكاملة لإنشاء وإدارة متجرك الإلكتروني بكل سهولة. دعم كامل للغة
          العربية، بوابات دفع سعودية، وشحن محلي متكامل.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/register"
            className="group flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <span>ابدأ تجربتك المجانية</span>
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 rounded-2xl border border-border px-8 py-4 text-lg font-medium text-foreground transition-colors hover:bg-secondary"
          >
            شاهد كيف يعمل
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            بدون بطاقة ائتمان
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary" />
            إعداد في 5 دقائق
          </span>
        </motion.div>

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
              className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm sm:p-6"
            >
              <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
