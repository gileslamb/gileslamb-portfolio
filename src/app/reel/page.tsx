import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showreel 2026 · Giles Lamb",
};

export default function ReelPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "grid",
        placeItems: "center",
      }}
    >
      <a
        href="https://www.gileslamb.com"
        style={{
          position: "fixed",
          top: "1.5rem",
          left: "1.75rem",
          fontSize: "0.72rem",
          letterSpacing: "0.06em",
          color: "rgba(212,201,184,0.5)",
          textDecoration: "none",
          fontFamily: "inherit",
          zIndex: 10,
          transition: "color 0.2s ease",
        }}
      >
        ← gileslamb.com
      </a>
      <div
        style={{
          width: "min(100vw, calc(100vh * 16 / 9))",
          aspectRatio: "16 / 9",
        }}
      >
        <iframe
          src="https://customer-3aa0vwfgpylhsylu.cloudflarestream.com/00b4dbad6e415e5edbca3b3c3b507dff/iframe?poster=https%3A%2F%2Fcustomer-3aa0vwfgpylhsylu.cloudflarestream.com%2F00b4dbad6e415e5edbca3b3c3b507dff%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D2s%26height%3D600"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Showreel 2026 · Giles Lamb"
        />
      </div>
    </div>
  );
}
