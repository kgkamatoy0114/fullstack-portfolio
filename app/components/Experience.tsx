import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";

const experience = [
  {
    title: "Frontend Application Development",
    period: "Recent work",
    points: [
      "Built responsive interfaces with React, Vue, TypeScript, and Tailwind CSS.",
      "Created reusable UI components for forms, dashboards, galleries, and modals.",
    ],
  },
  {
    title: "Booking And Operations Systems",
    period: "Production focus",
    points: [
      "Implemented booking flows with stay extensions, invoices, and API integration.",
      "Improved operational screens for faster record updates and clearer user feedback.",
    ],
  },
  {
    title: "Backend And API Collaboration",
    period: "Full-stack support",
    points: [
      "Connected frontend features to REST and GraphQL services.",
      "Worked with SQL-backed data and tested API behavior with Postman.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-gray-50 py-24 text-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-left">
          <p className="text-sm uppercase tracking-[0.22em] text-gray-500">
            Experience
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 mt-2">
            What I bring into a project
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {experience.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <BriefcaseBusiness className="h-5 w-5 text-gray-700" />
                <span className="text-xs font-medium text-gray-500">
                  {item.period}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-950 mt-5">
                {item.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-6 text-gray-600"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gray-900" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
