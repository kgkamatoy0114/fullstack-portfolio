import { ArrowDown, Download, Mail } from "lucide-react";

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-black text-white px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-gray-400 mb-4">
          Available for frontend and full-stack work
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Hi, I'm Tal</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Software Engineer building polished React, TypeScript, API-driven, and
          booking-system experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            <ArrowDown className="h-4 w-4" />
            View projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3 rounded-lg font-medium hover:bg-white/10 transition"
          >
            <Mail className="h-4 w-4" />
            Contact me
          </a>
          <a
            href="/KRISTAL_KAMATOY.pdf"
            download
            className="inline-flex items-center justify-center gap-2 text-gray-300 px-5 py-3 rounded-lg hover:text-white transition"
          >
            <Download className="h-4 w-4" />
            CV
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-3xl w-full mt-14">
        {[
          ["3+", "Frameworks"],
          ["8+", "Core skills"],
          ["2", "Featured builds"],
        ].map(([value, label]) => (
          <div key={label} className="border border-white/10 rounded-lg p-4">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
