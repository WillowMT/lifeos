"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaptureIcon, MemoryIcon, TodayIcon } from "./icons";

const tabs = [
  { href: "/", label: "Today", icon: TodayIcon },
  { href: "/memories", label: "Memory", icon: MemoryIcon },
  { href: "/capture", label: "Capture", icon: CaptureIcon },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav app-chrome" aria-label="Primary navigation">
      <div className="bottom-nav__items">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`bottom-nav__item ${isActive ? "is-active" : ""}`}
            >
              <span className="bottom-nav__icon">
                <Icon className="size-[23px]" />
              </span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
