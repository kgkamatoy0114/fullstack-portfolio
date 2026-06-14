"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { images: string[]; onClose: () => void };

export default function ModalGallery({ images, onClose }: Props) {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)),
    [images.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, onClose, prev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 max-w-5xl w-full px-6"
      >
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="w-full max-h-[80vh] object-contain"
              alt={`Project screenshot ${index + 1}`}
            />
          </AnimatePresence>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✕
          </button>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
          >
            ›
          </button>
        </div>

        <div className="flex gap-3 mt-4 justify-center">
          {images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={img}
              onClick={() => setIndex(i)}
              className={`h-16 w-24 object-cover rounded-lg cursor-pointer transition ${
                i === index
                  ? "ring-2 ring-white scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
              alt={`Thumbnail ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
