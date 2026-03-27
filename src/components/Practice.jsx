export function Practice() {
  return (
    <section className="practice" id="practice">
      <div className="practice-left">
        <p className="section-label reveal">Practice</p>
        <h2 className="practice-headline reveal reveal-delay-1">
          The medium shifts.
          <em>The obsession doesn&apos;t.</em>
        </h2>
        <div className="practice-statement reveal reveal-delay-2">
          <p>
            Same question every time: how does sound change what we see and
            feel?
          </p>
          <p>
            Scores, installation, records, live sets. Same thread, different
            rooms. Texture and space often matter as much as the picture.
          </p>
          <p>
            Distance to the Moon, Dead Island, albums, generative live work.
            The obsession stays; the format changes.
          </p>
        </div>
      </div>

      <div className="lanes reveal reveal-delay-2">
        <div className="lane">
          <span className="lane-num">01</span>
          <div className="lane-content">
            <div className="lane-title">Film &amp; Television</div>
            <p className="lane-desc">
              Trailers through to series and campaigns. Longest-running lane for
              me: score as structure under the picture.
            </p>
            <div className="lane-tags">
              <span>Cinematic Trailer</span>
              <span>Film Score</span>
              <span>Animation</span>
              <span>TV Series</span>
              <span>Campaign</span>
            </div>
          </div>
        </div>
        <div className="lane">
          <span className="lane-num">02</span>
          <div className="lane-content">
            <div className="lane-title">Immersive &amp; Installation</div>
            <p className="lane-desc">
              Spatial sound and exhibition work. Built for rooms and bodies, not
              just speakers.
            </p>
            <div className="lane-tags">
              <span>Spatial Sound</span>
              <span>Exhibition</span>
              <span>Generative Systems</span>
              <span>Installation</span>
            </div>
          </div>
        </div>
        <div className="lane">
          <span className="lane-num">03</span>
          <div className="lane-content">
            <div className="lane-title">Live Audiovisual Performance</div>
            <p className="lane-desc">
              Modular, TouchDesigner, live in the room. Image and sound at once,
              neither pretending to lead.
            </p>
            <div className="lane-tags">
              <span>Live AV</span>
              <span>Modular</span>
              <span>Generative Visuals</span>
              <span>TouchDesigner</span>
              <span>Festival</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
