import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy — Giles Lamb',
  description: 'How Giles Lamb handles contact enquiries and personal data.',
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="privacy-page">
        <div className="privacy-inner">
          <p className="section-label">Privacy</p>

          <h1 className="privacy-heading">How I handle your data</h1>

          <div className="privacy-body">
            <section>
              <h2>What I collect</h2>
              <p>
                When you use the contact form on this site or a digital card, I collect your name
                (optional) and email address, together with the date and text of your consent.
                I also record where the enquiry came from (e.g. a specific festival or event) so
                I can follow up in context.
              </p>
            </section>

            <section>
              <h2>What I do with it</h2>
              <p>
                Your details are used only to respond to your enquiry. I do not add you to any
                mailing list, newsletter, or automated sequence. There is no CRM sync, no
                third-party marketing platform, and no data sharing with advertisers.
              </p>
            </section>

            <section>
              <h2>Where it is stored</h2>
              <p>
                Enquiry data is stored in a private database operated by Cloudflare
                (Cloudflare D1, hosted in the EU/UK region). It is not publicly accessible.
              </p>
            </section>

            <section>
              <h2>Retention</h2>
              <p>
                I keep enquiry records for as long as they are relevant to an active or potential
                project, and no longer than three years after last contact. You can ask me to
                delete your record at any time.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                You can ask to see, correct, or delete any data I hold about you. Email{' '}
                <a href="mailto:giles@gileslamb.com">giles@gileslamb.com</a> and I will respond
                within 14 days.
              </p>
            </section>

            <section>
              <h2>Cookies and tracking</h2>
              <p>
                This site does not use analytics, tracking pixels, or advertising cookies.
                The only third-party script loaded on contact pages is Cloudflare Turnstile
                (spam prevention), which processes your IP address briefly to verify you are
                human. See{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cloudflare&apos;s privacy policy
                </a>{' '}
                for details.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                Giles Lamb, Glasgow, UK.{' '}
                <a href="mailto:giles@gileslamb.com">giles@gileslamb.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
