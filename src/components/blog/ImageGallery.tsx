import { useState } from "react";

interface Props {
  images: { url: string; alt: string }[];
}

export function ImageGallery({ images }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={images[selected].url}
            alt={images[selected].alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
