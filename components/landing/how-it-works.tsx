"use client";

import { motion } from "framer-motion";
import { UserPlus, Palette, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "سجّل حسابك",
    description: "أنشئ حسابك مجاناً في ثوانٍ معدودة بدون أي تعقيدات.",
  },
  {
    icon: Palette,
    step: "02",
    title: "صمم متجرك",
    description: "اختر من بين قوالب احترافية وخصصها لتناسب علامتك التجارية.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "أطلق وابدأ البيع",
    description: "أضف منتجاتك وابدأ في استقبال الطلبات والمبيعات فوراً.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            كيف يعمل
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            ثلاث خطوات فقط لإطلاق متجرك
          </h2>
        </motion.div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute top-16 hidden h-0.5 w-full bg-border md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <step.icon className="h-7 w-7" />
              </div>
              <span className="mb-2 text-sm font-bold text-primary">
                {step.step}
              </span>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
