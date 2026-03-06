"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "سارة العتيبي",
    role: "مؤسسة متجر سارة للعطور",
    content:
      "منصة YWP غيّرت حياتي التجارية بالكامل. خلال شهر واحد وصلت مبيعاتي إلى مستويات لم أكن أتخيلها. الدعم الفني ممتاز والمنصة سهلة الاستخدام.",
    rating: 5,
    revenue: "+250%",
    stores: 2,
  },
  {
    name: "محمد الشمري",
    role: "صاحب متجر تقنيات",
    content:
      "أفضل منصة تجارة إلكترونية تعاملت معها. الربط مع شركات الشحن وبوابات الدفع كان سلساً جداً. أنصح بها كل تاجر سعودي.",
    rating: 5,
    revenue: "+180%",
    stores: 3,
  },
  {
    name: "نورة القحطاني",
    role: "مديرة متجر نورة للأزياء",
    content:
      "التحليلات المتقدمة ساعدتني في فهم عملائي بشكل أفضل وزيادة مبيعاتي بنسبة 150%. المنصة احترافية ومتطورة باستمرار.",
    rating: 5,
    revenue: "+150%",
    stores: 1,
  },
  {
    name: "عبدالله الحربي",
    role: "رائد أعمال",
    content:
      "بدأت بالخطة المجانية وخلال 3 أشهر انتقلت للخطة المؤسسية. المنصة تنمو معك وتوفر كل ما تحتاجه للنجاح في التجارة الإلكترونية.",
    rating: 5,
    revenue: "+320%",
    stores: 5,
  },
];

const logos = [
  "متجر الأناقة",
  "تقنيات المستقبل",
  "عطور الجزيرة",
  "أزياء نورة",
  "إلكترونيات الشمري",
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section ref={ref} id="testimonials" className="relative overflow-hidden bg-secondary/30 py-20 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl"
        />
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
            آراء العملاء
          </motion.span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            قصص نجاح ملهمة
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            أكثر من 15,000 تاجر يثقون بمنصة YWP لإدارة متاجرهم
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-8 rounded-2xl border border-border bg-card p-6"
        >
          {[
            { value: "15K+", label: "تاجر سعودي" },
            { value: "4.9", label: "تقييم المنصة", icon: "⭐" },
            { value: "98%", label: "نسبة الرضا" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary sm:text-3xl">
                {stat.icon || ""} {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Slider */}
        <div
          className="relative mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="mx-auto max-w-3xl overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative rounded-2xl border border-border bg-card p-8 shadow-lg sm:p-12"
              >
                {/* Quote icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-5 right-8 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg"
                >
                  <Quote className="h-5 w-5" />
                </motion.div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 flex items-center justify-center gap-1"
                >
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="h-5 w-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Content */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-lg leading-relaxed text-foreground sm:text-xl"
                >
                  "{testimonials[current].content}"
                </motion.p>

                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mx-auto mt-6 flex max-w-xs justify-center gap-4"
                >
                  <div className="rounded-xl bg-primary/5 px-4 py-2 text-center">
                    <div className="text-lg font-bold text-primary">{testimonials[current].revenue}</div>
                    <div className="text-xs text-muted-foreground">زيادة المبيعات</div>
                  </div>
                  <div className="rounded-xl bg-primary/5 px-4 py-2 text-center">
                    <div className="text-lg font-bold text-primary">{testimonials[current].stores}</div>
                    <div className="text-xs text-muted-foreground">متاجر نشطة</div>
                  </div>
                </motion.div>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-bold text-primary-foreground shadow-lg"
                  >
                    {testimonials[current].name[0]}
                  </motion.div>
                  <h4 className="font-semibold text-foreground">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary"
              aria-label="السابق"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current
                      ? "w-8 bg-primary shadow-md shadow-primary/30"
                      : "w-2.5 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`الانتقال للشهادة ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary"
              aria-label="التالي"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Trusted by logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <p className="mb-6 text-center text-sm text-muted-foreground">
            يثق بنا أكثر من 15,000 متجر في المملكة
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {logos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-xl bg-card px-6 py-3 text-sm font-medium text-muted-foreground shadow-sm transition-shadow hover:shadow-md"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
