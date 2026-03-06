"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paintbrush,
  Type,
  Palette,
  Layout,
  Image,
  ShoppingBag,
  Eye,
  Save,
  ChevronLeft,
  ChevronRight,
  Check,
  Undo2,
  Redo2,
  Smartphone,
  Monitor,
  Tablet,
  Sun,
  Moon,
  Sparkles,
  Store,
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Globe,
  Phone,
  Mail,
  MapPin,
  Search,
} from "lucide-react";

// ── Builder Steps ──
const steps = [
  { id: "template", label: "القالب", icon: Layout },
  { id: "colors", label: "الألوان", icon: Palette },
  { id: "typography", label: "الخطوط", icon: Type },
  { id: "header", label: "الهيدر", icon: Image },
  { id: "products", label: "المنتجات", icon: ShoppingBag },
  { id: "info", label: "المعلومات", icon: Globe },
];

// ── Template Options ──
const templates = [
  {
    id: "modern",
    name: "عصري",
    description: "تصميم عصري ونظيف مناسب لجميع المنتجات",
    headerStyle: "full",
  },
  {
    id: "elegant",
    name: "فاخر",
    description: "تصميم فاخر وأنيق مثالي للماركات الراقية",
    headerStyle: "split",
  },
  {
    id: "minimal",
    name: "بسيط",
    description: "تصميم بسيط وخفيف يركز على المنتجات",
    headerStyle: "minimal",
  },
  {
    id: "bold",
    name: "جريء",
    description: "تصميم جريء وملفت يناسب المتاجر الشبابية",
    headerStyle: "hero",
  },
];

// ── Color Palettes ──
const colorPalettes = [
  { id: "green", name: "أخضر سعودي", primary: "#16a34a", accent: "#15803d", bg: "#f0fdf4" },
  { id: "blue", name: "أزرق ملكي", primary: "#2563eb", accent: "#1d4ed8", bg: "#eff6ff" },
  { id: "purple", name: "بنفسجي", primary: "#9333ea", accent: "#7e22ce", bg: "#faf5ff" },
  { id: "rose", name: "وردي", primary: "#e11d48", accent: "#be123c", bg: "#fff1f2" },
  { id: "amber", name: "ذهبي", primary: "#d97706", accent: "#b45309", bg: "#fffbeb" },
  { id: "teal", name: "تركوازي", primary: "#0d9488", accent: "#0f766e", bg: "#f0fdfa" },
];

// ── Font Options ──
const fontOptions = [
  { id: "ibm", name: "IBM Plex Arabic", sample: "نص تجريبي للمعاينة", className: "font-sans" },
  { id: "noto", name: "Noto Sans Arabic", sample: "نص تجريبي للمعاينة", className: "font-sans" },
  { id: "cairo", name: "Cairo", sample: "نص تجريبي للمعاينة", className: "font-sans" },
  { id: "tajawal", name: "Tajawal", sample: "نص تجريبي للمعاينة", className: "font-sans" },
];

// ── Header Styles ──
const headerOptions = [
  { id: "full-banner", name: "بانر كامل", desc: "صورة بانر كبيرة مع عنوان" },
  { id: "slider", name: "سلايدر", desc: "عرض شرائح متحرك للعروض" },
  { id: "split", name: "مقسّم", desc: "نص في جهة وصورة في جهة" },
  { id: "minimal-text", name: "نص فقط", desc: "عنوان ووصف بدون صور" },
];

// ── Product Display ──
const productDisplayOptions = [
  { id: "grid-3", name: "شبكة 3 أعمدة", cols: 3 },
  { id: "grid-4", name: "شبكة 4 أعمدة", cols: 4 },
  { id: "grid-2", name: "شبكة 2 أعمدة", cols: 2 },
  { id: "list", name: "عرض قائمة", cols: 1 },
];

