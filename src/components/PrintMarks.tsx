"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* Proof-sheet print feel, after catalogue-site's print.js.

   1. printDisplay: big display headings only. Each letter gets a fixed look
      from a seed made of the heading's own text: a few letters soft, a few
      misregistered by 1-2px (a second, offset impression), uneven ink, a
      lighter roller band, sometimes an ink streak through the line. Same on
      every load, never animated. Unlike the catalogue version it walks the
      text nodes, so <br> and inner spans survive.
   2. Marks: a few crop ticks, short rules and faint streaks in the page
      margins at section breaks, seeded from the path (2-3 per page, fewer on
      phone). They live in one overlay this component owns, never over images,
      video, the hero or the nav.

   Body text, nav, buttons and players are never touched. */

function rng(seed: number) {
  // mulberry32
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(s: string) {
  // FNV-1a
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const HEADINGS = "main h1, main h2, h1.hero-name, .article-hero-title";
const SKIP = "nav, button, a, .uh-page, .gig-poster-title, .press-live-title, [data-printed]";

function printDisplay(el: HTMLElement) {
  const text = el.textContent || "";
  if (!text.trim()) return;
  const cs = getComputedStyle(el);
  const size = parseFloat(cs.fontSize);
  if (size < 34 || parseInt(cs.fontWeight) < 700 || !cs.fontFamily.includes("Inter Tight")) return;
  const r = rng(hash(text.toUpperCase().replace(/\s+/g, " ").trim()));
  // the catalogue's values are tuned for 64px+ type; scale soft/offset down for smaller headings
  const k = Math.max(0.4, Math.min(1, size / 96));
  el.setAttribute("aria-label", (el.innerText || text).replace(/\s+/g, " ").trim());

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    for (const ch of node.data) {
      if (/\s/.test(ch)) { frag.appendChild(document.createTextNode(ch)); continue; }
      const sp = document.createElement("span");
      sp.setAttribute("aria-hidden", "true");
      sp.textContent = ch;
      const s: string[] = [];
      const density = r() < 0.35 ? 0.86 + r() * 0.09 : 1; // uneven ink
      if (density < 1) s.push(`opacity:${density.toFixed(2)}`);
      if (r() < 0.16) s.push(`filter:blur(${((0.9 + r() * 0.7) * k).toFixed(2)}px)`); // soft letter
      if (r() < 0.24) {
        // misregistration: offset second impression
        const dx = (r() < 0.5 ? -1 : 1) * (1 + Math.round(r())) * k, dy = (Math.round(r() * 2) - 1) * k;
        s.push(`text-shadow:${dx.toFixed(1)}px ${dy.toFixed(1)}px 0 rgba(10,10,10,.4)`);
      }
      if (r() < 0.12) s.push(`position:relative;top:${r() < 0.5 ? 1 : -1}px`); // letter sat slightly off
      if (s.length) sp.style.cssText = s.join(";");
      frag.appendChild(sp);
    }
    node.parentNode?.replaceChild(frag, node);
  }

  // roller mark: a band where the ink ran thin, plus a little top/bottom density drift
  const y = 22 + r() * 52, band = 1.2 + r() * 2.2;
  const mask =
    `linear-gradient(to bottom, rgba(0,0,0,${(0.93 + r() * 0.07).toFixed(2)}) 0%, #000 18%, #000 ${y.toFixed(1)}%, ` +
    `rgba(0,0,0,.8) ${(y + band * 0.4).toFixed(1)}%, rgba(0,0,0,.92) ${(y + band).toFixed(1)}%, #000 ${(y + band + 2).toFixed(1)}%, ` +
    `rgba(0,0,0,${(0.92 + r() * 0.08).toFixed(2)}) 100%)`;
  el.style.setProperty("-webkit-mask-image", mask);
  el.style.setProperty("mask-image", mask);

  // occasional ink streak through the letters
  if (r() < 0.65) {
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    const st = document.createElement("span");
    st.className = "print-streak";
    st.setAttribute("aria-hidden", "true");
    st.style.top = (15 + r() * 70).toFixed(1) + "%";
    st.style.left = (r() * 45).toFixed(1) + "%";
    st.style.width = (18 + r() * 40).toFixed(1) + "%";
    st.style.height = (r() < 0.5 ? 1 : 2) + "px";
    st.style.opacity = (0.3 + r() * 0.3).toFixed(2);
    st.style.transform = `rotate(${((r() - 0.5) * 0.6).toFixed(2)}deg)`;
    el.appendChild(st);
  }
  el.dataset.printed = "1";
}

type Box = { x0: number; y0: number; x1: number; y1: number };

function placeMarks(layer: HTMLDivElement, path: string) {
  layer.textContent = "";
  const W = document.documentElement.clientWidth;
  const phone = W < 768;
  const sy = window.scrollY;
  const box = (el: Element): Box => {
    const b = el.getBoundingClientRect();
    return { x0: b.left, y0: b.top + sy, x1: b.right, y1: b.bottom + sy };
  };
  // never over pictures, players, the hero or the nav
  const keepOut = [...document.querySelectorAll("img, video, iframe, canvas, .hero, nav, .article-hero, header[class*='hero'], [class*='player'], audio")]
    .map(box).filter((b) => b.y1 > b.y0);
  const docH = document.documentElement.scrollHeight;
  const hero = document.querySelector(".hero, .article-hero, .uh-top");
  const minY = hero ? box(hero).y1 + 40 : 260;

  // section breaks: tops of sections, dividers and the footer
  const ys: number[] = [];
  for (const el of document.querySelectorAll("main section, main hr, main > div, footer, .contact")) {
    const y = Math.round(box(el).y0);
    if (y < minY || y > docH - 60) continue;
    if (ys.some((v) => Math.abs(v - y) < 240)) continue;
    ys.push(y);
  }
  ys.sort((a, b) => a - b);
  const r = rng(hash(path || "/"));
  const want = phone ? 2 : 2 + Math.round(r());
  const free = (b: Box) => !keepOut.some((k) => b.x0 < k.x1 && b.x1 > k.x0 && b.y0 < k.y1 && b.y1 > k.y0);

  const gut = phone ? 6 : Math.min(28, W * 0.02);
  const picked: number[] = [];
  const pool = [...ys];
  while (picked.length < want && pool.length) {
    const y = pool.splice(Math.floor(r() * pool.length), 1)[0];
    picked.push(y);
  }
  for (const y of picked.sort((a, b) => a - b)) {
    const kind = r();
    const add = (cls: string, css: Partial<CSSStyleDeclaration>, b: Box) => {
      if (!free(b)) return;
      const m = document.createElement("i");
      m.className = cls;
      Object.assign(m.style, css);
      layer.appendChild(m);
    };
    if (kind < 0.45) {
      // crop marks: an L at each margin, pointing in at the break
      const s = phone ? 10 : 16;
      const flip = r() < 0.5;
      add("pm-crop", { left: gut + "px", top: y - s - 4 + "px", width: s + "px", height: s + "px", transform: flip ? "scaleY(-1)" : "" }, { x0: gut, y0: y - s - 4, x1: gut + s, y1: y - 4 });
      add("pm-crop", { left: W - gut - s + "px", top: y + 4 + "px", width: s + "px", height: s + "px", transform: flip ? "scale(-1,1)" : "scale(-1,-1)" }, { x0: W - gut - s, y0: y + 4, x1: W - gut, y1: y + 4 + s });
    } else if (kind < 0.75) {
      // a thin rule run out into the margin, as if the trim missed
      const left = r() < 0.5, w = phone ? 26 : 40 + r() * 70;
      const x = left ? 0 : W - w;
      add("pm-rule", { left: x + "px", top: y + "px", width: w + "px" }, { x0: x, y0: y - 2, x1: x + w, y1: y + 2 });
    } else {
      // a faint dragged streak across the break
      const w = W * (phone ? 0.18 : 0.08 + r() * 0.16), x = r() < 0.5 ? gut : W - gut - w;
      add("pm-streak", {
        left: x + "px", top: y + (r() - 0.5) * 30 + "px", width: w + "px",
        height: (r() < 0.6 ? 1 : 2) + "px", opacity: (0.25 + r() * 0.25).toFixed(2),
        transform: `rotate(${((r() - 0.5) * 0.8).toFixed(2)}deg)`,
      }, { x0: x, y0: y - 18, x1: x + w, y1: y + 18 });
    }
  }
}

export function PrintMarks() {
  const layer = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    if (document.querySelector("body.card-mode")) return;
    const run = () => {
      document.querySelectorAll<HTMLElement>(HEADINGS).forEach((el) => {
        if (!el.closest(SKIP)) printDisplay(el);
      });
      if (layer.current) placeMarks(layer.current, path);
    };
    const go = () => (document.fonts ? document.fonts.ready.then(run) : run());
    go();
    // marks follow the layout as images load and the window changes
    let t: ReturnType<typeof setTimeout> | undefined;
    let lastW = window.innerWidth, lastH = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const w = window.innerWidth, h = document.documentElement.scrollHeight;
      if (w === lastW && Math.abs(h - lastH) < 4) return;
      lastW = w; lastH = h;
      clearTimeout(t);
      t = setTimeout(() => layer.current && placeMarks(layer.current, path), 200);
    });
    ro.observe(document.body);
    return () => { ro.disconnect(); clearTimeout(t); };
  }, [path]);

  return <div ref={layer} className="print-marks" aria-hidden="true" />;
}
