/* Hero clip constants, shared by the page (metadata, OG image) and the client
   player. Kept out of HeroVideo.tsx: a 'use client' module's exports arrive on
   the server as client references, not values. */

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
