"use client";

import { useState } from "react";
import Image from "next/image";

export default function ListingGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-black/5 sm:h-[420px]">
        <Image src={images[active]} alt={title} fill className="object-cover" priority />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-28 overflow-hidden rounded-xl border-2 transition-colors ${
                i === active ? "border-[#FF7A00]" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
