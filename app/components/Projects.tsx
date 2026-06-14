"use client";

import { useEffect, useState } from "react";
import ProjectModal from "../modals/ProjectModal";
import { type Project } from "../types/project";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { getProjects } from "../lib/api";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const searchableText = [
      project.title,
      project.role,
      project.status,
      project.description,
      project.stack.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  useEffect(() => {
    let active = true;
    getProjects()
      .then((data) => {
        if (active) { setProjects(data); setError(""); }
      })
      .catch((reason: unknown) => {
        if (active)
          setError(
            reason instanceof Error
              ? reason.message
              : "Unable to load projects from the API."
          );
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section id="projects" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Projects</h2>
            <p className="text-gray-500 mt-2">
              Filter the work by focus area or search the stack
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="h-11 w-full sm:w-64 rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white outline-none focus:border-white/40"
              />
            </div>

            <div className="flex rounded-lg border border-white/10 bg-white/5 p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`h-9 px-3 text-sm rounded-md transition ${
                    activeCategory === cat
                      ? "bg-white text-black"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 rounded-lg border border-white/10 py-10 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading projects from the API
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 py-10 text-red-100">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {!loading &&
            !error &&
            filteredProjects.map((project, i) => (
              <div
                key={i}
                onClick={() => setSelected(project)}
                className="cursor-pointer bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-black px-2 py-1 rounded-full text-white">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-black mt-1">
                  {project.role} • {project.year}
                </p>
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {project.description}
                </p>
                <p className="text-sm text-gray-800 mt-4 font-medium">
                  {project.impact}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.stack.slice(0, 3).map((item, j) => (
                    <span
                      key={j}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  Click to view details
                </p>
              </div>
            ))}
        </div>

        {!loading && !error && filteredProjects.length === 0 && (
          <p className="border border-white/10 rounded-lg py-10 text-center text-gray-400">
            No projects match that filter yet.
          </p>
        )}

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
