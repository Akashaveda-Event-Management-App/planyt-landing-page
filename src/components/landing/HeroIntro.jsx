import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Checker, CK, FakeQr, Ico, TicketCta, useTick } from "./kit";
import { PARTNERS } from "./content";
import { START_FREE, useSignup } from "./signup";
import { brandLogoSrc } from "./BrandLogo";
import { Magnetic, Tilt, WordsIn } from "./motion";

/**
 * First screen of /landing, split: the copy on a light page (left) and a navy panel (right) of five
 * tiles, each a small live moment from an event run on Planyt (live session, check-in, badge, sponsor
 * leads, paper review). On phones three tiles sit in a row under the CTAs.
 * Sits inside the hero's intro layer, which HeroLaptop fades out on scroll into the navy tablet story.
 *
 * A real photo can replace a tile: drop public/images/hero/<key>.webp (docs/brand/hero-photos.md).
 * Without one the tile shows its vignette.
 */
const FACTS = ["Payments settle in your own account", "No app for attendees", "A workspace for every role", "Setup help from our team"];

const NAVY = "#071B43", INK = "#111826", BLUE = "#0052C9", PB = "#1565FF", B1 = "#E4EDFE", B2 = "#CBDDFE";

/** Renders children at a fixed design size, scaled to fit the box (contain, centred). */
const Fit = ({ w, h, children }) => {
  const ref = useRef(null);
  const [k, setK] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setK(Math.min(e.contentRect.width / w, e.contentRect.height / h)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center">
      <div style={{ width: w, height: h, flex: "none", transform: `scale(${k})`, opacity: k ? 1 : 0 }}>{children}</div>
    </div>
  );
};

const Card = ({ className = "", children }) => <div className={`text-left rounded-2xl bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.55)] ${className}`}>{children}</div>;
const Avatar = ({ i, bg = B1, fg = BLUE, s = 28 }) => <span className="rounded-full flex items-center justify-center font-bold flex-none" style={{ width: s, height: s, background: bg, color: fg, fontSize: s * 0.38 }}>{i}</span>;
const Live = () => <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#DC2626]"><span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] pl-float" />LIVE</span>;

