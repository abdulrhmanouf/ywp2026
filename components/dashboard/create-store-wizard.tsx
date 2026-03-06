"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Globe,
  Store,
  Palette,
  ChevronLeft,
  Check,
  Loader2,
  ShoppingBag,
  Smartphone,
  Shirt,
  Coffee,
  Gem,
  Book,
  Heart,
  Home,
  Sparkles,
} from "lucide-react";

// Store Categories
const storeCategories = [
  { id: "fashion", label: "أزياء وملابس", icon: Shirt },
  { id: "electronics", label: "إلكترونيات", icon: Smartphone },
  { id: "food", label: "أغذية ومشروبات", icon: Coffee },
  { id: "jewelry", label: "مجوهرات وإكسسوارات", icon: Gem },
  { id: "books", label: "كتب ومنتجات ثقافية", icon: Book },
  { id: "beauty", label: "تجميل وعناية", icon: Heart },
  { id: "home", label: "منزل وديكور", icon: Home },
  { id: "general", label: "متجر عام", icon: ShoppingBag },
];

// Template Options
const templates = [
  {
    id: "modern",
    name: "عصري",
    description: "تصميم حديث ونظيف مناسب لجميع المنتجات",
    preview: "/images/ywp-logo.jpg",
  },
  {
    id: "classic",
    name: "كلاسيكي",
    description: "تصميم أنيق وفخم للمنتجات الراقية",
    preview: "/images/ywp-logo.jpg",
  },
  {
    id: "minimal",
    name: "بسيط",
    description: "تصميم بسيط يركز على المنتجات",
    preview: "/images/ywp-logo.jpg",
  },
];

interface StoreFormData {
  name: string;
  domain: string;
  category: string;
  template: string;
  description: string;
}

interface FormErrors {
  name?: string;
  domain?: string;
  category?: string;
  template?: string;
}

interface CreateStoreWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StoreFormData) => Promise<void>;
}

const steps = [
  { id: 1, title: "معلومات المتجر", description: "الاسم والنطاق" },
  { id: 2, title: "تصنيف المتجر", description: "نوع المنتجات" },
  { id: 3, title: "اختر القالب", description: "تصميم المتجر" },
];

