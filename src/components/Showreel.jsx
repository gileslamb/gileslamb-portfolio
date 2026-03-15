import CloudflareVideo from "@/components/CloudflareVideo";

export function Showreel() {
  return (
    <section className="showreel-section">
      <div className="showreel-header">
        <span className="showreel-label">SHOWREEL</span>
        <span className="showreel-year">2026</span>
      </div>
      <div className="showreel-video">
        <CloudflareVideo videoId="00b4dbad6e415e5edbca3b3c3b507dff" />
      </div>
    </section>
  );
}