// ── tiles (design sizes: big 440×500, tall 220×380, small 220×240) ──
const PollCard = ({ t, className = "" }) => {
  const votes = [46 + (t % 5), 31 - (t % 3), 23 - (t % 2)];
  const sum = votes.reduce((x, y) => x + y, 0);
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between"><p className="text-[13px] font-bold text-[#111826]">Live poll · Hall A</p><Live /></div>
      <p className="mt-1 text-[12px] text-[#4B5464]">Biggest blocker to shipping models?</p>
      {[["Evaluation", votes[0]], ["Latency & cost", votes[1]], ["Data quality", votes[2]]].map(([l, v], i) => (
        <div key={l} className="mt-2.5">
          <div className="flex justify-between text-[12px]"><span className="font-semibold text-[#111826]">{l}</span><span className="tabular-nums text-[#6B7382]">{Math.round((v / sum) * 100)}%</span></div>
          <div className="mt-1 h-2 rounded-full bg-[#F1F3F8] overflow-hidden"><div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${(v / sum) * 100}%`, background: i === 0 ? PB : B2 }} /></div>
        </div>
      ))}
      <div className="mt-3 pt-3 border-t border-[#E3E6ED] flex items-center gap-2 text-[12px] text-[#4B5464]"><Ico n="message-square-text" c={BLUE} s={14} /><span className="tabular-nums font-semibold text-[#111826]">{41 + (t % 6)}</span> questions from the room</div>
    </Card>
  );
};

const Faces = ({ list, ring = "#0E2C67" }) => (
  <span className="flex -space-x-1.5">{list.map(([i, bg, fg]) => <span key={i} className="inline-flex flex-none rounded-full" style={{ boxShadow: `0 0 0 2px ${ring}` }}><Avatar i={i} s={28} bg={bg} fg={fg} /></span>)}</span>
);
const ROOM = [["AK", "#E4EDFE", BLUE], ["MD", "#E6F7F5", "#0F766E"], ["SR", "#F1EBFE", "#6D28D9"], ["PN", "#FDEBF4", "#BE185D"]];

const StageTile = ({ t }) => (
  <div className="h-full p-7 flex flex-col">
    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#A2C3FF]"><Ico n="map-pin" c="#A2C3FF" s={13} />Hall A · Keynote</div>
    <p className="mt-3 font-display font-extrabold text-white text-[30px] leading-[1.1] tracking-[-0.03em]">Scaling AI in production</p>
    <div className="mt-4 flex items-center gap-2.5">
      <Avatar i="RI" bg="#1A3B82" fg="#fff" s={34} />
      <div><p className="text-[13px] font-semibold text-white">Dr. R. Iyer</p><p className="text-[12px] text-[#AFBEDB]">IIT Madras</p></div>
    </div>
    <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/[0.06] border border-white/10 px-3.5 py-3">
      <Faces list={ROOM} />
      <p className="text-[12px] text-[#C9D6EE]"><span className="font-bold text-white tabular-nums">{386 + (t % 7)}</span> in the room · <span className="font-bold text-white tabular-nums">1,204</span> online</p>
    </div>
    <PollCard t={t} className="mt-auto" />
  </div>
);

const CheckinTile = ({ t }) => {
  const people = ["Asha Rao", "M. Das", "S. Khan", "R. Nair"];
  return (
    <div className="h-full p-5 flex flex-col items-center">
      <p className="self-start text-[12px] font-semibold text-[#A2C3FF]">Desk 2 · Scanner</p>
      <div className="relative mt-5 w-[150px] h-[150px] flex items-center justify-center">
        {["top-0 left-0 border-t-4 border-l-4 rounded-tl-xl", "top-0 right-0 border-t-4 border-r-4 rounded-tr-xl", "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl", "bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl"].map((c) => <span key={c} className={`absolute w-7 h-7 border-[#7FA6FF] ${c}`} />)}
        <div className="rounded-xl bg-white p-2.5"><QRCodeSVG value="PLY1.5F3A9C21D04E4B7C8A61E2F09B3D7C44" size={104} level="M" fgColor={INK} /></div>
        <span className="absolute left-3 right-3 top-1/2 h-0.5 bg-[#1565FF] shadow-[0_0_12px_#1565FF]" />
      </div>
      <Card className="mt-auto w-full p-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-none"><Check size={16} className="text-[#16A34A]" strokeWidth={3} /></span>
          <div className="min-w-0"><p className="text-[13px] font-bold text-[#111826]">Access granted</p><p key={t} className="pl-in text-[12px] text-[#6B7382] truncate">{people[t % 4]} · Delegate</p></div>
        </div>
      </Card>
    </div>
  );
};

const BadgeTile = () => (
  <div className="h-full p-5 flex flex-col items-center justify-center">
    <div className="w-3 h-14 rounded-t-sm bg-[#1565FF] -mb-2 relative z-[1]" />
    <div className="w-[164px] rounded-[18px] bg-white overflow-hidden shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)] rotate-[-3deg] origin-top">
      <div className="relative px-4 pt-4 pb-3 bg-[#0052C9]">
        <div className="absolute top-0 right-0"><Checker cols={5} rows={3} size={9} colors={["#1565FF", "#2D74E0"]} corner="tr" /></div>
        <p className="relative text-[10px] font-bold tracking-[0.12em] text-[#CBDDFE]">ICAAI 2026</p>
        <p className="relative text-[11px] text-white/80">Chennai · 12–14 Nov</p>
      </div>
      <div className="px-4 pt-3 pb-4 text-center">
        <p className="font-display font-extrabold text-[20px] leading-tight text-[#111826]">Aisha Khan</p>
        <p className="text-[11px] text-[#6B7382]">IIT Madras</p>
        <span className="mt-2 inline-block rounded-full bg-[#F1EBFE] px-2.5 py-0.5 text-[10px] font-bold text-[#6D28D9]">SPEAKER</span>
        <div className="mt-3 flex justify-center"><QRCodeSVG value="PLY1.A13F0C9E77B24D11B6C0F5E2938AD4C1" size={78} level="M" fgColor={INK} /></div>
      </div>
    </div>
  </div>
);

const SponsorTile = ({ t }) => {
  const bars = [12, 18, 15, 24, 21, 30 + (t % 4)];
  return (
    <div className="h-full p-5 flex flex-col">
      <p className="text-[12px] font-semibold text-[#A2C3FF]">Booth B12 · Sponsor</p>
      <p className="mt-2 font-display font-extrabold text-white text-[34px] leading-none tabular-nums">{128 + (t % 9)}</p>
      <p className="text-[12px] text-[#AFBEDB]">leads scanned today</p>
      <div className="mt-auto flex items-end gap-1.5 h-[64px]">{bars.map((b, i) => <span key={i} className="flex-1 rounded-t-md transition-[height] duration-700" style={{ height: `${(b / 34) * 100}%`, background: i === bars.length - 1 ? PB : "#1A3B82" }} />)}</div>
    </div>
  );
};

const ReviewTile = () => (
  <div className="h-full p-5 flex flex-col">
    <p className="text-[12px] font-semibold text-[#A2C3FF]">Peer review</p>
    <Card className="mt-3 p-3.5 flex-1 flex flex-col">
      <div className="flex items-center justify-between"><p className="text-[12px] font-bold text-[#111826]">Paper #48</p><span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-bold text-[#16A34A]">ACCEPTED</span></div>
      <p className="mt-1 text-[12px] leading-snug text-[#4B5464]">Federated learning at the network edge</p>
      <div className="mt-auto flex items-center justify-between">
        <Faces list={ROOM.slice(0, 3)} ring="#fff" />
        <span className="text-[12px] font-bold text-[#111826] tabular-nums">4.6<span className="font-medium text-[#6B7382]">/5</span></span>
      </div>
    </Card>
  </div>
);

// grid-area on a 6×6 grid: row-start / col-start / row-end / col-end
const TILES = [
  { key: "stage", label: "Keynote", area: "1 / 1 / 5 / 5", size: [440, 500], C: StageTile, bg: "#0E2C67" },
  { key: "checkin", label: "Registration", area: "1 / 5 / 4 / 7", size: [220, 380], C: CheckinTile, bg: "#113B8E" },
  { key: "badges", label: "Talks", area: "4 / 5 / 7 / 7", size: [220, 380], C: BadgeTile, bg: "#0F2860" },
  { key: "networking", label: "Networking", area: "5 / 1 / 7 / 3", size: [220, 240], C: SponsorTile, bg: "#14306E" },
  { key: "poster", label: "Sessions", area: "5 / 3 / 7 / 5", size: [220, 240], C: ReviewTile, bg: "#113B8E" },
];

const Tile = ({ tile, t, style, className = "" }) => {
  const [photo, setPhoto] = useState(null); // null = checking, true = photo, false = vignette
  const img = useRef(null);
  // A server-rendered image can finish loading before React attaches onLoad: read its state on mount.
  useEffect(() => { const el = img.current; if (el?.complete) setPhoto(el.naturalWidth > 0); }, []);
  const { C } = tile;
  return (
    <div aria-hidden="true" className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: tile.bg, ...style }}>
      <div className="absolute top-0 right-0 pointer-events-none"><Checker {...CK.navy} corner="tr" /></div>
      <img ref={img} src={`/images/hero/${tile.key}.webp`} alt="" decoding="async" onLoad={() => setPhoto(true)} onError={() => setPhoto(false)}
        className={`pl-kb absolute inset-0 w-full h-full object-cover ${photo ? "" : "hidden"}`} style={{ animationDelay: `${-(tile.key.length * 3)}s` }} />
      {photo && <span className="absolute left-2.5 bottom-2.5 max-w-[calc(100%-20px)] truncate rounded-lg bg-[#071B43]/80 px-2.5 py-1 text-[11px] font-semibold text-white">{tile.label}</span>}
      {photo === false && <Fit w={tile.size[0]} h={tile.size[1]}><C t={t} /></Fit>}
    </div>
  );
};

/** A sample entry pass floating over the photos: our ticket signature. Generic on purpose, no real event. */
const EntryPass = () => {
  return (
    <div aria-hidden="true" className="pl-fade absolute left-[-56px] bottom-[84px] [@media(max-height:820px)]:bottom-[40px] z-[2] w-[330px] origin-bottom-left [@media(max-height:820px)]:scale-[0.8]" style={{ animationDelay: ".6s" }}>
      <div className="pl-float flex rotate-[-4deg] [filter:drop-shadow(0_24px_30px_rgba(7,27,67,0.45))]">
        <div className="pl-cut-main relative flex-1 min-w-0 rounded-l-[16px] bg-white text-[#0B1530] p-4">
          <div className="flex items-center gap-2">
            <img src={brandLogoSrc("horizontal", "light")} alt="" className="h-4 w-auto" />
            <span className="ml-auto text-[9.5px] font-bold tracking-[0.16em] text-[#0052C9]">ENTRY PASS</span>
          </div>
          <p className="mt-3 text-[9.5px] font-semibold tracking-[0.14em] text-[#6B7690]">DELEGATE · ADMIT ONE</p>
          <p className="font-display font-extrabold text-[20px] leading-tight tracking-[-0.02em]">Your event / conference</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            <div><p className="text-[#6B7690]">Dates</p><p className="font-bold">Your dates</p></div>
            <div><p className="text-[#6B7690]">Venue</p><p className="font-bold">Your venue</p></div>
          </div>
        </div>
        <div aria-hidden="true" className="relative w-0"><span className="absolute left-0 top-3 bottom-3 border-l-2 border-dashed border-[#C9D6EE]" /></div>
        <div className="pl-cut-stub relative w-[96px] flex-none rounded-r-[16px] bg-[#0052C9] text-white p-3 flex flex-col items-center justify-between">
          <p className="text-[9px] font-bold tracking-[0.16em] text-white/85">GATE 2</p>
          <span className="rounded-lg bg-white p-1.5"><FakeQr size={46} ink="#0B1530" /></span>
          <p className="text-[9px] font-semibold text-white/85 tabular-nums">No. 0412</p>
        </div>
      </div>
    </div>
  );
};

export const HeroIntro = () => {
  const signup = useSignup();
  const t = useTick(true, 2200);
  return (
    <div className="relative h-full w-full">
      <div aria-hidden="true" className="absolute top-0 left-0 pointer-events-none -scale-x-100"><Checker {...CK.heroLight} corner="tr" /></div>

      <div className="relative h-full mx-auto max-w-[1200px] lg:px-8 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-12">
      {/* copy */}
      <div className="relative z-[1] h-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left px-6 pt-20 pb-6 lg:pt-16 lg:pb-0 lg:px-0">
        <a href="#contact" className="pl-fade group inline-flex items-center gap-2 h-9 pl-1.5 pr-3.5 rounded-full bg-white border border-[#E3E6ED] text-[13px] font-medium text-[#4B5464] hover:border-[#CBDDFE]">
          <span className="h-6 px-2.5 inline-flex items-center rounded-full bg-[#0052C9] text-white text-xs font-semibold whitespace-nowrap">For organizers</span>
          <span className="hidden sm:inline">Events, conferences and workshops</span><span className="sm:hidden whitespace-nowrap">Events &amp; conferences</span> <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <h1 className="mt-5 lg:mt-6 max-w-[680px] font-display font-extrabold leading-[1.03] tracking-[-0.045em] text-[#111826] [text-wrap:balance]" style={{ fontSize: "clamp(36px,min(4.4vw,7.4vh),64px)", animationDelay: ".08s" }}>
          <WordsIn delay={0.1}>Run your whole event</WordsIn> <WordsIn className="text-[#0052C9]" delay={0.38}>from one place.</WordsIn>
        </h1>
        <p className="pl-fade mt-4 lg:mt-5 max-w-[540px] text-[16px] sm:text-lg leading-relaxed text-[#4B5464] [text-wrap:pretty]" style={{ animationDelay: ".16s" }}>
          Registration, payments, your event website, paper review, check-in, sponsors and certificates. One platform, with a screen for every role.
        </p>
        <div className="pl-fade mt-6 lg:mt-8 flex gap-3 flex-wrap justify-center lg:justify-start" style={{ animationDelay: ".24s" }}>
          <Magnetic>{signup ? <TicketCta to={START_FREE} tone="blue">Start free</TicketCta> : <TicketCta href="#contact" tone="blue">Request access</TicketCta>}</Magnetic>
          <TicketCta href="#how" tone="outline" icon="chevron-down">See how it works</TicketCta>
        </div>
        <ul className="pl-fade hidden lg:[@media(min-height:700px)]:flex mt-7 lg:mt-9 flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2.5 text-[13px] sm:text-sm text-[#4B5464] max-w-[560px]" style={{ animationDelay: ".32s" }}>
          {FACTS.map((f) => <li key={f} className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-[#E4EDFE] flex items-center justify-center"><Check size={11} className="text-[#0052C9]" strokeWidth={3} /></span>{f}</li>)}
        </ul>
        <a href="#partners" className="pl-fade group mt-7 lg:mt-9 flex items-center gap-4 pt-5 border-t border-dashed border-[#DCE3EF] max-w-[560px] w-full justify-center lg:justify-start" style={{ animationDelay: ".4s" }}>
          <span className="text-[11.5px] font-bold tracking-[0.14em] text-[#6B7382] whitespace-nowrap">TRUSTED BY</span>
          <span className="flex items-center gap-5">
            {PARTNERS.filter((p) => !p.light).map((p) => <img key={p.name} src={p.logo} alt={p.name} className="h-8 w-auto max-w-[96px] object-contain transition-transform duration-300 group-hover:scale-105" />)}
          </span>
        </a>

        {/* phones / tablets: three event photos under the copy */}
        <div className="pl-fade lg:hidden flex-none mt-7 w-full max-w-[520px] grid grid-cols-3 gap-2 h-[clamp(120px,24vh,220px)]" style={{ animationDelay: ".4s" }}>
          {[TILES[0], TILES[3], TILES[2]].map((tile) => <Tile key={tile.key} tile={tile} t={t} className="h-full rounded-xl" />)}
        </div>
      </div>

      {/* wide screens: the tile mosaic on a navy panel */}
      <Tilt className="hidden lg:block relative [transform-style:preserve-3d]">
        <div className="pl-fade absolute top-[104px] bottom-10 left-0 right-0 rounded-[28px] p-2.5 grid grid-cols-6 grid-rows-6 gap-2.5 shadow-[0_40px_80px_-40px_rgba(7,27,67,0.55)]" style={{ background: NAVY, animationDelay: ".12s" }}>
          {TILES.map((tile) => <Tile key={tile.key} tile={tile} t={t} style={{ gridArea: tile.area }} />)}
        </div>
        <EntryPass />
      </Tilt>
      </div>
    </div>
  );
};
