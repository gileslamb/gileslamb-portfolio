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
          Film score, music and image, soundtrack supervision. Based in Glasgow, UK.
        </p>
        <div className="contact-portrait reveal reveal-delay-2">
          {/* TODO: replace hero portrait */}
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
          <div className="contact-item-label">
            General &amp; creative enquiries
          </div>
          <a href="mailto:giles@gileslamb.com" className="contact-item-value">
            giles@gileslamb.com
          </a>
        </div>
        <div className="contact-item reveal reveal-delay-1">
          <div className="contact-item-label">
            Licensing &amp; sync enquiries
          </div>
          <a href="mailto:info@gileslamb.com" className="contact-item-value">
            info@gileslamb.com
          </a>
        </div>
        <div className="contact-item reveal reveal-delay-2">
          <div className="contact-item-label">Location</div>
          <span className="contact-item-value" style={{ cursor: "default" }}>
            Glasgow, UK
          </span>
        </div>
      </div>
    </section>
  );
}
