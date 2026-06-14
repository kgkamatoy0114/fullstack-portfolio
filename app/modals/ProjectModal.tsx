"use client";

import { useState } from "react";
import { type Project } from "../types/project";
import { ExternalLink, GitFork, Images, X } from "lucide-react";
import ModalGallery from "./ModalGallery";

type Props = { project: Project | null; onClose: () => void };

export default function ProjectModal({ project, onClose }: Props) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-black">{project.title}</h3>
            <p className="text-sm text-gray-500">
              {project.role} • {project.status} • {project.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-black"
            aria-label="Close project details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-gray-700 mt-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((item, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-gray-50 p-4 text-left">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Impact</p>
          <p className="text-sm text-gray-700 mt-2">{project.impact}</p>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            onClick={() => setGalleryOpen(true)}
          >
            <Images className="h-4 w-4" />
            Photo Gallery
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-black"
            >
              <GitFork className="h-4 w-4" />
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-black"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {galleryOpen && (
        <ModalGallery
          images={project.images}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
}