// ── Mock Products for Preview ──
const previewProducts = [
  { id: 1, name: "ساعة ذكية فاخرة", price: 450, rating: 4.8, badge: "الأكثر مبيعاً" },
  { id: 2, name: "حقيبة جلدية إيطالية", price: 320, rating: 4.6, badge: null },
  { id: 3, name: "عطر عود ملكي", price: 580, rating: 4.9, badge: "خصم 22%" },
  { id: 4, name: "سماعات لاسلكية برو", price: 250, rating: 4.5, badge: null },
  { id: 5, name: "نظارة شمسية راي بان", price: 180, rating: 4.7, badge: "جديد" },
  { id: 6, name: "كريم مرطب طبيعي", price: 95, rating: 4.4, badge: null },
];

export default function StoreBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewDark, setPreviewDark] = useState(false);
  const [saved, setSaved] = useState(false);

  // ── Store Config State ──
  const [config, setConfig] = useState({
    template: "modern",
    colorPalette: "green",
    font: "ibm",
    headerStyle: "full-banner",
    productDisplay: "grid-3",
    storeName: "متجر الأناقة",
    storeDescription: "وجهتك الأولى للمنتجات الفاخرة والحصرية",
    phone: "+966 50 123 4567",
    email: "info@store.ywp.sa",
    address: "الرياض، المملكة العربية السعودية",
    showBadges: true,
    showRatings: true,
    showFavorites: true,
    roundedCards: true,
  });

  const updateConfig = (key: string, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const selectedPalette = colorPalettes.find((p) => p.id === config.colorPalette) || colorPalettes[0];
  const selectedTemplate = templates.find((t) => t.id === config.template) || templates[0];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const getProductCols = () => {
    const opt = productDisplayOptions.find((o) => o.id === config.productDisplay);
    return opt ? opt.cols : 3;
  };

  const previewWidth = previewDevice === "mobile" ? "max-w-[375px]" : previewDevice === "tablet" ? "max-w-[768px]" : "w-full";

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
            <Paintbrush className="h-7 w-7 text-primary" />
            تصميم متجرك
          </h1>
          <p className="mt-1 text-muted-foreground">
            خصّص تصميم متجرك الإلكتروني بالكامل ليعكس هويتك التجارية
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "تم الحفظ" : "حفظ التصميم"}
          </motion.button>
        </div>
      </motion.div>

      {/* Steps Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex items-center gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-2 shadow-sm"
      >
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(i)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
              currentStep === i
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : i < currentStep
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <step.icon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{step.label}</span>
          </button>
        ))}
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-5">
        {/* Left Panel - Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2"
        >
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <AnimatePresence mode="wait">
              {/* STEP: Template */}
              {currentStep === 0 && (
                <motion.div
                  key="template"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-1 text-lg font-semibold text-foreground">اختر القالب</h2>
                  <p className="mb-5 text-sm text-muted-foreground">اختر القالب الأساسي لمتجرك</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => updateConfig("template", t.id)}
                        className={`relative rounded-xl border-2 p-4 text-right transition-all ${
                          config.template === t.id
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        {config.template === t.id && (
                          <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        <div className="mb-2 flex h-16 items-center justify-center rounded-lg bg-muted">
                          <Layout className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP: Colors */}
              {currentStep === 1 && (
                <motion.div
                  key="colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-1 text-lg font-semibold text-foreground">لوحة الألوان</h2>
                  <p className="mb-5 text-sm text-muted-foreground">اختر الألوان المناسبة لعلامتك التجارية</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {colorPalettes.map((palette) => (
                      <button
                        key={palette.id}
                        onClick={() => updateConfig("colorPalette", palette.id)}
                        className={`relative flex items-center gap-3 rounded-xl border-2 p-3 text-right transition-all ${
                          config.colorPalette === palette.id
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex shrink-0 gap-1">
                          <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: palette.primary }} />
                          <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: palette.accent }} />
                          <div className="h-8 w-8 rounded-lg border border-border" style={{ backgroundColor: palette.bg }} />
                        </div>
                        <span className="text-sm font-medium text-foreground">{palette.name}</span>
                        {config.colorPalette === palette.id && (
                          <Check className="mr-auto h-4 w-4 shrink-0 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-border p-4">
                    <h3 className="mb-3 text-sm font-medium text-foreground">لون مخصص</h3>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        defaultValue={selectedPalette.primary}
                        className="h-10 w-10 cursor-pointer rounded-lg border-0"
                      />
                      <span className="text-sm text-muted-foreground">اختر لوناً مخصصاً لمتجرك</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP: Typography */}
              {currentStep === 2 && (
                <motion.div
                  key="typography"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-1 text-lg font-semibold text-foreground">نوع الخط</h2>
                  <p className="mb-5 text-sm text-muted-foreground">اختر الخط المناسب لمتجرك</p>
                  <div className="space-y-3">
                    {fontOptions.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => updateConfig("font", f.id)}
                        className={`w-full rounded-xl border-2 p-4 text-right transition-all ${
                          config.font === f.id
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">{f.name}</span>
                          {config.font === f.id && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="mt-2 text-lg text-muted-foreground">{f.sample}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP: Header */}
              {currentStep === 3 && (
                <motion.div
                  key="header"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-1 text-lg font-semibold text-foreground">تصميم الهيدر</h2>
                  <p className="mb-5 text-sm text-muted-foreground">اختر نمط عرض البانر الرئيسي</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {headerOptions.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => updateConfig("headerStyle", h.id)}
                        className={`relative rounded-xl border-2 p-4 text-right transition-all ${
                          config.headerStyle === h.id
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        {config.headerStyle === h.id && (
                          <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        <div className="mb-2 flex h-12 items-center justify-center rounded-lg bg-muted">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{h.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{h.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">عنوان البانر</label>
                      <input
                        type="text"
                        value={config.storeDescription}
                        onChange={(e) => updateConfig("storeDescription", e.target.value)}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP: Products Display */}
              {currentStep === 4 && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-1 text-lg font-semibold text-foreground">عرض المنتجات</h2>
                  <p className="mb-5 text-sm text-muted-foreground">اختر طريقة عرض المنتجات في متجرك</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {productDisplayOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => updateConfig("productDisplay", opt.id)}
                        className={`relative rounded-xl border-2 p-4 text-right transition-all ${
                          config.productDisplay === opt.id
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        {config.productDisplay === opt.id && (
                          <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        <div className="mb-2 flex gap-1">
                          {Array.from({ length: Math.min(opt.cols, 4) }).map((_, ci) => (
                            <div key={ci} className="h-8 flex-1 rounded bg-muted" />
                          ))}
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{opt.name}</h3>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3">
                    <h3 className="text-sm font-medium text-foreground">خيارات إضافية</h3>
                    {[
                      { key: "showBadges", label: "إظهار الشارات (الأكثر مبيعاً، جديد...)" },
                      { key: "showRatings", label: "إظهار التقييمات" },
                      { key: "showFavorites", label: "إظهار زر المفضلة" },
                      { key: "roundedCards", label: "بطاقات مستديرة الأطراف" },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        className="flex items-center justify-between rounded-xl border border-border p-3"
                      >
                        <span className="text-sm text-foreground">{opt.label}</span>
                        <label className="relative inline-flex cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config[opt.key as keyof typeof config] as boolean}
                            onChange={(e) => updateConfig(opt.key, e.target.checked)}
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-muted transition-colors after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-card after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full" />
                        </label>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP: Store Info */}
              {currentStep === 5 && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-1 text-lg font-semibold text-foreground">معلومات المتجر</h2>
                  <p className="mb-5 text-sm text-muted-foreground">أدخل معلومات التواصل الخاصة بمتجرك</p>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">اسم المتجر</label>
                      <div className="relative">
                        <Store className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={config.storeName}
                          onChange={(e) => updateConfig("storeName", e.target.value)}
                          className="w-full rounded-xl border border-input bg-background py-3 pe-4 ps-4 pr-11 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">الوصف</label>
                      <textarea
                        value={config.storeDescription}
                        onChange={(e) => updateConfig("storeDescription", e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">رقم الجوال</label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="tel"
                          value={config.phone}
                          onChange={(e) => updateConfig("phone", e.target.value)}
                          className="w-full rounded-xl border border-input bg-background py-3 pe-4 ps-4 pr-11 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">البريد الإلكتروني</label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          value={config.email}
                          onChange={(e) => updateConfig("email", e.target.value)}
                          className="w-full rounded-xl border border-input bg-background py-3 pe-4 ps-4 pr-11 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">العنوان</label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={config.address}
                          onChange={(e) => updateConfig("address", e.target.value)}
                          className="w-full rounded-xl border border-input bg-background py-3 pe-4 ps-4 pr-11 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Navigation */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
                السابق
              </button>
              <span className="text-xs text-muted-foreground">
                {currentStep + 1} من {steps.length}
              </span>
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
              >
                التالي
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-3"
        >
          <div className="rounded-2xl border border-border bg-card shadow-sm">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">معاينة مباشرة</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border border-border p-0.5">
                  {([
                    { id: "desktop" as const, icon: Monitor },
                    { id: "tablet" as const, icon: Tablet },
                    { id: "mobile" as const, icon: Smartphone },
                  ]).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setPreviewDevice(d.id)}
                      className={`rounded-md p-1.5 transition-colors ${
                        previewDevice === d.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label={d.id}
                    >
                      <d.icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPreviewDark(!previewDark)}
                  className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="تبديل الوضع"
                >
                  {previewDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex justify-center overflow-hidden p-4">
              <motion.div
                layout
                className={`${previewWidth} overflow-hidden rounded-xl border border-border shadow-sm transition-all ${
                  previewDark ? "bg-[#1a1a2e] text-[#f0f0f0]" : "bg-[#fafafa] text-[#1a1a1a]"
                }`}
                style={{ minHeight: 500 }}
              >
                {/* Preview Store Header */}
                <div
                  className="flex items-center justify-between border-b px-4 py-3"
                  style={{
                    borderColor: previewDark ? "#333" : "#e5e5e5",
                    backgroundColor: previewDark ? "#222" : "#fff",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ backgroundColor: selectedPalette.primary }}
                    >
                      <Store className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-bold">{config.storeName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg p-1.5"
                      style={{ backgroundColor: previewDark ? "#333" : "#f3f3f3" }}
                    >
                      <Search className="h-3.5 w-3.5 opacity-50" />
                    </div>
                    <div
                      className="rounded-lg p-1.5"
                      style={{ backgroundColor: previewDark ? "#333" : "#f3f3f3" }}
                    >
                      <ShoppingCart className="h-3.5 w-3.5 opacity-50" />
                    </div>
                  </div>
                </div>

                {/* Preview Hero Banner */}
                <div
                  className="px-4 py-6 text-center"
                  style={{ backgroundColor: selectedPalette.bg }}
                >
                  {config.headerStyle === "full-banner" && (
                    <>
                      <h2 className="text-lg font-bold" style={{ color: previewDark ? "#f0f0f0" : "#1a1a1a" }}>
                        {config.storeDescription}
                      </h2>
                      <p className="mt-1 text-xs opacity-60">اكتشف أفضل المنتجات بأسعار منافسة</p>
                      <button
                        className="mt-3 rounded-lg px-4 py-1.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: selectedPalette.primary }}
                      >
                        تسوق الآن
                      </button>
                    </>
                  )}
                  {config.headerStyle === "slider" && (
                    <div className="flex items-center justify-between">
                      <ChevronRight className="h-5 w-5 opacity-30" />
                      <div>
                        <h2 className="text-lg font-bold" style={{ color: previewDark ? "#f0f0f0" : "#1a1a1a" }}>
                          {config.storeDescription}
                        </h2>
                        <div className="mt-2 flex justify-center gap-1">
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              className="h-1.5 rounded-full"
                              style={{
                                width: d === 0 ? 16 : 6,
                                backgroundColor: d === 0 ? selectedPalette.primary : previewDark ? "#555" : "#ccc",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <ChevronLeft className="h-5 w-5 opacity-30" />
                    </div>
                  )}
                  {config.headerStyle === "split" && (
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right">
                        <h2 className="text-base font-bold" style={{ color: previewDark ? "#f0f0f0" : "#1a1a1a" }}>
                          {config.storeDescription}
                        </h2>
                        <button
                          className="mt-2 rounded-lg px-3 py-1 text-xs font-semibold text-white"
                          style={{ backgroundColor: selectedPalette.primary }}
                        >
                          تسوق الآن
                        </button>
                      </div>
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-xl"
                        style={{ backgroundColor: previewDark ? "#333" : "#e5e5e5" }}
                      >
                        <Image className="h-8 w-8 opacity-30" />
                      </div>
                    </div>
                  )}
                  {config.headerStyle === "minimal-text" && (
                    <>
                      <Sparkles className="mx-auto mb-2 h-5 w-5" style={{ color: selectedPalette.primary }} />
                      <h2 className="text-lg font-bold" style={{ color: previewDark ? "#f0f0f0" : "#1a1a1a" }}>
                        {config.storeDescription}
                      </h2>
                    </>
                  )}
                </div>

                {/* Preview Products Grid */}
                <div className="px-3 py-4">
                  <h3 className="mb-3 text-sm font-semibold">المنتجات</h3>
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns:
                        getProductCols() === 1
                          ? "1fr"
                          : `repeat(${Math.min(getProductCols(), previewDevice === "mobile" ? 2 : getProductCols())}, 1fr)`,
                    }}
                  >
                    {previewProducts.slice(0, getProductCols() === 1 ? 3 : 6).map((product) => (
                      <div
                        key={product.id}
                        className={`overflow-hidden border ${
                          previewDark ? "border-[#333] bg-[#222]" : "border-[#e5e5e5] bg-white"
                        } ${config.roundedCards ? "rounded-xl" : "rounded-md"}`}
                      >
                        {getProductCols() === 1 ? (
                          // List view
                          <div className="flex items-center gap-3 p-2">
                            <div
                              className={`flex h-16 w-16 shrink-0 items-center justify-center ${config.roundedCards ? "rounded-lg" : "rounded"}`}
                              style={{ backgroundColor: previewDark ? "#333" : "#f3f3f3" }}
                            >
                              <ShoppingBag className="h-5 w-5 opacity-30" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold">{product.name}</p>
                              {config.showRatings && (
                                <div className="mt-0.5 flex items-center gap-0.5">
                                  <Star className="h-2.5 w-2.5" style={{ color: selectedPalette.primary, fill: selectedPalette.primary }} />
                                  <span className="text-[10px] opacity-60">{product.rating}</span>
                                </div>
                              )}
                              <p className="mt-0.5 text-xs font-bold" style={{ color: selectedPalette.primary }}>{product.price} ر.س</p>
                            </div>
                          </div>
                        ) : (
                          // Grid view
                          <>
                            <div
                              className="relative flex aspect-square items-center justify-center"
                              style={{ backgroundColor: previewDark ? "#333" : "#f3f3f3" }}
                            >
                              <ShoppingBag className="h-6 w-6 opacity-20" />
                              {config.showBadges && product.badge && (
                                <span
                                  className="absolute right-1 top-1 rounded px-1.5 py-0.5 text-[8px] font-semibold text-white"
                                  style={{ backgroundColor: selectedPalette.primary }}
                                >
                                  {product.badge}
                                </span>
                              )}
                              {config.showFavorites && (
                                <button className="absolute left-1 top-1">
                                  <Heart className="h-3 w-3 opacity-30" />
                                </button>
                              )}
                            </div>
                            <div className="p-2">
                              {config.showRatings && (
                                <div className="mb-0.5 flex items-center gap-0.5">
                                  <Star className="h-2.5 w-2.5" style={{ color: selectedPalette.primary, fill: selectedPalette.primary }} />
                                  <span className="text-[10px] opacity-60">{product.rating}</span>
                                </div>
                              )}
                              <p className="text-[11px] font-semibold leading-tight">{product.name}</p>
                              <p className="mt-1 text-xs font-bold" style={{ color: selectedPalette.primary }}>{product.price} ر.س</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview Footer */}
                <div
                  className="border-t px-4 py-3 text-center text-[10px] opacity-50"
                  style={{ borderColor: previewDark ? "#333" : "#e5e5e5" }}
                >
                  {"مدعوم من"} <span className="font-semibold" style={{ color: selectedPalette.primary }}>YWP</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
