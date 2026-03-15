import Image from "next/image";

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div>
        <p className="section-label reveal">Get in Touch</p>
        <h2 className="contact-headline reveal reveal-delay-1">
          Commission
          <br />
          <em>serious</em>
          <br />
          work
        </h2>
        <p className="contact-sub reveal reveal-delay-2">
          Available for film and television scoring, trailer composition,
          immersive installation, and live audiovisual performance. Based between
          London and Berlin.
        </p>
        <div className="contact-portrait reveal reveal-delay-2">
          <Image
            src="https://imagedelivery.net/GhryEtlvYEhygxHE3JS6Bg/unnamed.jpg/public"
            alt="Giles Lamb"
            width={280}
            height={350}
            className="contact-portrait-img"
          />
        </div>
      </div>
      <div className="contact-details">
        <div className="contact-item reveal">
          <div className="contact-item-label">General &amp; Commissions</div>
          <a
            href="mailto:studio@gileslamb.com"
            className="contact-item-value"
          >
            studio@gileslamb.com
          </a>
        </div>
        <div className="contact-item reveal reveal-delay-1">
          <div className="contact-item-label">Representation &amp; Licensing</div>
          <a
            href="mailto:licensing@gileslamb.com"
            className="contact-item-value"
          >
            licensing@gileslamb.com
          </a>
        </div>
        <div className="contact-item reveal reveal-delay-2">
          <div className="contact-item-label">Location</div>
          <span className="contact-item-value" style={{ cursor: "default" }}>
            London · Berlin
          </span>
        </div>
      </div>
    </section>
  );
}
