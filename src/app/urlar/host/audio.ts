/* Shared by the floating toggle and the inline excerpt player. Same track and
   the same logic as the barn gig page (src/app/urlar/UrlarClient.tsx): one
   looped R2 file, started on a click so it never trips autoplay policy.

   Both players keep their own <audio>, so this is the referee: starting one
   broadcasts a claim and every other player pauses itself. */

export const TRACK_URL =
  'https://pub-62329d1c692e4122ba80031b097b5d1b.r2.dev/resonant-beings/internal-logic-middle.m4a';

const EVENT = 'uh-audio-claim';

export function claimAudio(id: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

/* Calls `stop` whenever a different player claims playback.
   Returns an unsubscribe, so it drops straight into useEffect. */
export function onAudioClaim(id: string, stop: () => void) {
  const handler = (e: Event) => {
    if ((e as CustomEvent<string>).detail !== id) stop();
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
