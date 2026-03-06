"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "سارة العتيبي",
    role: "مؤسسة متجر سارة للعطور",
    content:
      "منصة YWP غيّرت حياتي التجارية بالكامل. خلال شهر واحد وصلت مبيعاتي إلى مستويات لم أكن أتخيلها. الدعم الفني ممتاز والمنصة سهلة الاستخدام.",
    rating: 5,
  },
  {
    name: "محمد الشمري",
    role: "صاحب متجر تقنيات",
    content:
      "أفضل منصة تجارة إلكترونية تعاملت معها. الربط مع شركات الشحن وبوابات الدفع كان سلساً جداً. أنصح بها كل تاجر سعودي.",
    rating: 5,
  },
  {
    name: "نورة القحطاني",
    role: "مديرة متجر نورة للأزياء",
    content:
      "التحليلات المتقدمة ساعدتني في فهم عملائي بشكل أفضل وزيادة مبيعاتي بنسبة 150%. المنصة احترافية ومتطورة باستمرار.",
    rating: 5,
  },
  {
    name: "عبدالله الحربي",
    role: "رائد أعمال",
    content:
      "بدأت بالخطة المجانية وخلال 3 أشهر انتقلت للخطة المؤسسية. المنصة تنمو معك وتوفر كل ما تحتاجه للنجاح في التجارة الإلكترونية.",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            آراء العملاء
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            ماذا يقول عملاؤنا
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="mx-auto max-w-3xl overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12"
              >
                <Quote className="mx-auto mb-6 h-10 w-10 text-primary/20" />
                <div className="mb-4 flex items-center justify-center gap-1">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    )
                  )}
                </div>
                <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                  {testimonials[current].content}
                </p>
                <div className="mt-8">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {testimonials[current].name[0]}
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              aria-label="السابق"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`الانتقال للشهادة ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              aria-label="التالي"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
