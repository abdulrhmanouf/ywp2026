"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Store,
  CreditCard,
  Truck,
  BarChart3,
  Globe,
  Shield,
  Zap,
  Palette,
} from "lucide-react";

const features = [
  {
    icon: Store,
    title: "متاجر متعددة",
    description: "أنشئ وأدِر متاجر متعددة من لوحة تحكم واحدة بسهولة تامة.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: CreditCard,
    title: "بوابات دفع سعودية",
    description: "دعم كامل لمدى، فيزا، ماستركارد، Apple Pay وتمارا للتقسيط.",
    color: "from-primary/20 to-accent/20",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Truck,
    title: "شحن متكامل",
    description: "ربط مباشر مع أرامكس، SMSA، DHL وجميع شركات الشحن المحلية.",
    color: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: BarChart3,
    title: "تحليلات متقدمة",
    description: "تتبع مبيعاتك وأداء متجرك بتقارير مفصلة ولحظية.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Globe,
    title: "نطاق مخصص",
    description: "اربط نطاقك الخاص وحصل على شهادة SSL مجانية تلقائياً.",
    color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Shield,
    title: "أمان متقدم",
    description: "حماية متقدمة لبيانات عملائك مع تشفير كامل وحماية من الاحتيال.",
    color: "from-rose-500/20 to-pink-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
];

const additionalFeatures = [
  { icon: Zap, label: "أداء فائق السرعة" },
  { icon: Palette, label: "قوالب قابلة للتخصيص" },
  { icon: Store, label: "تطبيق جوال" },
  { icon: Globe, label: "دعم متعدد اللغات" },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="relative py-20 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full border border-primary/5"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full border border-accent/5"
        />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-4 w-4" />
            </motion.span>
            المميزات
          </motion.span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            كل ما تحتاجه لنجاح متجرك
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            أدوات متكاملة صُممت خصيصاً لتجار المملكة العربية السعودية
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.02 : 1,
                  y: hoveredIndex === index ? -4 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8"
              >
                {/* Gradient background on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
                />

                {/* Content */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} transition-all`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </motion.div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Animated arrow on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 text-sm font-medium text-primary"
                  >
                    اعرف المزيد ←
                  </motion.div>
                </div>

                {/* Corner decoration */}
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1 : 0.8,
                    opacity: hoveredIndex === index ? 0.1 : 0,
                  }}
                  className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional features bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 overflow-hidden rounded-2xl border border-border bg-card/50 p-1 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 p-4 sm:gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              وأيضاً:
            </span>
            {additionalFeatures.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground"
              >
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl"
          >
            ابدأ الآن مجاناً
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
