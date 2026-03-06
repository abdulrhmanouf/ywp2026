"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Paintbrush,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { icon: LayoutDashboard, label: "نظرة عامة", href: "/dashboard" },
  { icon: Store, label: "المتاجر", href: "/dashboard/stores" },
  { icon: Paintbrush, label: "تصميم متجرك", href: "/dashboard/builder" },
  { icon: Package, label: "المنتجات", href: "/dashboard/products" },
  { icon: ShoppingCart, label: "الطلبات", href: "/dashboard/orders" },
  { icon: Settings, label: "الإعدادات", href: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/images/ywp-logo.jpg"
            alt="YWP"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-lg object-cover"
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap text-lg font-bold text-sidebar-foreground"
              >
                YWP
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:flex"
          aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
        >
          {collapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-sidebar-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-5 w-5 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3">
        <div className="mb-2 flex justify-center">
          <ThemeToggle />
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                تسجيل الخروج
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-card text-foreground shadow-md lg:hidden"
        aria-label="فتح القائمة"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-[280px] border-l border-sidebar-border bg-sidebar lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute left-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent"
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 hidden h-screen shrink-0 border-l border-sidebar-border bg-sidebar lg:block"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
