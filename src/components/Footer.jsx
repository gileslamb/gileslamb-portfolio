export function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <span className="footer-name">Giles Lamb</span>
        <span className="footer-copy">&copy; 2026 &middot; All works reserved</span>
      </div>
      <div className="footer-right">
        <a href="mailto:giles@gileslamb.com" className="footer-email">
          giles@gileslamb.com
        </a>
        {/* Socials — uncomment and fill in handles when available:
        <a href="https://gileslamb.bandcamp.com" className="footer-social" target="_blank" rel="noopener">Bandcamp</a>
        <a href="https://instagram.com/[handle]" className="footer-social" target="_blank" rel="noopener">Instagram</a>
        <a href="https://youtube.com/@[handle]" className="footer-social" target="_blank" rel="noopener">YouTube</a>
        <a href="https://linkedin.com/in/[handle]" className="footer-social" target="_blank" rel="noopener">LinkedIn</a>
        */}
      </div>
    </footer>
  );
}
