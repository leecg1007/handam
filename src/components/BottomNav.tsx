"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PenLine, Sparkles, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "홈", href: "/", icon: Home },
    { name: "기록", href: "/diary", icon: PenLine },
    { name: "추천", href: "/prompts", icon: Sparkles },
    { name: "내 정보", href: "/settings", icon: User },
  ];

  if (pathname === "/login") return null;

  return (
    <nav className="fixed bottom-0 w-full max-w-[440px] bg-white/80 backdrop-blur-lg border-t border-[#eee] flex justify-around py-3 pb-safe z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center space-y-1 transition-colors",
              isActive ? "text-[#3182f6]" : "text-[#8b95a1]"
            )}
          >
            <Icon size={24} />
            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
