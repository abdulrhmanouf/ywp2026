"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  ShoppingCart,
  Search,
  Heart,
  Star,
  Plus,
  Minus,
  X,
  Check,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const categories = ["الكل", "إلكترونيات", "أزياء", "عطور", "إكسسوارات", "العناية"];

const storeProducts = [
  {
    id: 1,
    name: "ساعة ذكية فاخرة",
    price: 450,
    originalPrice: 599,
    category: "إلكترونيات",
    rating: 4.8,
    reviews: 124,
    badge: "الأكثر مبيعاً",
  },
  {
    id: 2,
    name: "حقيبة جلدية إيطالية",
    price: 320,
    originalPrice: null,
    category: "أزياء",
    rating: 4.6,
    reviews: 89,
    badge: null,
  },
  {
    id: 3,
    name: "عطر عود ملكي",
    price: 580,
    originalPrice: 750,
    category: "عطور",
    rating: 4.9,
    reviews: 256,
    badge: "خصم 22%",
  },
  {
    id: 4,
    name: "سماعات لاسلكية برو",
    price: 250,
    originalPrice: null,
    category: "إلكترونيات",
    rating: 4.5,
    reviews: 67,
    badge: null,
  },
  {
    id: 5,
    name: "نظارة شمسية راي بان",
    price: 180,
    originalPrice: 220,
    category: "إكسسوارات",
    rating: 4.7,
    reviews: 143,
    badge: "جديد",
  },
  {
    id: 6,
    name: "كريم مرطب طبيعي",
    price: 95,
    originalPrice: null,
    category: "العناية",
    rating: 4.4,
    reviews: 52,
    badge: null,
  },
  {
    id: 7,
    name: "قميص قطني بريميوم",
    price: 120,
    originalPrice: 160,
    category: "أزياء",
    rating: 4.3,
    reviews: 38,
    badge: null,
  },
  {
    id: 8,
    name: "سوار ذهبي فاخر",
    price: 890,
    originalPrice: null,
    category: "إكسسوارات",
    rating: 4.9,
    reviews: 201,
    badge: "حصري",
  },
];

export default function StorePreviewPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (product: (typeof storeProducts)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filtered =
    activeCategory === "الكل"
      ? storeProducts
      : storeProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Store Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">متجر الأناقة</span>
          </div>

          <div className="hidden max-w-md flex-1 px-8 md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث في المنتجات..."
                className="w-full rounded-xl border border-input bg-background py-2 pe-4 ps-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCart(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors hover:bg-accent"
              aria-label="السلة"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary/5 py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
          >
            أفضل المنتجات الفاخرة
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground"
          >
            اكتشف تشكيلة مميزة من أرقى المنتجات بأسعار منافسة وتوصيل سريع لجميع مناطق المملكة
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Product Image Placeholder */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                      <Store className="h-10 w-10 text-primary/40" />
                    </div>
                  </div>

                  {product.badge && (
                    <span className="absolute right-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-destructive"
                    aria-label={favorites.includes(product.id) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id)
                          ? "fill-destructive text-destructive"
                          : ""
                      }`}
                    />
                  </button>

                  {/* Quick add overlay */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform group-hover:translate-y-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground"
                    >
                      {addedToCart === product.id ? (
                        <>
                          <Check className="h-4 w-4" />
                          تمت الإضافة
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          أضف للسلة
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-1 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      {product.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {product.price} ر.س
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice} ر.س
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Store Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                  <Store className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">متجر الأناقة</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                وجهتك الأولى للمنتجات الفاخرة والحصرية بأفضل الأسعار.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">+966 50 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span dir="ltr">info@elegance.ywp.sa</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">روابط سريعة</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block transition-colors hover:text-primary">سياسة الإرجاع</a>
                <a href="#" className="block transition-colors hover:text-primary">الشحن والتوصيل</a>
                <a href="#" className="block transition-colors hover:text-primary">الأسئلة الشائعة</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            {"مدعوم من"}{" "}
            <Link href="/" className="font-semibold text-primary hover:underline">
              YWP
            </Link>
            {" - جميع الحقوق محفوظة"} &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 top-0 z-50 flex w-full max-w-md flex-col border-r border-border bg-card shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-lg font-bold text-foreground">
                  سلة التسوق ({totalItems})
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
                  aria-label="إغلاق السلة"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <ShoppingCart className="mb-3 h-12 w-12" />
                    <p className="text-sm">سلة التسوق فارغة</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3 rounded-xl border border-border p-3"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Store className="h-6 w-6 text-primary/40" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-foreground">
                            {item.name}
                          </h4>
                          <p className="text-sm font-semibold text-primary">
                            {item.price} ر.س
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary"
                            aria-label="تقليل الكمية"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-foreground">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary"
                            aria-label="زيادة الكمية"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="حذف"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-medium text-foreground">المجموع</span>
                    <span className="text-xl font-bold text-primary">
                      {totalPrice.toLocaleString("ar-SA")} ر.س
                    </span>
                  </div>
                  <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90">
                    إتمام الطلب
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