export function CreateStoreWizard({
  isOpen,
  onClose,
  onSubmit,
}: CreateStoreWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<StoreFormData>({
    name: "",
    domain: "",
    category: "",
    template: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [checkingDomain, setCheckingDomain] = useState(false);

  // Validate step
  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: FormErrors = {};

      if (step === 1) {
        if (!formData.name.trim()) {
          newErrors.name = "اسم المتجر مطلوب";
        } else if (formData.name.trim().length < 3) {
          newErrors.name = "اسم المتجر يجب أن يكون 3 أحرف على الأقل";
        }

        if (!formData.domain.trim()) {
          newErrors.domain = "النطاق الفرعي مطلوب";
        } else if (!/^[a-z0-9-]+$/.test(formData.domain)) {
          newErrors.domain =
            "النطاق يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط";
        } else if (formData.domain.length < 3) {
          newErrors.domain = "النطاق يجب أن يكون 3 أحرف على الأقل";
        }
      }

      if (step === 2 && !formData.category) {
        newErrors.category = "يرجى اختيار تصنيف للمتجر";
      }

      if (step === 3 && !formData.template) {
        newErrors.template = "يرجى اختيار قالب للمتجر";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  // Check domain availability (simulated)
  const checkDomainAvailability = useCallback(async (domain: string) => {
    if (domain.length < 3) return;
    setCheckingDomain(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Simulate: domain is available if it doesn't start with "test"
    setDomainAvailable(!domain.startsWith("test"));
    setCheckingDomain(false);
  }, []);

  // Handle domain change with debounce
  const handleDomainChange = (value: string) => {
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setFormData((prev) => ({ ...prev, domain: cleanValue }));
    setDomainAvailable(null);
    if (cleanValue.length >= 3) {
      const timeoutId = setTimeout(
        () => checkDomainAvailability(cleanValue),
        500
      );
      return () => clearTimeout(timeoutId);
    }
  };

  // Navigate between steps
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        name: "",
        domain: "",
        category: "",
        template: "",
        description: "",
      });
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error("Error creating store:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset on close
  const handleClose = () => {
    setFormData({
      name: "",
      domain: "",
      category: "",
      template: "",
      description: "",
    });
    setCurrentStep(1);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    إنشاء متجر جديد
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                          currentStep > step.id
                            ? "bg-primary text-primary-foreground"
                            : currentStep === step.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span
                        className={`hidden text-sm font-medium sm:block ${
                          currentStep >= step.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-4 h-0.5 w-12 rounded-full sm:w-20 ${
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Store Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        اسم المتجر <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Store className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="مثال: متجر الأناقة"
                          className={`w-full rounded-xl border bg-background py-3 pe-4 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.name
                              ? "border-destructive focus:border-destructive"
                              : "border-input focus:border-primary"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        النطاق الفرعي <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={formData.domain}
                          onChange={(e) => handleDomainChange(e.target.value)}
                          placeholder="storename"
                          className={`w-full rounded-xl border bg-background py-3 pe-28 ps-4 pr-11 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.domain
                              ? "border-destructive focus:border-destructive"
                              : domainAvailable === true
                                ? "border-primary focus:border-primary"
                                : domainAvailable === false
                                  ? "border-destructive focus:border-destructive"
                                  : "border-input focus:border-primary"
                          }`}
                          dir="ltr"
                        />
                        <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                          {checkingDomain && (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          )}
                          {!checkingDomain && domainAvailable === true && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                          {!checkingDomain && domainAvailable === false && (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                          <span className="text-sm text-muted-foreground">
                            .ywp.sa
                          </span>
                        </div>
                      </div>
                      {errors.domain && (
                        <p className="mt-1.5 text-sm text-destructive">
                          {errors.domain}
                        </p>
                      )}
                      {!errors.domain && domainAvailable === true && (
                        <p className="mt-1.5 text-sm text-primary">
                          النطاق متاح
                        </p>
                      )}
                      {!errors.domain && domainAvailable === false && (
                        <p className="mt-1.5 text-sm text-destructive">
                          النطاق غير متاح، جرب اسماً آخر
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        وصف المتجر (اختياري)
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="أخبرنا عن متجرك ومنتجاتك..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-input bg-background p-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Category */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-4 text-sm text-muted-foreground">
                      اختر التصنيف الذي يناسب منتجاتك
                    </p>
                    {errors.category && (
                      <p className="mb-3 text-sm text-destructive">
                        {errors.category}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {storeCategories.map((category) => {
                        const isSelected = formData.category === category.id;
                        return (
                          <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                category: category.id,
                              }))
                            }
                            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            }`}
                          >
                            <category.icon
                              className={`h-6 w-6 ${isSelected ? "text-primary" : ""}`}
                            />
                            <span className="text-center text-xs font-medium">
                              {category.label}
                            </span>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                              >
                                <Check className="h-3 w-3 text-primary-foreground" />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Template */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-4 text-sm text-muted-foreground">
                      اختر القالب المناسب لمتجرك
                    </p>
                    {errors.template && (
                      <p className="mb-3 text-sm text-destructive">
                        {errors.template}
                      </p>
                    )}
                    <div className="grid gap-4 sm:grid-cols-3">
                      {templates.map((template) => {
                        const isSelected = formData.template === template.id;
                        return (
                          <motion.button
                            key={template.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                template: template.id,
                              }))
                            }
                            className={`relative overflow-hidden rounded-xl border text-right transition-all ${
                              isSelected
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="relative h-28 w-full bg-gradient-to-br from-primary/10 to-primary/5">
                              <Image
                                src={template.preview}
                                alt={template.name}
                                fill
                                className="object-cover opacity-50"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Palette
                                  className={`h-8 w-8 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                                />
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                                >
                                  <Check className="h-4 w-4 text-primary-foreground" />
                                </motion.div>
                              )}
                            </div>
                            <div className="p-3">
                              <h4
                                className={`font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}
                              >
                                {template.name}
                              </h4>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {template.description}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              {currentStep > 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  السابق
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  إلغاء
                </motion.button>
              )}

              {currentStep < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90"
                >
                  التالي
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      إنشاء المتجر
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
