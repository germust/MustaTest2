"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ctaLabels, navigation, type SectionId } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { generalWhatsappUrl } from "@/lib/links";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const SCROLL_THRESHOLD = 8;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

type HeaderProps = {
  /** En páginas internas los enlaces apuntan a la portada ("/#seccion"). */
  basePath?: string;
};

export function Header({ basePath = "" }: HeaderProps) {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((returnFocus = false) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Sección visible para resaltar la navegación (solo en la portada).
  useEffect(() => {
    if (basePath) return;
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [basePath]);

  // Menú móvil: bloqueo de scroll, Escape, foco atrapado y cierre en escritorio.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusables = () =>
      [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])].filter(
        (element): element is HTMLElement => element !== null,
      );

    focusables()[1]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen, closeMenu]);

  const solid = scrolled || menuOpen;
  const homeHref = basePath ? "/" : "#inicio";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        solid ? "border-line bg-white" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[68px] items-center justify-between gap-6 lg:h-[84px]">
        <a href={homeHref} className="shrink-0 rounded-sm" aria-label={`${siteConfig.name}, ir al inicio`}>
          <Logo variant="primary" alt="" className="w-[126px] lg:w-[146px]" preload />
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navigation.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`${basePath}#${item.id}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors duration-200",
                      "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-teal after:transition-transform after:duration-200",
                      active
                        ? "text-navy after:scale-x-100"
                        : "text-muted after:scale-x-0 hover:text-navy hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={generalWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 items-center gap-2 rounded-[10px] bg-teal px-5 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-teal-dark lg:inline-flex"
        >
          <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
          {ctaLabels.meeting}
          <span className="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-[10px] text-navy transition-colors duration-200 hover:bg-surface lg:hidden"
        >
          <span className="sr-only">{menuOpen ? "Cerrar menú" : "Abrir menú"}</span>
          {menuOpen ? <X size={24} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={24} strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </Container>

      <div
        id="menu-movil"
        ref={menuRef}
        hidden={!menuOpen}
        className="fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <Container className="flex min-h-full flex-col pt-4 pb-8">
          <nav aria-label="Navegación principal">
            <ul className="divide-y divide-line">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`${basePath}#${item.id}`}
                    onClick={() => closeMenu()}
                    aria-current={activeSection === item.id ? "location" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 text-xl font-medium",
                      activeSection === item.id ? "text-teal-dark" : "text-navy",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-10">
            <a
              href={generalWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => closeMenu()}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-teal px-6 font-semibold text-white transition-colors duration-200 hover:bg-teal-dark"
            >
              <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
              {ctaLabels.meeting}
              <span className="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
            </a>
            <p className="mt-4 text-center text-small text-muted">
              {siteConfig.contact.whatsapp.display} · {siteConfig.location.short}
            </p>
          </div>
        </Container>
      </div>
    </header>
  );
}
