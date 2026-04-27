"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CloudflareVideo from "@/components/CloudflareVideo";

const CF = "https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg";

const PROJECTS = [
  {
    id: "woolly-and-tig",
    type: "CBEEBIES · 5 SEASONS",
    years: "2012–2016",
    title: "Woolly and Tig",
    role: "Composer · Theme & Incidental Music · Mr Tonka (on screen)",
    description: `Woolly and Tig ran for five seasons on CBeebies. I wrote the theme and all the incidental music across the run — and appeared on screen as Mr Tonka, the piano teacher. The only time I ever appeared in front of a camera, and the last.

The series became one of the most-loved shows on CBeebies. Years after original broadcast it remains popular on YouTube, still finding new listeners among the youngest audiences. That kind of longevity — music that outlasts the production, that gets passed down — is something you don't design for. It just happens when the work lands.`,
    awards: [],
    heroImage: `${CF}/1a26219a-1ba0-4091-c629-bbd53031bb00/public`,
    videoId: "cddab6df9e7ff6e201f7cf655c78aa31",
    stills: [],
  },
  {
    id: "tom-gates",
    type: "SKY KIDS · 3 SEASONS + SPECIALS",
    years: "2021–2024",
    title: "The Brilliant World of Tom Gates",
    role: "Composer · All Incidental Music",
    description: `Wild Child Animation's TV adaptation of Liz Pichon's bestselling book series. Three seasons plus specials for Sky Kids. All incidental music across the run.

Tom Gates is a character-led show with a lot of irreverence, energy, and visual invention. The incidental music had to match that register — quick, warm, rhythmically alive. Nothing too solemn. It's the kind of writing that asks you to be inside the character's head rather than commenting from outside.`,
    awards: [
      "BAFTA Scotland 2021 — Best Entertainment",
      "British Animation Awards — Children's Choice",
      "Kidscreen — Best Mixed Media Series",
    ],
    heroImage: `${CF}/8a000136-2098-4cb1-ec93-3897e0444700/public`,
    videoId: "f710de3e1a80ba4ae7ee6e19e4c4282d",
    stills: [],
  },
  {
    id: "hushabye-lullaby",
    type: "CBEEBIES · 30 EPISODES",
    years: "2020–2022",
    title: "Hushabye Lullaby",
    role: "Composer · All Songs (30 Episodes)",
    description: `Thirty episodes, thirty songs. Hushabye Lullaby was created by Sacha Kyle for Mara Kids and broadcast on CBeebies. I wrote all the songs across the full run.

The show reached millions of children. It's one of the most-watched preschool shows on CBeebies, and the songs have been streamed many millions of times on Spotify — numbers that take a moment to absorb when you wrote them sitting at a piano. Included in The Guardian's top 50 most-loved children's TV shows ever. Sold globally.

Writing for the very youngest listeners is different from anything else. The melody has to be immediate. The emotion has to be clear and unguarded. You can't be clever about it. The directness is the point.`,
    awards: [
      "2× RTS Scotland Awards",
      "The Guardian — Top 50 Most-Loved Children's TV Shows",
      "Streamed many millions of times on Spotify",
      "Sold globally; one of CBeebies' most-watched preschool shows",
    ],
    heroImage: `${CF}/22c38050-a24b-4897-1b6b-f3c4c822ec00/public`,
    videoId: "ffe7ea5ce8a996beea2695fb4c1bea67",
    stills: [
      { src: `${CF}/b0d83889-9ec9-4fc3-d9a8-d85d82cfdc00/public`, alt: "Hushabye Lullaby still" },
      { src: `${CF}/860d2f26-7d01-4f61-be12-42721849fe00/public`, alt: "Hushabye Lullaby still" },
      { src: `${CF}/66ad3f25-0fb2-4ed0-a0f7-dff4cd75ae00/public`, alt: "Hushabye Lullaby still" },
    ],
  },
  {
    id: "widdershins",
    type: "ANIMATED SHORT FILM",
    years: "2018",
    title: "Widdershins",
    role: "Composer",
    description: `Written, directed and animated by Simon P. Biggs. Produced by Will Adams and Rory Lowe at Once Were Farmers. Voice cast: Brian Cox, Jam Gray.

A lyrical, hand-crafted short that screened at more than 80 festivals worldwide. The score had to carry a lot of emotional weight in a short time, and sit against Simon's distinctive visual language without overwhelming it. Widdershins is currently streaming on Disney+.`,
    awards: [
      "BAFTA Scotland — Best Animation",
      "Hitchcock Jury Award, Dinard British Film Festival",
      "Best Love Story Award, Animayo",
      "Shanghai International Film Festival",
      "12 international awards · 80+ festival screenings",
      "Currently streaming on Disney+",
    ],
    heroImage: `${CF}/7477d560-d635-4e9d-362a-5c354a113600/public`,
    videoId: "c5ce2bfdec9b9d5b1d6aeea2eea55426",
    stills: [],
  },
  {
    id: "the-burry-man",
    type: "ANIMATED SHORT FILM · SCREEN SCOTLAND",
    years: "2022",
    title: "The Burry Man",
    role: "Composer",
    description: `Written and directed by Simon P. Biggs for Devil May Care Entertainment, funded by Screen Scotland. The Burry Man is an ancient Scottish folk figure — a man covered head to foot in the burrs of the burdock plant, walked through the town of South Queensferry each August. The film takes that strange, real ritual and makes something intimate and mysterious from it.

Premiered at Edinburgh International Film Festival 2022.`,
    awards: [
      "Premiered EIFF 2022",
      "Nominated — McLaren Award for Best British Animation",
      "Funded by Screen Scotland",
    ],
    heroImage: `${CF}/2ee2170d-df98-472a-5269-44236bf7a900/public`,
    videoId: "6f7d5933973d2b18e5737ac14f73fa11",
    stills: [],
  },
];

