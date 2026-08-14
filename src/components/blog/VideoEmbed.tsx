interface Props {
  url: string;
  title?: string;
}

export function VideoEmbed({ url, title = "Video" }: Props) {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden my-6">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  );
}

function getEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    // YouTube
    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtu.be")
    ) {
      const videoId = parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }

    // Vimeo
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

    return null;
  } catch {
    return null;
  }
}
