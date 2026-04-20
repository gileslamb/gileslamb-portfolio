# Site Outline

## 1) Site Purpose

- Present Giles Lamb as a cinematic composer and immersive audiovisual artist.
- Showcase selected work with strong visual storytelling and clear calls to action.
- Support professional outreach, commissions, and collaboration inquiries.

## 2) Audience

- Directors, producers, and creative studios.
- Curators, galleries, and immersive exhibition partners.
- Festival programmers and arts organizations.
- Potential collaborators and press.

## 3) Primary User Goals

- Quickly understand artistic identity and offer.
- Watch featured reel content.
- Explore project categories and case studies.
- Contact Giles for commissions or collaboration.

## 4) Information Architecture

- Single-page experience with section anchors.
- Top navigation for rapid movement between sections.
- Narrative flow from identity -> proof of work -> depth -> contact.

## 5) Global Elements

### Navigation (`Nav`)

- Sticky/top navigation.
- Anchor links to primary sections.
- Smooth scroll behavior.

### Reveal Behavior (`RevealObserver`)

- Progressive reveal animations as users scroll.
- Supports narrative pacing and readability.

### Footer (`Footer`)

- Closing identity and utility links.
- Final reinforcement of contact path.

## 6) Page Structure (Top to Bottom)

### 6.1 Hero (`Hero`)

- First-screen visual identity and brand positioning.
- High-impact headline and artistic framing.
- Immediate signal of cinematic/immersive focus.

### 6.2 Showreel (`Showreel`)

- Primary reel/video feature near the top of page.
- Fast proof of quality and style.
- Bridge from identity to substantive work.

### 6.3 Practice (`Practice`)

- Defines creative practice and approach.
- Communicates process, medium, and artistic principles.
- Helps non-technical stakeholders understand methodology.

### 6.4 Work (`Work`)

- Core portfolio section for selected projects.
- Includes deeper feature content through supporting modules:
  - `ImmersiveCaseStudy`
  - `DreamScreensPromo`
  - `CuriousDreamersPromo`
  - `MuseumReelContent`
- Demonstrates range across formats and contexts.

### 6.5 Live Practice (`LivePractice`)

- Highlights performance-based or live/real-time work.
- Distinguishes studio output from live practice.
- Supports credibility for events and installations.

### 6.6 Original Projects (`OriginalProjects`)

- Dedicated space for authored concepts and independent works.
- Shows initiative, experimentation, and artistic leadership.

### 6.7 Contact (`Contact`)

- Clear invitation to connect.
- Supports commissions, collaborations, and inquiries.
- End-of-page conversion point.

## 7) Supporting Components and Utilities

- `CloudflareVideo`: video delivery/performance wrapper.
- `CustomCursor`: branded interaction layer.

## 8) Content Strategy by Section

### Hero

- One strong positioning statement.
- One supporting line clarifying disciplines and contexts.

### Showreel

- Keep runtime concise; lead with strongest 10-20 seconds.
- Provide minimal framing copy focused on outcomes/feeling.

### Practice

- Explain "how" and "why" in plain language.
- Use short paragraphs and high scanability.

### Work

- Curate only strongest projects.
- For each piece: role, context, contribution, and result.

### Live Practice

- Emphasize liveness, audience context, and technical/artistic setup.

### Original Projects

- Explain concept, intent, and development status.

### Contact

- Keep CTA direct and low-friction.
- Include preferred channels and response expectations.

## 9) SEO and Discoverability Outline

- Title: "Giles Lamb | Cinematic Composer and Immersive Audiovisual Artist".
- Meta description focused on composition, immersive work, and commissions.
- Section headings should contain plain-language service keywords.
- Add descriptive alt text for all key imagery.

## 10) Accessibility Outline

- Ensure heading hierarchy is logical (`h1` -> `h2` -> `h3`).
- Provide text alternatives/transcripts for video content where possible.
- Preserve sufficient contrast for all text and interactive elements.
- Confirm keyboard navigation and visible focus states.

## 11) Performance Outline

- Optimize hero and portrait images.
- Lazy-load non-critical media where appropriate.
- Keep above-the-fold render path minimal.
- Verify smooth playback and fallback behavior for embedded video.

## 12) Measurement Outline

- Track clicks on primary contact CTA.
- Track video play starts/completions.
- Track section engagement depth (scroll milestones).
- Track outbound link clicks (if present).

## 13) Maintenance Checklist

- Quarterly refresh of featured reel and project ordering.
- Keep project statuses and credits current.
- Revalidate contact details and response copy.
- Audit broken links and media embeds.