function ProjectBlock({ project, index }) {
  const isReversed = index % 2 !== 0;
  return (
    <article className={`anim-block ${isReversed ? "anim-block--reversed" : ""}`}>
      <div className="anim-block-left">
        <p className="anim-type">{project.type} · {project.years}</p>
        <h2 className="anim-title">{project.title}</h2>
        <p className="anim-role">{project.role}</p>

        <div className="anim-description">
          {project.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {project.awards.length > 0 && (
          <div className="anim-awards">
            {project.awards.map((award, i) => (
              <div key={i} className="anim-award-item">✦ {award}</div>
            ))}
          </div>
        )}
      </div>

      <div className="anim-block-right">
        <div className="anim-video">
          <CloudflareVideo videoId={project.videoId} />
        </div>
        <div className="anim-hero-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.heroImage} alt={project.title} className="anim-hero-img" />
        </div>
        {project.stills.length > 0 && (
          <div className="anim-stills">
            {project.stills.map((still, i) => (
              <div key={i} className="anim-still">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={still.src} alt={still.alt} className="anim-still-img" />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function AnimationPage() {
  return (
    <>
      <Nav />
      <main className="anim-page">
        <section className="anim-intro">
          <p className="anim-section-label">Animation &amp; Kids&rsquo;</p>
          <div className="anim-intro-body">
            <p>
              Alongside the experimental and cinematic work, a long thread of
              my career has been writing music for animation and children&rsquo;s
              television. From CBeebies favourites still played daily on YouTube
              a decade after broadcast, to multi-award-winning short films
              screened at festivals worldwide, this work has reached millions of
              listeners — often the youngest ones. It asks for a different kind
              of writing: melodic, emotionally direct, character-led. It&rsquo;s some
              of the most rewarding work I do.
            </p>
          </div>
        </section>

        <div className="anim-projects">
          {PROJECTS.map((project, i) => (
            <ProjectBlock key={project.id} project={project} index={i} />
          ))}

          {/* Distance to the Moon cross-link */}
          <article className="anim-crosslink">
            <div className="anim-crosslink-inner">
              <p className="anim-type">SHORT FILM · STOP-MOTION ANIMATION · 2025</p>
              <h2 className="anim-title">Distance to the Moon</h2>
              <p className="anim-crosslink-body">
                The most recent animated work sits at the intersection of this
                thread and the wider experimental practice. Music and image
                built simultaneously, neither serving the other.{" "}
                Athens Animfest Distinction Award, Music Award; Animaze Best Soundtrack.
              </p>
              <Link href="/work/distance-to-the-moon" className="anim-crosslink-link">
                View Distance to the Moon →
              </Link>
            </div>
          </article>
        </div>

        <div className="anim-back">
          <Link href="/">← Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
