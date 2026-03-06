"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Filter,
  Grid,
  LayoutGrid,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Share2,
  Package,
  CreditCard,
  Clock,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
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
    sold: 520,
    stock: 15,
    colors: ["#1E2A3A", "#E8DCC4", "#6B7280"],
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
    sold: 180,
    stock: 25,
    colors: ["#8B4513", "#000000", "#D4A574"],
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
    sold: 890,
    stock: 8,
    colors: ["#4A0E0E", "#1E2A3A"],
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
    sold: 340,
    stock: 42,
    colors: ["#FFFFFF", "#000000"],
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
    sold: 210,
    stock: 30,
    colors: ["#000000", "#8B4513"],
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
    sold: 420,
    stock: 65,
    colors: ["#FFFFFF"],
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
    sold: 150,
    stock: 50,
    colors: ["#FFFFFF", "#87CEEB", "#1E2A3A"],
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
    sold: 75,
    stock: 5,
    colors: ["#FFD700", "#C0C0C0", "#CD7F32"],
  },
];

const promoSlides = [
  {
    id: 1,
    title: "تخفيضات نهاية الموسم",
    subtitle: "خصم يصل إلى 50% على جميع المنتجات",
    cta: "تسوق الآن",
    gradient: "from-primary to-primary/80",
  },
  {
    id: 2,
    title: "عروض العطور الفاخرة",
    subtitle: "اشترِ 2 واحصل على الثالث مجاناً",
    cta: "اكتشف العروض",
    gradient: "from-accent to-primary",
  },
  {
    id: 3,
    title: "شحن مجاني",
    subtitle: "على جميع الطلبات فوق 200 ر.س",
    cta: "تسوق الآن",
    gradient: "from-primary/80 to-accent/80",
  },
];

const trustBadges = [
  { icon: Truck, label: "توصيل سريع", description: "خلال 2-3 أيام" },
  { icon: Shield, label: "دفع آمن", description: "تشفير كامل" },
  { icon: RotateCcw, label: "إرجاع مجاني", description: "خلال 14 يوم" },
  { icon: Clock, label: "دعم 24/7", description: "نحن هنا لمساعدتك" },
];

