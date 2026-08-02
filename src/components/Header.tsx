"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/content/nav";
import { siteConfig } from "@/config/site";

/**
 * The one and only site header.
 *
 * The old site's dropdowns were `javascript:void(0)` anchors, which are
 * invisible to keyboard and screen-reader users. These are real <button>
 * toggles with aria-expanded, Escape-to-close, and click-outside dismissal.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Solidify the header background once the page scrolls off the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes any open menu; a click outside closes the dropdowns.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some((c) => pathname.startsWith(c.href));
    }
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-[var(--bg-base)]/95 backdrop-blur-sm border-b border-[var(--bg-elevated)]"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="relative z-10 shrink-0"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src={siteConfig.logoUrl}
            alt={siteConfig.name}
            width={120}
            height={40}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          ref={navRef}
          aria-label="Main"
          className="hidden items-center gap-1 lg:flex"
        >
          {mainNav.map((item) =>
            item.children ? (
              <Dropdown
                key={item.label}
                item={item}
                active={isActive(item)}
                open={openDropdown === item.label}
                onToggle={() =>
                  setOpenDropdown((cur) =>
                    cur === item.label ? null : item.label,
                  )
                }
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-150 hover:text-[var(--accent-lime)] ${
                  isActive(item)
                    ? "text-[var(--accent-lime)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.joinNowUrl}
            className="btn-primary hidden !px-6 !py-3 !text-xs sm:inline-flex"
          >
            Join Now
          </Link>

          <button
            type="button"
            className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? "Close" : "Menu"}</span>
            <div className="flex w-6 flex-col gap-[5px]">
              <span
                className={`h-[2px] w-full bg-white transition-transform duration-200 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-white transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-white transition-transform duration-200 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-[var(--bg-elevated)] bg-[var(--bg-base)] lg:hidden"
        >
          {/* Any link click inside the drawer closes it. Delegating here
              beats reacting to a pathname change, which cascades renders. */}
          <nav
            aria-label="Mobile"
            className="px-5 py-6 sm:px-8"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
            }}
          >
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <MobileGroup item={item} />
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href={siteConfig.joinNowUrl}
              className="btn-primary mt-8 w-full"
            >
              Join Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Dropdown({
  item,
  active,
  open,
  onToggle,
  onClose,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => !open && onToggle()}
      onMouseLeave={onClose}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-150 hover:text-[var(--accent-lime)] ${
          active ? "text-[var(--accent-lime)]" : "text-[var(--text-primary)]"
        }`}
      >
        {item.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`h-[6px] w-[10px] fill-current transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>

      {open && (
        <ul
          id={menuId}
          onClick={onClose}
          className="absolute left-0 top-full min-w-[16rem] border-t-2 border-[var(--accent-lime)] bg-[var(--bg-surface)] py-2 shadow-2xl shadow-black/50"
        >
          {item.children!.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-colors duration-150 hover:bg-[var(--bg-elevated)] hover:text-[var(--accent-lime)]"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileGroup({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)]"
      >
        {item.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`h-[6px] w-[10px] fill-current transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>
      {open && (
        <ul
          id={panelId}
          className="mb-2 space-y-1 border-l-2 border-[var(--accent-lime)] pl-4"
        >
          {item.children!.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
