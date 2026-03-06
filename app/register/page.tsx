"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Eye, EyeOff, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Right side - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                  <Store className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">YWP</span>
              </Link>
              <ThemeToggle />
            </div>

            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              أنشئ حسابك المجاني
            </h1>
            <p className="mt-2 text-muted-foreground">
              ابدأ رحلتك في التجارة الإلكترونية اليوم
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                الاسم الكامل
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full rounded-xl border border-input bg-card py-3 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-input bg-card py-3 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                اسم المتجر
              </label>
              <div className="relative">
                <Store className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => updateField("storeName", e.target.value)}
                  placeholder="اسم متجرك"
                  className="w-full rounded-xl border border-input bg-card py-3 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="********"
                  className="w-full rounded-xl border border-input bg-card py-3 pe-12 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
                required
              />
              <span className="text-sm text-muted-foreground">
                أوافق على{" "}
                <a href="#" className="text-primary hover:underline">
                  شروط الاستخدام
                </a>{" "}
                و{" "}
                <a href="#" className="text-primary hover:underline">
                  سياسة الخصوصية
                </a>
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:opacity-70"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <>
                  <span>إنشاء الحساب</span>
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              سجّل دخولك
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Left side - Decorative */}
      <div className="hidden flex-1 items-center justify-center bg-primary/5 lg:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
            <Store className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            انضم لأكثر من 15,000 تاجر
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            منصة YWP تساعدك على إطلاق متجرك الإلكتروني وتنمية أعمالك بأقل
            جهد ممكن. ابدأ مجاناً اليوم.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-card p-3 shadow-sm">
              <div className="text-lg font-bold text-primary">14 يوم</div>
              <div className="text-xs text-muted-foreground">تجربة مجانية</div>
            </div>
            <div className="rounded-xl bg-card p-3 shadow-sm">
              <div className="text-lg font-bold text-primary">24/7</div>
              <div className="text-xs text-muted-foreground">دعم فني</div>
            </div>
            <div className="rounded-xl bg-card p-3 shadow-sm">
              <div className="text-lg font-bold text-primary">99.9%</div>
              <div className="text-xs text-muted-foreground">وقت التشغيل</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
