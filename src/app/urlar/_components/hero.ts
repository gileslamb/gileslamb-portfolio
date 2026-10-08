/* Ùrlar constants shared by /urlar and /urlar/host: the film clip (used by the
   pages for metadata and the OG image, and by the client player), the cloud
   still, the band still and the premiere details. Kept out of HeroVideo.tsx:
   a 'use client' module's exports arrive on the server as client references,
   not values. */

export const STREAM = 'https://customer-3aa0vwfgpylhsylu.cloudflarestream.com';

/* 90 seconds, three-screen audience view. */
export const HERO_ID = 'ca96b876b35b1a3278d9f15770b6972f';

/* Silent loop in and out points, in seconds: the scan system at full brightness. */
export const LOOP_IN = 50;
export const LOOP_OUT = 80;

/* Poster and OG frame, in seconds. */
export const POSTER_AT = 65;

export const HERO_MANIFEST = `${STREAM}/${HERO_ID}/manifest/video.m3u8`;
export const HERO_POSTER = `${STREAM}/${HERO_ID}/thumbnails/thumbnail.jpg?time=${POSTER_AT}s&height=1080`;
export const HERO_OG = `${STREAM}/${HERO_ID}/thumbnails/thumbnail.jpg?time=${POSTER_AT}s&width=1200&height=630&fit=crop`;

/* Cloud still from the poster (urlar_poster_frames/poster 1 scan .png),
   960x1080, transparent on RGB 0. Drawn with mix-blend-mode: screen, so it has
   no edge against the black. The cloud itself spans x 15% to 85% and y 29% to
   72% of the image; the hero CSS sizes and places it from those fractions. */
export const CLOUD = '/urlar/cloud.png';

/* Image band behind the "played live" line: a still of the playing (studio
   pilot, 2:50). PLAYING_ID is the clip; BAND_AT picks the frame (51s is both
   hands on the keys). BAND_OVERLAY is the near-black wash over the still. */
export const PLAYING_ID = '3913fbedb27eed32fd88c6d87eab3448';
export const BAND_AT = 51;
export const BAND_IMAGE = `${STREAM}/${PLAYING_ID}/thumbnails/thumbnail.jpg?time=${BAND_AT}s&height=1080`;
export const BAND_OVERLAY = 0.7;

export const DESC =
  'Live music in quadraphonic sound. Multi-screen projection. Total immersion.';

/* Eventbrite event for the House of Toad premiere. */
export const EVENTBRITE_URL =
  'https://www.eventbrite.co.uk/e/urlar-giles-lamb-live-at-house-of-toad-tickets-2002672111195';

/* Premiere event details. */
export const EVENT: [string, string, string][] = [
  ['When', 'Friday 4 December 2026', 'Doors 7pm, starts 7.30pm'],
  ['Where', 'House of Toad', 'Park Circus, Glasgow'],
  ['Tickets', '£20', '£15 concessions and House of Toad members, drink on arrival. Booking fee applies.'],
];
