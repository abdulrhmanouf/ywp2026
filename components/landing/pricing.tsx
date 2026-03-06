"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Building2, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "أساسي",
    icon: Zap,
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
    gradient: "from-slate-500 to-slate-600",
  },
  {
    name: "احترافي",
    icon: Crown,
    monthlyPrice: 249,
    yearlyPrice: 199,
    description: "للمتاجر المتنامية",
    features: [
      "3 متاجر",
      "منتجات غير محدودة",
      "جميع بوابات الدفع",
      "نطاق مخصص",
      "تحليلات متقدمة",
      "دعم أولوية 24/7",
      "قوالب متعددة",
      "تطبيق جوال",
    ],
    popular: true,
    gradient: "from-primary to-primary/80",
  },
  {
    name: "مؤسسي",
    icon: Building2,
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
    gradient: "from-accent to-primary",
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="pricing" className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />
            الأسعار
          </motion.span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            خطط مرنة تناسب جميع الأحجام
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
            ابدأ مجاناً لمدة 14 يوم، بدون بطاقة ائتمان
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span
            className={`text-sm font-medium transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            شهري
          </span>
          <motion.button
            onClick={() => setIsYearly(!isYearly)}
            className="relative h-8 w-14 rounded-full bg-primary p-1 transition-colors"
            aria-label="تبديل بين الشهري والسنوي"
          >
            <motion.div
              animate={{ x: isYearly ? -24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="h-6 w-6 rounded-full bg-primary-foreground shadow-md"
            />
          </motion.button>
          <span
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            سنوي
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
            >
              وفّر 20%
            </motion.span>
          </span>
        </motion.div>

        {/* Plans */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: hoveredPlan === i ? 1.02 : plan.popular ? 1.02 : 1,
                  y: hoveredPlan === i ? -8 : plan.popular ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`relative h-full overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8 ${
                  plan.popular
                    ? "border-primary bg-card shadow-xl shadow-primary/10"
                    : "border-border bg-card"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-px left-1/2 -translate-x-1/2"
                  >
                    <div className="flex items-center gap-1 rounded-b-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                      <Crown className="h-3 w-3" />
                      الأكثر شعبية
                    </div>
                  </motion.div>
                )}

                {/* Background gradient on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredPlan === i ? 0.05 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient}`}
                />

                {/* Content */}
                <div className="relative">
                  {/* Plan icon and name */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: hoveredPlan === i ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        plan.popular
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <plan.icon className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isYearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold text-foreground sm:text-5xl"
                      >
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-muted-foreground">ر.س / شهرياً</span>
                  </div>

                  {/* CTA Button */}
                  <Link href="/register" className="mt-6 block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all ${
                        plan.popular
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "border border-border text-foreground hover:bg-secondary"
                      }`}
                    >
                      ابدأ الآن
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </motion.button>
                  </Link>

                  {/* Features */}
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature, fi) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: 10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.3 + fi * 0.05 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            plan.popular ? "bg-primary/20" : "bg-secondary"
                          }`}
                        >
                          <Check className={`h-3 w-3 ${plan.popular ? "text-primary" : "text-foreground"}`} />
                        </motion.div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* FAQ hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            لديك أسئلة؟{" "}
            <a href="#faq" className="font-medium text-primary hover:underline">
              اطلع على الأسئلة الشائعة
            </a>{" "}
            أو{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              تواصل معنا
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
