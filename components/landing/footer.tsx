"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "المنصة",
    links: [
      { label: "المميزات", href: "#features" },
      { label: "الأسعار", href: "#pricing" },
      { label: "القوالب", href: "#" },
      { label: "التكاملات", href: "#" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "#" },
      { label: "المدونة", href: "#" },
      { label: "وظائف", href: "#" },
      { label: "تواصل معنا", href: "#" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { label: "مركز المساعدة", href: "#" },
      { label: "التوثيق", href: "#" },
      { label: "الحالة", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { label: "سياسة الخصوصية", href: "#" },
      { label: "شروط الاستخدام", href: "#" },
      { label: "اتفاقية التاجر", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/ywp-logo.jpg"
                alt="YWP"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-cover"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              أفضل منصة لإنشاء المتاجر الإلكترونية في المملكة العربية السعودية - YWP.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {"جميع الحقوق محفوظة"} &copy; {new Date().getFullYear()} {"YWP"}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              تويتر
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              انستغرام
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              لينكدإن
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
