"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
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
                <Image
                  src="/images/ywp-logo.jpg"
                  alt="YWP"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg object-cover"
                  priority
                />
              </Link>
              <ThemeToggle />
            </div>

            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              مرحباً بعودتك
            </h1>
            <p className="mt-2 text-muted-foreground">
              سجّل دخولك للوصول إلى لوحة التحكم
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-input bg-card py-3 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                  dir="ltr"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                تذكرني
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                نسيت كلمة المرور؟
              </a>
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
                  <span>تسجيل الدخول</span>
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
            ليس لديك حساب؟{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              أنشئ حساباً جديداً
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Left side - Decorative */}
      <div className="hidden flex-1 items-center justify-center bg-primary lg:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-md text-center"
        >
          <Image
            src="/images/ywp-logo.jpg"
            alt="YWP"
            width={120}
            height={120}
            className="mx-auto mb-8 h-28 w-28 rounded-2xl object-cover shadow-lg"
          />
          <h2 className="text-2xl font-bold text-primary-foreground">
            أنشئ متجرك في دقائق
          </h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/80">
            أكثر من 15,000 تاجر يثقون بمنصة YWP لإدارة تجارتهم الإلكترونية
            في المملكة العربية السعودية.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-primary-foreground/30"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
