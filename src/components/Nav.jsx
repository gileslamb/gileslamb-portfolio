"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/* Catalogue goes live 16 Oct 2026: flip to true to show it in the nav. */
const SHOW_CATALOGUE = false;

const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/live", label: "Live" },
  { href: "/reels", label: "Listen" },
  { href: "/releases", label: "Releases" },
  ...(SHOW_CATALOGUE
    ? [{ href: "https://catalogue.gileslamb.com", label: "Catalogue", external: true }]
    : []),
  { href: "/writing", label: "Essays" },
  { href: "/#contact", label: "Contact" },
];

function NavItem({ item, onClick }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">
          Giles Lamb
        </Link>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavItem item={item} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`nav-overlay ${menuOpen ? "nav-overlay-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-overlay-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavItem item={item} onClick={closeMenu} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
