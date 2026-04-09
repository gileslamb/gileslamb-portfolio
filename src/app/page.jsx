import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Showreel } from "@/components/Showreel";
import { Practice } from "@/components/Practice";
import { Work } from "@/components/Work";
import { LivePractice } from "@/components/LivePractice";
import { OriginalProjects } from "@/components/OriginalProjects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main>
        <Hero />
        <Showreel />
        <hr className="accent" />
        <Practice />
        <hr className="accent" />
        <Work />
        <hr className="accent" />
        <LivePractice />
        <hr className="accent" />
        <OriginalProjects />
        <hr className="accent" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
