"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Store,
  ExternalLink,
  MoreHorizontal,
  X,
  Globe,
  Palette,
} from "lucide-react";

const mockStores = [
  {
    id: 1,
    name: "متجر الأناقة",
    domain: "elegance.ywp.sa",
    products: 45,
    orders: 320,
    revenue: "25,400 ر.س",
    status: "نشط",
    template: "عصري",
  },
  {
    id: 2,
    name: "تقنيات المستقبل",
    domain: "techfuture.ywp.sa",
    products: 120,
    orders: 890,
    revenue: "78,200 ر.س",
    status: "نشط",
    template: "تقني",
  },
  {
    id: 3,
    name: "عطور الجزيرة",
    domain: "perfumes.ywp.sa",
    products: 32,
    orders: 156,
    revenue: "12,800 ر.س",
    status: "متوقف",
    template: "فاخر",
  },
];

export default function StoresPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreDomain, setNewStoreDomain] = useState("");

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            المتاجر
          </h1>
          <p className="mt-1 text-muted-foreground">إدارة متاجرك الإلكترونية</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          إنشاء متجر جديد
        </motion.button>
      </motion.div>

      {/* Stores Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockStores.map((store, i) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    store.status === "نشط"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {store.status}
                </span>
                <button
                  className="rounded-lg p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100"
                  aria-label="المزيد"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {store.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
              {store.domain}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {store.products}
                </div>
                <div className="text-xs text-muted-foreground">منتج</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {store.orders}
                </div>
                <div className="text-xs text-muted-foreground">طلب</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {store.revenue}
                </div>
                <div className="text-xs text-muted-foreground">الإيرادات</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href="/store"
                className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                معاينة
              </Link>
              <button className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary/10 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20">
                إدارة
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Store Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  إنشاء متجر جديد
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
                  aria-label="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    اسم المتجر
                  </label>
                  <div className="relative">
                    <Store className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                      placeholder="أدخل اسم المتجر"
                      className="w-full rounded-xl border border-input bg-background py-3 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    النطاق الفرعي
                  </label>
                  <div className="relative">
                    <Globe className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={newStoreDomain}
                      onChange={(e) => setNewStoreDomain(e.target.value)}
                      placeholder="storename"
                      className="w-full rounded-xl border border-input bg-background py-3 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      dir="ltr"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      .ywp.sa
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    القالب
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["عصري", "كلاسيكي", "فاخر"].map((t) => (
                      <button
                        key={t}
                        className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary focus:border-primary focus:text-primary"
                      >
                        <Palette className="h-5 w-5" />
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90"
                >
                  إنشاء المتجر
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
