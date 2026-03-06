"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "هل يمكنني تجربة المنصة مجاناً؟",
    answer:
      "نعم! نوفر في YWP تجربة مجانية لمدة 14 يوماً بدون الحاجة لبطاقة ائتمان. يمكنك استكشاف جميع المميزات وتجربة المنصة بالكامل قبل الاشتراك.",
  },
  {
    question: "ما هي بوابات الدفع المدعومة؟",
    answer:
      "ندعم جميع بوابات الدفع الرئيسية في السعودية بما في ذلك مدى، فيزا، ماستركارد، Apple Pay، STC Pay، وتمارا للدفع بالتقسيط. كما ندعم التحويل البنكي المباشر.",
  },
  {
    question: "هل يمكنني ربط نطاقي الخاص؟",
    answer:
      "بالتأكيد! يمكنك ربط نطاقك الخاص بسهولة من لوحة التحكم. نوفر أيضاً شهادة SSL مجانية تلقائياً لضمان أمان متجرك.",
  },
  {
    question: "كيف يتم التعامل مع الشحن؟",
    answer:
      "نوفر ربطاً مباشراً مع أشهر شركات الشحن في السعودية مثل أرامكس، SMSA، DHL، وفيديكس. يتم حساب تكاليف الشحن تلقائياً وتتبع الشحنات من لوحة التحكم.",
  },
  {
    question: "هل المنصة مناسبة للمبتدئين؟",
    answer:
      "نعم! صممنا المنصة لتكون سهلة الاستخدام للجميع. لا تحتاج لأي خبرة تقنية. كما نوفر دليل شامل وفريق دعم متاح على مدار الساعة لمساعدتك.",
  },
  {
    question: "هل يمكنني إدارة أكثر من متجر؟",
    answer:
      "نعم! حسب خطة اشتراكك، يمكنك إدارة متاجر متعددة من لوحة تحكم واحدة. الخطة الاحترافية تتيح 3 متاجر والمؤسسية تتيح متاجر غير محدودة.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            الأسئلة الشائعة
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            لديك سؤال؟
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-right sm:p-6"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-semibold text-foreground sm:text-base">
                  {faq.question}
                </span>
                <div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                  {openIndex === i ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
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
                    <p className="px-5 pb-5 leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
