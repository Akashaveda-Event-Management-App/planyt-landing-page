import React, { useEffect, useState } from "react";
import { Link } from "./link";
import {
  Archive, ArrowRight, LayoutTemplate, MousePointerClick, Award, BadgeCheck, BarChart3, BedDouble, Bell, Building2, CalendarCheck, CalendarClock, CalendarDays,
  Check, ChevronDown, ChevronRight, CircleCheck, ClipboardList, Clock, CreditCard, Crown, FileCheck, FileText,
  FolderOpen, Globe, Home, Image, ListChecks, Mail, MapPin, Megaphone, MessageCircle, MessageSquare, MessageSquareText,
  MessagesSquare, MonitorPlay, QrCode, RefreshCcw, ScanLine, Search, Settings, Shield, SlidersHorizontal, Star,
  Lock, Store, Ticket, Trophy, UserCheck, UserPlus, Users, UsersRound,
} from "lucide-react";

/** Shared bits for the /landing page: icons by name, the pixel checker corner and the dither edge. */

const ICONS = {
  archive: Archive, lock: Lock, "layout-template": LayoutTemplate, "mouse-pointer-click": MousePointerClick, "arrow-right": ArrowRight, award: Award, "badge-check": BadgeCheck, "bar-chart-3": BarChart3, "bed-double": BedDouble,
  bell: Bell, "building-2": Building2, "calendar-check": CalendarCheck, "calendar-clock": CalendarClock,
  "calendar-days": CalendarDays, check: Check, "chevron-down": ChevronDown, "chevron-right": ChevronRight,
  "circle-check": CircleCheck, "clipboard-list": ClipboardList, clock: Clock, "credit-card": CreditCard, crown: Crown,
  "file-check": FileCheck, "file-text": FileText, "folder-open": FolderOpen, home: Home, image: Image,
  "list-checks": ListChecks, mail: Mail, "map-pin": MapPin, megaphone: Megaphone, "message-circle": MessageCircle,
  "message-square": MessageSquare, "message-square-text": MessageSquareText, "messages-square": MessagesSquare,
  "monitor-play": MonitorPlay, "qr-code": QrCode, "refresh-ccw": RefreshCcw, "scan-line": ScanLine, search: Search,
  globe: Globe, settings: Settings, shield: Shield, "sliders-horizontal": SlidersHorizontal, star: Star, store: Store, ticket: Ticket,
  trophy: Trophy, "user-check": UserCheck, "user-plus": UserPlus, users: Users, "users-round": UsersRound,
};

export const Ico = ({ n, c = "currentColor", s = 16, style }) => {
  const C = ICONS[n] || Check;
  return <C size={s} color={c} strokeWidth={2.2} style={{ flex: "none", ...style }} aria-hidden="true" />;
};

export const DISP = "'Plus Jakarta Sans',sans-serif";
export const EASE = "cubic-bezier(.2,.8,.2,1)";

/** Fading pixel checkerboard anchored to one corner (the logo's stem, as a card mark). */
export const Checker = React.memo(({ cols = 7, rows = 6, size = 12, colors, corner = "tr", reach = 0.8 }) => {
  const cells = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const dx = corner.includes("r") ? cols - 1 - x : x;
    const dy = corner.includes("t") ? y : rows - 1 - y;
    const d = (dx + dy) / (cols + rows - 2);
    const on = ((dx + dy) % 2 === 0 && d < reach) || d < 0.12 || ((dx * 7 + dy * 3) % 5 === 0 && d < reach * 0.7);
    cells.push(
      <span key={`${x}-${y}`} style={{ width: size, height: size, opacity: on ? Math.max(0, 1 - d / reach) : 0 }}>
        {on && <span className="pl-pix" style={{ display: "block", width: "100%", height: "100%", background: colors[(dx + dy * 2) % colors.length], animationDelay: `${(d * 2.6).toFixed(2)}s` }} />}
      </span>,
    );
  }
  return <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${size}px)` }}>{cells}</div>;
});

export const CK = {
  hero: { cols: 10, rows: 7, size: 34, colors: ["#14306E", "#0F2860", "#1A3B82"], reach: 0.85 },
  heroLight: { cols: 10, rows: 7, size: 34, colors: ["#DCE7FD", "#E6EEFD", "#CFDDF9"], reach: 0.85 },
  navy: { colors: ["#2B4A8C", "#22407C", "#335399"] },
  blue: { colors: ["#C9DAFB", "#DCE7FD", "#B8CEF8"] },
  blueStrong: { size: 13, colors: ["#9FBDF5", "#C9DAFB", "#7FA6EE"], reach: 0.85 },
  gray: { colors: ["#D9DEE8", "#E6E9F0", "#CBD2DE"] },
  cta: { cols: 9, rows: 6, size: 22, colors: ["#C9DAFB", "#B8CEF8", "#DCE7FD"], reach: 0.9 },
};

/** Navy pixels dissolving into the page: the edge under the dark features section. */
export const Dither = ({ cols = 110, rows = 4, size = 18, color = "#071B43" }) => {
  const prob = (i) => Math.pow(1 - Math.floor(i / cols) / rows, 1.8) * 0.95;
  const make = () => Array.from({ length: cols * rows }, (_, i) => Math.random() < prob(i));
  // Starts empty so server and client render the same; randomised after mount.
  const [on, setOn] = useState(() => Array(cols * rows).fill(false));
  useEffect(() => {
    setOn(make());
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setOn((s) => {
      const n = s.slice();
      for (let k = 0; k < 10; k++) { const i = Math.floor(Math.random() * n.length); n[i] = Math.random() < prob(i); }
      return n;
    }), 450);
    return () => clearInterval(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${size}px)`, flex: "none" }}>
      {on.map((v, i) => <span key={i} style={{ width: size, height: size, background: color, opacity: v ? 1 : 0, transition: "opacity .9s ease" }} />)}
    </div>
  );
};

