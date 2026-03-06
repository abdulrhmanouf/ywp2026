"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Package,
  X,
  Upload,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "ساعة ذكية فاخرة",
    price: "450 ر.س",
    stock: 25,
    category: "إلكترونيات",
    status: "نشط",
  },
  {
    id: 2,
    name: "حقيبة جلدية إيطالية",
    price: "320 ر.س",
    stock: 12,
    category: "أزياء",
    status: "نشط",
  },
  {
    id: 3,
    name: "عطر عود فاخر",
    price: "580 ر.س",
    stock: 40,
    category: "عطور",
    status: "نشط",
  },
  {
    id: 4,
    name: "سماعات لاسلكية",
    price: "250 ر.س",
    stock: 0,
    category: "إلكترونيات",
    status: "نفذ المخزون",
  },
  {
    id: 5,
    name: "نظارة شمسية",
    price: "180 ر.س",
    stock: 18,
    category: "إكسسوارات",
    status: "نشط",
  },
  {
    id: 6,
    name: "حذاء رياضي",
    price: "350 ر.س",
    stock: 30,
    category: "أحذية",
    status: "نشط",
  },
  {
    id: 7,
    name: "قميص قطني",
    price: "120 ر.س",
    stock: 50,
    category: "أزياء",
    status: "نشط",
  },
  {
    id: 8,
    name: "كريم مرطب طبيعي",
    price: "95 ر.س",
    stock: 8,
    category: "العناية",
    status: "نشط",
  },
];

export default function ProductsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockProducts.filter((p) =>
    p.name.includes(searchQuery)
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            المنتجات
          </h1>
          <p className="mt-1 text-muted-foreground">
            إدارة منتجاتك عبر جميع المتاجر
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          إضافة منتج
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن منتج..."
            className="w-full rounded-xl border border-input bg-card py-2.5 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border bg-card shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  المنتج
                </th>
                <th className="hidden px-5 py-3 text-right text-xs font-medium text-muted-foreground sm:table-cell">
                  التصنيف
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  السعر
                </th>
                <th className="hidden px-5 py-3 text-right text-xs font-medium text-muted-foreground md:table-cell">
                  المخزون
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  الحالة
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted-foreground sm:table-cell">
                    {product.category}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {product.price}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted-foreground md:table-cell">
                    {product.stock}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.status === "نشط"
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        aria-label="تعديل"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
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
                  إضافة منتج جديد
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
                  aria-label="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل اسم المنتج"
                    className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      السعر (ر.س)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      المخزون
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full rounded-xl border border-input bg-background py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    الوصف
                  </label>
                  <textarea
                    rows={3}
                    placeholder="وصف المنتج..."
                    className="w-full resize-none rounded-xl border border-input bg-background py-3 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    صورة المنتج
                  </label>
                  <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input py-8 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">اسحب الصورة هنا أو اضغط للرفع</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                >
                  إضافة المنتج
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