export default function StorePreviewPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<typeof storeProducts[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filtered = storeProducts.filter((p) => {
    const matchesCategory = activeCategory === "الكل" || p.category === activeCategory;
    const matchesSearch = p.name.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="bg-primary py-2 text-center text-sm font-medium text-primary-foreground"
      >
        <motion.span
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          شحن مجاني على الطلبات فوق 200 ر.س | استخدم كود: YWP2024
        </motion.span>
      </motion.div>

      {/* Store Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/ywp-logo.jpg"
              alt="متجر الأناقة"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-cover shadow-md"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-foreground">متجر الأناقة</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span>4.9</span>
                <span>(2,450 تقييم)</span>
              </div>
            </div>
          </motion.div>

          <div className="hidden max-w-md flex-1 px-8 lg:block">
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المنتجات..."
                className="w-full rounded-xl border border-input bg-background py-2.5 pe-4 ps-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors hover:bg-accent"
              aria-label="المفضلة"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCart(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-colors"
              aria-label="السلة"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
            <Link
              href="/dashboard"
              className="hidden items-center gap-1 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:flex"
            >
              <ArrowRight className="h-4 w-4" />
              <span>لوحة التحكم</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="relative overflow-hidden bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`flex min-h-[200px] flex-col items-center justify-center bg-gradient-to-r ${promoSlides[currentSlide].gradient} p-8 text-center text-primary-foreground sm:min-h-[280px] sm:p-12`}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold sm:text-4xl"
                >
                  {promoSlides[currentSlide].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-lg text-primary-foreground/90"
                >
                  {promoSlides[currentSlide].subtitle}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 rounded-xl bg-primary-foreground px-8 py-3 font-semibold text-primary shadow-lg"
                >
                  {promoSlides[currentSlide].cta}
                </motion.button>
              </motion.div>
            </AnimatePresence>

            {/* Slider controls */}
            <button
              onClick={prevSlide}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {promoSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-center sm:justify-center"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <badge.icon className="h-5 w-5" />
                </div>
                <div className="text-right sm:text-center">
                  <div className="text-sm font-semibold text-foreground">{badge.label}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Filters */}
      <div className="sticky top-16 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("large")}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  viewMode === "large" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">تصفية</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            عرض {filtered.length} منتج
          </p>
        </div>

        <motion.div
          layout
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 transition-transform">
                      <Store className="h-12 w-12 text-primary/40" />
                    </div>
                  </motion.div>

                  {/* Badges */}
                  {product.badge && (
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute right-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-md"
                    >
                      {product.badge}
                    </motion.span>
                  )}

                  {product.stock < 10 && (
                    <span className="absolute left-3 top-3 rounded-lg bg-destructive/90 px-2 py-0.5 text-xs font-medium text-white">
                      متبقي {product.stock}
                    </span>
                  )}

                  {/* Action buttons */}
                  <div className="absolute left-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 shadow-md backdrop-blur-sm transition-colors hover:bg-card"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id)
                            ? "fill-destructive text-destructive"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuickViewProduct(product)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 shadow-md backdrop-blur-sm transition-colors hover:bg-card"
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </motion.button>
                  </div>

                  {/* Quick add overlay */}
                  <motion.div
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    className="absolute inset-x-0 bottom-0"
                  >
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {addedToCart === product.id ? (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                          تمت الإضافة
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          أضف للسلة
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Rating and sold */}
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-xs font-medium text-foreground">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      بيع {product.sold}+
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                    {product.name}
                  </h3>

                  {/* Colors */}
                  <div className="mt-2 flex items-center gap-1">
                    {product.colors.slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center gap-2">
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

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Package className="h-4 w-4" />
            عرض المزيد من المنتجات
          </motion.button>
        </motion.div>
      </div>

      {/* Store Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/ywp-logo.jpg"
                  alt="متجر الأناقة"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl object-cover"
                />
                <span className="text-lg font-bold text-foreground">متجر الأناقة</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                وجهتك الأولى للمنتجات الفاخرة والحصرية بأفضل الأسعار. نوفر لك تجربة تسوق مميزة مع خدمة عملاء استثنائية.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-primary">من نحن</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">تواصل معنا</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">الأسئلة الشائعة</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">تواصل معنا</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span dir="ltr">+966 50 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span dir="ltr">info@elegance.ywp.sa</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">وسائل الدفع</h4>
              <div className="flex flex-wrap gap-2">
                {["مدى", "Visa", "Mastercard", "Apple Pay", "تمارا"].map((method) => (
                  <span key={method} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              {"مدعوم من"}{" "}
              <Link href="/" className="font-semibold text-primary hover:underline">
                YWP
              </Link>
              {" - جميع الحقوق محفوظة"} &copy; {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
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
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">سلة التسوق</h2>
                    <p className="text-xs text-muted-foreground">{totalItems} منتج</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-muted-foreground"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
                      <ShoppingCart className="h-10 w-10" />
                    </div>
                    <p className="mt-4 text-sm font-medium">سلة التسوق فارغة</p>
                    <p className="mt-1 text-xs">أضف منتجات للبدء</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                      تصفح المنتجات
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-3"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Store className="h-8 w-8 text-primary/40" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                          <p className="text-sm font-bold text-primary">{item.price} ر.س</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-foreground">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive"
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
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span className="font-medium text-foreground">{totalPrice.toLocaleString("ar-SA")} ر.س</span>
                  </div>
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">الشحن</span>
                    <span className="font-medium text-primary">مجاني</span>
                  </div>
                  <div className="mb-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-semibold text-foreground">الإجمالي</span>
                    <span className="text-xl font-bold text-primary">{totalPrice.toLocaleString("ar-SA")} ر.س</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                  >
                    <CreditCard className="h-5 w-5" />
                    إتمام الشراء
                  </motion.button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    <Shield className="ml-1 inline h-3 w-3" />
                    معاملات آمنة ومشفرة 100%
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="flex aspect-square items-center justify-center bg-muted p-8 sm:w-1/2">
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-primary/10">
                    <Store className="h-16 w-16 text-primary/40" />
                  </div>
                </div>
                <div className="flex flex-col p-6 sm:w-1/2">
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  
                  {quickViewProduct.badge && (
                    <span className="mb-2 w-fit rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                      {quickViewProduct.badge}
                    </span>
                  )}
                  
                  <h2 className="text-xl font-bold text-foreground">{quickViewProduct.name}</h2>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({quickViewProduct.reviews} تقييم)</span>
                    <span className="text-sm text-muted-foreground">| بيع {quickViewProduct.sold}+</span>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">{quickViewProduct.price} ر.س</span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{quickViewProduct.originalPrice} ر.س</span>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-foreground">الألوان المتاحة:</p>
                    <div className="flex gap-2">
                      {quickViewProduct.colors.map((color, i) => (
                        <button
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-border transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-muted-foreground">
                    متوفر: <span className={quickViewProduct.stock < 10 ? "text-destructive" : "text-primary"}>{quickViewProduct.stock} قطعة</span>
                  </p>
                  
                  <div className="mt-6 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      أضف للسلة
                    </motion.button>
                    <button
                      onClick={() => toggleFavorite(quickViewProduct.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border"
                    >
                      <Heart className={`h-5 w-5 ${favorites.includes(quickViewProduct.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                    </button>
                    <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-border">
                      <Share2 className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
