"use client";

import { useLayoutEffect, useEffect } from "react";

function markInViewport(el) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  return (
    r.top < vh + 80 &&
    r.bottom > -80 &&
    r.left < vw + 80 &&
    r.right > -80
  );
}

export function RevealObserver() {
  // Before paint: avoid “blank” first frame where .reveal is opacity:0
  useLayoutEffect(() => {
    document.querySelectorAll(".reveal").forEach((el) => {
      if (markInViewport(el)) el.classList.add("visible");
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
