"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, Save } from "lucide-react";

const tabs = [
  { id: "profile", label: "الملف الشخصي", icon: User },
  { id: "notifications", label: "الإشعارات", icon: Bell },
  { id: "security", label: "الأمان", icon: Shield },
  { id: "billing", label: "الفوترة", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          الإعدادات
        </h1>
        <p className="mt-1 text-muted-foreground">
          إدارة حسابك وتفضيلاتك
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "profile" && (
          <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              معلومات الملف الشخصي
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                  م
                </div>
                <div>
                  <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    تغيير الصورة
                  </button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG بحد أقصى 2MB
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    الاسم الأول
                  </label>
                  <input
                    type="text"
                    defaultValue="محمد"
                    className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    اسم العائلة
                  </label>
                  <input
                    type="text"
                    defaultValue="الأحمدي"
                    className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  defaultValue="mohammed@example.com"
                  className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  defaultValue="+966 5XX XXX XXX"
                  className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  نبذة
                </label>
                <textarea
                  rows={3}
                  defaultValue="تاجر إلكتروني متخصص في بيع المنتجات الفاخرة"
                  className="w-full resize-none rounded-xl border border-input bg-background py-3 px-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
              >
                <Save className="h-4 w-4" />
                حفظ التغييرات
              </motion.button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-primary"
                >
                  تم الحفظ بنجاح
                </motion.span>
              )}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              إعدادات الإشعارات
            </h2>
            <div className="space-y-4">
              {[
                { title: "طلبات جديدة", desc: "إشعار عند استلام طلب جديد" },
                { title: "تحديثات الشحن", desc: "إشعار بتغيير حالة الشحنات" },
                { title: "تنبيهات المخزون", desc: "تنبيه عند انخفاض المخزون" },
                { title: "تقارير أسبوعية", desc: "ملخص أسبوعي لأداء المتاجر" },
                { title: "تحديثات المنصة", desc: "إشعارات بالمميزات الجديدة" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border border-border p-4"
                >
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-muted transition-colors after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-card after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              الأمان
            </h2>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  كلمة المرور الحالية
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  dir="ltr"
                />
              </div>
              <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                تحديث كلمة المرور
              </button>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              الفوترة والاشتراك
            </h2>
            <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">الخطة الحالية</span>
                  <h3 className="mt-1 text-xl font-bold text-primary">احترافي</h3>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  249 <span className="text-sm font-normal text-muted-foreground">ر.س/شهر</span>
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  ترقية الخطة
                </button>
                <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                  إلغاء الاشتراك
                </button>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">سجل الفواتير</h3>
              <div className="space-y-2">
                {[
                  { date: "مارس 2026", amount: "249 ر.س", status: "مدفوعة" },
                  { date: "فبراير 2026", amount: "249 ر.س", status: "مدفوعة" },
                  { date: "يناير 2026", amount: "249 ر.س", status: "مدفوعة" },
                ].map((inv) => (
                  <div
                    key={inv.date}
                    className="flex items-center justify-between rounded-xl border border-border p-3"
                  >
                    <span className="text-sm text-muted-foreground">{inv.date}</span>
                    <span className="text-sm font-medium text-foreground">{inv.amount}</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
