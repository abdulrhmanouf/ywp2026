"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Filter } from "lucide-react";

const mockOrders = [
  {
    id: "#ORD-1001",
    customer: "أحمد محمد الشهري",
    date: "2026-03-01",
    items: 3,
    total: "1,250 ر.س",
    payment: "مدى",
    status: "مكتمل",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    id: "#ORD-1002",
    customer: "فاطمة علي الزهراني",
    date: "2026-03-01",
    items: 1,
    total: "450 ر.س",
    payment: "فيزا",
    status: "قيد التوصيل",
    statusColor: "bg-chart-4/20 text-chart-4",
  },
  {
    id: "#ORD-1003",
    customer: "خالد سعود العنزي",
    date: "2026-02-28",
    items: 2,
    total: "780 ر.س",
    payment: "Apple Pay",
    status: "جديد",
    statusColor: "bg-chart-3/20 text-chart-3",
  },
  {
    id: "#ORD-1004",
    customer: "نورة عبدالله القحطاني",
    date: "2026-02-28",
    items: 5,
    total: "2,100 ر.س",
    payment: "تمارا",
    status: "مكتمل",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    id: "#ORD-1005",
    customer: "عمر حسن الدوسري",
    date: "2026-02-27",
    items: 1,
    total: "320 ر.س",
    payment: "مدى",
    status: "ملغي",
    statusColor: "bg-destructive/10 text-destructive",
  },
  {
    id: "#ORD-1006",
    customer: "ريم فهد المطيري",
    date: "2026-02-27",
    items: 4,
    total: "1,890 ر.س",
    payment: "فيزا",
    status: "قيد التوصيل",
    statusColor: "bg-chart-4/20 text-chart-4",
  },
  {
    id: "#ORD-1007",
    customer: "سلطان ناصر الحربي",
    date: "2026-02-26",
    items: 2,
    total: "560 ر.س",
    payment: "Apple Pay",
    status: "مكتمل",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    id: "#ORD-1008",
    customer: "منى خالد السبيعي",
    date: "2026-02-26",
    items: 1,
    total: "180 ر.س",
    payment: "مدى",
    status: "جديد",
    statusColor: "bg-chart-3/20 text-chart-3",
  },
];

const statusFilters = ["الكل", "جديد", "قيد التوصيل", "مكتمل", "ملغي"];

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockOrders.filter((o) => {
    const matchesSearch =
      o.customer.includes(searchQuery) || o.id.includes(searchQuery);
    const matchesFilter =
      activeFilter === "الكل" || o.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          الطلبات
        </h1>
        <p className="mt-1 text-muted-foreground">
          متابعة وإدارة طلبات العملاء
        </p>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs sm:w-64">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث..."
            className="w-full rounded-xl border border-input bg-card py-2 pe-4 ps-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </motion.div>

      {/* Orders Table */}
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
                  رقم الطلب
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  العميل
                </th>
                <th className="hidden px-5 py-3 text-right text-xs font-medium text-muted-foreground sm:table-cell">
                  التاريخ
                </th>
                <th className="hidden px-5 py-3 text-right text-xs font-medium text-muted-foreground md:table-cell">
                  المنتجات
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  المبلغ
                </th>
                <th className="hidden px-5 py-3 text-right text-xs font-medium text-muted-foreground lg:table-cell">
                  الدفع
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  الحالة
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  عرض
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {order.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    {order.customer}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted-foreground sm:table-cell" dir="ltr">
                    {order.date}
                  </td>
                  <td className="hidden px-5 py-4 text-center text-sm text-muted-foreground md:table-cell">
                    {order.items}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {order.total}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted-foreground lg:table-cell">
                    {order.payment}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label="عرض التفاصيل"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Filter className="mb-2 h-8 w-8" />
            <p>لا توجد طلبات مطابقة</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
