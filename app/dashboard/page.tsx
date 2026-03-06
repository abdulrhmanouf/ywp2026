"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/dashboard/animated-counter";

const statsCards = [
  {
    title: "إجمالي المبيعات",
    value: 45230,
    prefix: "",
    suffix: " ر.س",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "الطلبات",
    value: 1250,
    prefix: "",
    suffix: "",
    change: "+8.2%",
    positive: true,
    icon: ShoppingCart,
  },
  {
    title: "العملاء",
    value: 3480,
    prefix: "",
    suffix: "",
    change: "+15.3%",
    positive: true,
    icon: Users,
  },
  {
    title: "المنتجات",
    value: 186,
    prefix: "",
    suffix: "",
    change: "-2.1%",
    positive: false,
    icon: Package,
  },
];

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "أحمد محمد",
    product: "ساعة ذكية",
    amount: "450 ر.س",
    status: "مكتمل",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    id: "#ORD-002",
    customer: "فاطمة علي",
    product: "حقيبة جلدية",
    amount: "320 ر.س",
    status: "قيد التوصيل",
    statusColor: "bg-chart-4/20 text-chart-4",
  },
  {
    id: "#ORD-003",
    customer: "خالد سعود",
    product: "عطر فاخر",
    amount: "580 ر.س",
    status: "مكتمل",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    id: "#ORD-004",
    customer: "نورة عبدالله",
    product: "سماعات لاسلكية",
    amount: "250 ر.س",
    status: "جديد",
    statusColor: "bg-chart-3/20 text-chart-3",
  },
  {
    id: "#ORD-005",
    customer: "عمر حسن",
    product: "نظارة شمسية",
    amount: "180 ر.س",
    status: "مكتمل",
    statusColor: "bg-primary/10 text-primary",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardOverview() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          مرحباً، محمد
        </h1>
        <p className="mt-1 text-muted-foreground">
          إليك نظرة عامة على أداء متاجرك اليوم
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statsCards.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.title}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-foreground">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm">
              {stat.positive ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={
                  stat.positive ? "text-primary" : "text-destructive"
                }
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground">من الشهر الماضي</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 rounded-2xl border border-border bg-card shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-lg font-semibold text-foreground">
            أحدث الطلبات
          </h2>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
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
                  المنتج
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  المبلغ
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {order.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    {order.customer}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted-foreground sm:table-cell">
                    {order.product}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {order.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
