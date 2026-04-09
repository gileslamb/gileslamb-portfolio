import { DreamScreensPromo } from "@/components/DreamScreensPromo";
import { CuriousDreamersPromo } from "@/components/CuriousDreamersPromo";

export function OriginalProjects() {
  return (
    <section className="original-projects" id="original-projects">
      <div className="original-projects-intro">
        <p className="live-eyebrow reveal">Original Projects</p>
      </div>
      <DreamScreensPromo />
      <CuriousDreamersPromo />
      <div className="original-projects-endcap" aria-hidden />
    </section>
  );
}
