"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
          <li>
            <Link href="/animation">Animation</Link>
          </li>
          <li>
            <Link href="/immersive">Installation &amp; Museum</Link>
          </li>
          <li>
            <Link href="/releases">Releases</Link>
          </li>
          <li>
            <Link href="/writing">Essays</Link>
          </li>
          <li>
            <Link href="/#contact">Contact</Link>
          </li>
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
          <li>
            <Link href="/animation" onClick={closeMenu}>
              Animation
            </Link>
          </li>
          <li>
            <Link href="/immersive" onClick={closeMenu}>
              Installation &amp; Museum
            </Link>
          </li>
          <li>
            <Link href="/releases" onClick={closeMenu}>
              Releases
            </Link>
          </li>
          <li>
            <Link href="/writing" onClick={closeMenu}>
              Essays
            </Link>
          </li>
          <li>
            <Link href="/#contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
