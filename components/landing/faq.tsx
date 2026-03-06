"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle, ArrowLeft } from "lucide-react";

const faqs = [
  {
    question: "هل يمكنني تجربة المنصة مجاناً؟",
    answer:
      "نعم! نوفر في YWP تجربة مجانية لمدة 14 يوماً بدون الحاجة لبطاقة ائتمان. يمكنك استكشاف جميع المميزات وتجربة المنصة بالكامل قبل الاشتراك.",
    category: "عام",
  },
  {
    question: "ما هي بوابات الدفع المدعومة؟",
    answer:
      "ندعم جميع بوابات الدفع الرئيسية في السعودية بما في ذلك مدى، فيزا، ماستركارد، Apple Pay، STC Pay، وتمارا للدفع بالتقسيط. كما ندعم التحويل البنكي المباشر.",
    category: "الدفع",
  },
  {
    question: "هل يمكنني ربط نطاقي الخاص؟",
    answer:
      "بالتأكيد! يمكنك ربط نطاقك الخاص بسهولة من لوحة التحكم. نوفر أيضاً شهادة SSL مجانية تلقائياً لضمان أمان متجرك.",
    category: "تقني",
  },
  {
    question: "كيف يتم التعامل مع الشحن؟",
    answer:
      "نوفر ربطاً مباشراً مع أشهر شركات الشحن في السعودية مثل أرامكس، SMSA، DHL، وفيديكس. يتم حساب تكاليف الشحن تلقائياً وتتبع الشحنات من لوحة التحكم.",
    category: "الشحن",
  },
  {
    question: "هل المنصة مناسبة للمبتدئين؟",
    answer:
      "نعم! صممنا المنصة لتكون سهلة الاستخدام للجميع. لا تحتاج لأي خبرة تقنية. كما نوفر دليل شامل وفريق دعم متاح على مدار الساعة لمساعدتك.",
    category: "عام",
  },
  {
    question: "هل يمكنني إدارة أكثر من متجر؟",
    answer:
      "نعم! حسب خطة اشتراكك، يمكنك إدارة متاجر متعددة من لوحة تحكم واحدة. الخطة الاحترافية تتيح 3 متاجر والمؤسسية تتيح متاجر غير محدودة.",
    category: "الخطط",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="faq" className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
            <HelpCircle className="h-4 w-4" />
            الأسئلة الشائعة
          </motion.span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            لديك سؤال؟ لدينا الإجابة
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            إليك أكثر الأسئلة شيوعاً من عملائنا
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group ${i === faqs.length - 1 && faqs.length % 2 !== 0 ? "lg:col-span-2 lg:mx-auto lg:max-w-xl" : ""}`}
            >
              <motion.div
                whileHover={{ y: -2 }}
                className={`h-full overflow-hidden rounded-2xl border shadow-sm transition-all ${
                  openIndex === i
                    ? "border-primary/50 bg-card shadow-md"
                    : "border-border bg-card"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-right sm:p-6"
                  aria-expanded={openIndex === i}
                >
                  <div className="flex-1">
                    <span className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground sm:text-base">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      openIndex === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        className="px-5 pb-5 leading-relaxed text-muted-foreground sm:px-6 sm:pb-6"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center sm:p-12"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
          >
            <MessageCircle className="h-7 w-7 text-primary" />
          </motion.div>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            فريق الدعم متاح على مدار الساعة لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20"
            >
              <MessageCircle className="h-4 w-4" />
              تواصل معنا
            </motion.a>
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
            >
              ابدأ تجربتك المجانية
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
