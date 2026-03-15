const CUSTOMER_ID = "customer-3aa0vwfgpylhsylu";

export default function CloudflareVideo({ videoId }) {
  const posterUrl = `https://${CUSTOMER_ID}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=2s&height=600`;
  const src = `https://${CUSTOMER_ID}.cloudflarestream.com/${videoId}/iframe?poster=${encodeURIComponent(posterUrl)}`;

  return (
    <div className="cloudflare-video-wrap">
      <iframe
        src={src}
        loading="lazy"
        className="cloudflare-video-iframe"
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
    </div>
  );
}