/** A counter that ticks once a second while `active`. Drives the live mini-UIs. */
export const useTick = (active = true, ms = 1000) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const i = setInterval(() => setT((x) => x + 1), ms);
    return () => clearInterval(i);
  }, [active, ms]);
  return t;
};

/** Placeholder-free fake QR (finder squares + pattern). */
export const FakeQr = ({ size, n = 11, ink = "#111826" }) => {
  const cells = [];
  for (let i = 0; i < n * n; i++) {
    const x = i % n, y = Math.floor(i / n), e = n - 1;
    const fin = (x < 3 && y < 3) || (x > e - 3 && y < 3) || (x < 3 && y > e - 3);
    const v = fin ? !((x === 1 || x === e - 1) && y === 1) && !(x === 1 && y === e - 1) : (x * 7 + y * 13 + x * y) % 3 === 0;
    cells.push(<span key={i} style={{ background: v ? ink : "transparent" }} />);
  }
  return <div aria-hidden="true" style={{ width: size, height: size, display: "grid", gridTemplateColumns: `repeat(${n},1fr)`, gridTemplateRows: `repeat(${n},1fr)` }}>{cells}</div>;
};

/**
 * Ticket-shaped call to action: notches punched on both sides (CSS mask, .pl-ticket in index.css)
 * a dashed tear line before the arrow stub, and the signature checker in the stub's corner. `to` renders a router Link, `href` an anchor,
 * neither a button. Tones: light (white on navy), blue (brand), ghost (outline on navy),
 * outline (outline on light).
 */
const TONE = {
  light: "bg-white text-[#071B43] hover:bg-[#E9F0FF] [--tear:rgba(7,27,67,.25)]",
  blue: "bg-[#0052C9] text-white hover:bg-[#003E99] [--tear:rgba(255,255,255,.45)]",
  ghost: "bg-white/[0.08] text-white hover:bg-white/[0.14] [--tear:rgba(255,255,255,.35)]",
  outline: "bg-[#E6EEFD] text-[#0B1530] hover:bg-[#DCE7FD] [--tear:rgba(0,82,201,.35)]",
};
// Signature checker in the stub's top-right corner, in the button's own palette.
const TONE_CK = {
  light: ["#C9DAFB", "#DCE7FD", "#B8CEF8"],
  blue: ["#2D74E0", "#1A66DB", "#4A88E8"],
  ghost: ["rgba(255,255,255,.16)", "rgba(255,255,255,.1)", "rgba(255,255,255,.22)"],
  outline: ["#C9DAFB", "#B8CEF8", "#F1F5FE"],
};
export const TicketCta = ({ to, href, tone = "blue", size = "md", icon = "arrow-right", className = "", children, ...rest }) => {
  const h = size === "sm" ? "h-11 text-sm" : "h-12 text-[15px]";
  const cls = `pl-ticket group inline-flex items-stretch overflow-hidden ${h} rounded-xl font-semibold transition-colors ${TONE[tone]} ${className}`;
  const inner = (
    <>
      <span className={`flex items-center ${size === "sm" ? "pl-5 pr-3.5" : "pl-6 pr-4"}`}>{children}</span>
      <span className="pl-ticket-stub relative flex items-center px-3.5">
        <span aria-hidden="true" className="absolute -top-[7px] right-0 pointer-events-none"><Checker cols={4} rows={4} size={7} colors={TONE_CK[tone]} corner="tr" reach={0.95} /></span>
        <Ico n={icon} s={16} style={{ position: "relative", transition: "transform .25s" }} />
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type={rest.onClick ? "button" : "submit"} className={cls} {...rest}>{inner}</button>;
};
