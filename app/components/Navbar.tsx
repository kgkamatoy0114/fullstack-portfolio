"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/95 text-white text-center p-4 shadow-lg backdrop-blur">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#home" className="text-xl font-bold">
          Tal
        </a>

        <div className="hidden md:flex gap-6">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm hover:text-gray-300">
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col bg-black p-4 gap-4 mt-4 rounded-lg">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
