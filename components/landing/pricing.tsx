"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "أساسي",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "مثالي للمتاجر الناشئة",
    features: [
      "متجر واحد",
      "100 منتج",
      "بوابات دفع أساسية",
      "شهادة SSL مجانية",
      "دعم عبر البريد",
      "قالب واحد مجاني",
    ],
    popular: false,
  },
  {
    name: "احترافي",
    monthlyPrice: 249,
    yearlyPrice: 199,
    description: "للمتاجر المتنامية",
    features: [
      "3 متاجر",
      "منتجات غير محدودة",
      "جميع بوابات الدفع",
      "نطاق مخصص",
      "تحليلات متقدمة",
      "دعم أولوية",
      "قوالب متعددة",
      "تطبيق جوال",
    ],
    popular: true,
  },
  {
    name: "مؤسسي",
    monthlyPrice: 499,
    yearlyPrice: 399,
    description: "للشركات الكبيرة",
    features: [
      "متاجر غير محدودة",
      "منتجات غير محدودة",
      "جميع بوابات الدفع",
      "نطاقات متعددة",
      "API كامل",
      "مدير حساب خاص",
      "تخصيص كامل",
      "تكامل ERP",
      "SLA مضمون",
    ],
    popular: false,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            الأسعار
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            خطط مرنة تناسب جميع الأحجام
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
            ابدأ مجاناً لمدة 14 يوم، بدون بطاقة ائتمان
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span
            className={`text-sm font-medium transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            شهري
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative h-7 w-12 rounded-full bg-primary p-0.5 transition-colors"
            aria-label="تبديل بين الشهري والسنوي"
          >
            <motion.div
              animate={{ x: isYearly ? -20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="h-6 w-6 rounded-full bg-primary-foreground shadow-sm"
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            سنوي
            <span className="mr-1 text-xs text-primary">(وفّر 20%)</span>
          </span>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border p-6 shadow-sm sm:p-8 ${
                plan.popular
                  ? "border-primary bg-card shadow-lg shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  الأكثر شعبية
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isYearly ? "yearly" : "monthly"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl font-bold text-foreground"
                  >
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-muted-foreground">ر.س / شهرياً</span>
              </div>
              <Link
                href="/register"
                className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:opacity-90"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                ابدأ الآن
              </Link>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
