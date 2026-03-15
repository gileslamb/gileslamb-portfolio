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
            The question has always been the same: how does sound shape what we
            see, feel, and understand?
          </p>
          <p>
            A practice built continuously across albums, film scores, trailers,
            animation, live performance. Each form a different angle on the same
            question. Narrative carried as much by texture and space as by
            picture.
          </p>
          <p>
            Distance to the Moon. Dead Island. A dozen albums. Now live
            audiovisual performance with generative visuals. The obsession is the
            same. Only the form changes.
          </p>
        </div>
      </div>

      <div className="lanes reveal reveal-delay-2">
        <div className="lane">
          <span className="lane-num">01</span>
          <div className="lane-content">
            <div className="lane-title">Film &amp; Television</div>
            <p className="lane-desc">
              Trailers, features, TV series, animation, campaigns. Where the
              investigation has played out longest. The score as the hidden
              architecture of narrative.
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
              Spatial sound, exhibition commissions, cultural institutions. Work
              designed for environments and bodies. Spatial composition where the
              room itself is the instrument.
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
              Modular synthesis, generative visuals, live audiovisual
              performance. Sound as the DNA from which image emerges. The
              practice made visible in real time.
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
