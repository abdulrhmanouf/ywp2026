"use client";

import { motion } from "framer-motion";
import {
  Store,
  CreditCard,
  Truck,
  BarChart3,
  Globe,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Store,
    title: "متاجر متعددة",
    description: "أنشئ وأدِر متاجر متعددة من لوحة تحكم واحدة بسهولة تامة.",
  },
  {
    icon: CreditCard,
    title: "بوابات دفع سعودية",
    description: "دعم كامل لمدى، فيزا، ماستركارد، Apple Pay وتمارا للتقسيط.",
  },
  {
    icon: Truck,
    title: "شحن متكامل",
    description: "ربط مباشر مع أرامكس، SMSA، DHL وجميع شركات الشحن المحلية.",
  },
  {
    icon: BarChart3,
    title: "تحليلات متقدمة",
    description: "تتبع مبيعاتك وأداء متجرك بتقارير مفصلة ولحظية.",
  },
  {
    icon: Globe,
    title: "نطاق مخصص",
    description: "اربط نطاقك الخاص وحصل على شهادة SSL مجانية تلقائياً.",
  },
  {
    icon: Shield,
    title: "أمان متقدم",
    description: "حماية متقدمة لبيانات عملائك مع تشفير كامل وحماية من الاحتيال.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            المميزات
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            كل ما تحتاجه لنجاح متجرك
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            أدوات متكاملة صُممت خصيصاً لتجار المملكة العربية السعودية
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
