import type { ReactNode } from "react";
import BrandLogo from "./landing/BrandLogo";

/**
 * Shared shell for the legal pages (Terms, Privacy). Same text and layout as em-frontend's
 * LegalLayout.jsx; keep the two in step.
 */
interface LegalLayoutProps {
  isModal?: boolean;
  title: string;
  updated: string;
  toc?: string[][];
  children: ReactNode;
}

export default function LegalLayout({ isModal, title, updated, toc = [], children }: LegalLayoutProps) {
  const body = (
    <div className={isModal ? "px-2 py-4" : "max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14"}>
      <div className={`border-b border-[#e4e8ef] ${isModal ? "pb-4 mb-6" : "pb-6 mb-10"}`}>
        {!isModal && <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#0052C9] mb-2">Legal</p>}
        {isModal
          ? <h2 className="font-display text-2xl font-bold text-[#111826] mb-1">{title}</h2>
          : <h1 className="font-display text-3xl md:text-4xl font-bold text-[#111826] mb-1">{title}</h1>}
        <p className="text-sm text-[#6b7585]">{updated}</p>
      </div>
      <div className={isModal ? "flex flex-col gap-6" : "grid lg:grid-cols-12 gap-10"}>
        {!isModal && toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-4">
            <nav aria-label="Contents" className="sticky top-6 space-y-1.5 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7585] mb-2">Contents</p>
              {toc.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="block text-[#3b4556] hover:text-[#0052C9]">{label}</a>
              ))}
            </nav>
          </aside>
        )}
        <div className={`${isModal ? "w-full" : "lg:col-span-8"} text-[#3b4556] leading-7 [&_a]:text-[#0052C9] [&_a:hover]:underline`}>{children}</div>
      </div>
    </div>
  );
  if (isModal) return body;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#071B43]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <a href="/" aria-label="Planyt home"><BrandLogo size={24} tone="dark" /></a>
          <span className="flex-1" />
          <a href="/events" className="text-sm font-medium text-white/80 hover:text-white">Events</a>
        </div>
      </header>
      <main className="flex-1">{body}</main>
      <footer className="border-t border-[#e4e8ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6b7585]">
          <span>Questions? <a href="mailto:contact@planyt.in" className="text-[#0052C9] hover:underline">contact@planyt.in</a></span>
          <span className="flex-1" />
          <a href="/terms" className="hover:text-[#111826]">Terms</a>
          <a href="/privacy-policy" className="hover:text-[#111826]">Privacy</a>
          <span>© {new Date().getFullYear()} Planyt</span>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({ id, title, children, last }: { id: string; title: string; children: ReactNode; last?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-6 ${last ? "" : "mb-10"}`}>
      <h2 className="font-display text-lg font-bold text-[#111826] mb-3">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
