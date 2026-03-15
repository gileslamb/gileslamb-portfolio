"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };

    const tick = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(tick);
    };

    const handleMouseEnter = () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      ring.style.width = "54px";
      ring.style.height = "54px";
    };

    const handleMouseLeave = () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    };

    document.addEventListener("mousemove", handleMouseMove);
    tick();

    const setupInteractiveEls = () => {
      document.querySelectorAll("a,.lane,.project-card,.project-featured").forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };
    const id = setTimeout(setupInteractiveEls, 100);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  );
}
