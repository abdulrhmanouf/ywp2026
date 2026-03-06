"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Store,
  ExternalLink,
  MoreHorizontal,
  Settings,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { CreateStoreWizard } from "@/components/dashboard/create-store-wizard";

interface StoreData {
  id: number;
  name: string;
  domain: string;
  products: number;
  orders: number;
  revenue: string;
  status: "نشط" | "متوقف" | "قيد المراجعة";
  template: string;
  category: string;
  growth: number;
}

const mockStores: StoreData[] = [
  {
    id: 1,
    name: "متجر الأناقة",
    domain: "elegance.ywp.sa",
    products: 45,
    orders: 320,
    revenue: "25,400 ر.س",
    status: "نشط",
    template: "عصري",
    category: "fashion",
    growth: 12.5,
  },
  {
    id: 2,
    name: "تقنيات المستقبل",
    domain: "techfuture.ywp.sa",
    products: 120,
    orders: 890,
    revenue: "78,200 ر.س",
    status: "نشط",
    template: "حديث",
    category: "electronics",
    growth: 24.3,
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
    category: "beauty",
    growth: -5.2,
  },
];

export default function StoresPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stores, setStores] = useState<StoreData[]>(mockStores);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleCreateStore = useCallback(
    async (data: {
      name: string;
      domain: string;
      category: string;
      template: string;
      description: string;
    }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newStore: StoreData = {
        id: stores.length + 1,
        name: data.name,
        domain: `${data.domain}.ywp.sa`,
        products: 0,
        orders: 0,
        revenue: "0 ر.س",
        status: "قيد المراجعة",
        template: data.template,
        category: data.category,
        growth: 0,
      };

      setStores((prev) => [newStore, ...prev]);
    },
    [stores.length]
  );

  const handleDeleteStore = useCallback((id: number) => {
    setStores((prev) => prev.filter((store) => store.id !== id));
    setOpenDropdown(null);
  }, []);

  const getStatusColor = (status: StoreData["status"]) => {
    switch (status) {
      case "نشط":
        return "bg-primary/10 text-primary";
      case "متوقف":
        return "bg-destructive/10 text-destructive";
      case "قيد المراجعة":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
          <p className="mt-1 text-muted-foreground">
            إدارة متاجرك الإلكترونية ({stores.length} متجر)
          </p>
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
        {stores.map((store, i) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(store.status)}`}
                >
                  {store.status}
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === store.id ? null : store.id
                      )
                    }
                    className="rounded-lg p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100"
                    aria-label="المزيد"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {openDropdown === store.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute left-0 top-full z-10 mt-1 w-40 rounded-xl border border-border bg-card p-1 shadow-lg"
                    >
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-right text-sm text-foreground transition-colors hover:bg-secondary">
                        <Eye className="h-4 w-4" />
                        معاينة
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-right text-sm text-foreground transition-colors hover:bg-secondary">
                        <Settings className="h-4 w-4" />
                        الإعدادات
                      </button>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={() => handleDeleteStore(store.id)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-right text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        حذف
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {store.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
              {store.domain}
            </p>

            {/* Growth indicator */}
            <div className="mt-2 flex items-center gap-1">
              {store.growth > 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
              ) : store.growth < 0 ? (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              ) : null}
              <span
                className={`text-xs font-medium ${
                  store.growth > 0
                    ? "text-primary"
                    : store.growth < 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {store.growth > 0 ? "+" : ""}
                {store.growth}% هذا الشهر
              </span>
            </div>

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

      {/* Empty state */}
      {stores.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Store className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            لا توجد متاجر بعد
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            ابدأ رحلتك في التجارة الإلكترونية بإنشاء متجرك الأول
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            إنشاء متجر جديد
          </motion.button>
        </motion.div>
      )}

      {/* Create Store Wizard */}
      <CreateStoreWizard
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateStore}
      />
    </div>
  );
}
