import { Code, Database, Wrench } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Code,
    items: [
      { name: "Vue", level: 90 },
      { name: "React", level: 90 },
      { name: "Angular", level: 70 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "JavaScript / jQuery UI", level: 80 },
      { name: "Vite", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: Database,
    items: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "GraphQL", level: 70 },
      { name: "REST API", level: 85 },
      { name: "PHP Laravel", level: 60 },
      { name: "ASP.NET MVC, CodeIgniter", level: 60 },
      { name: "SQL", level: 90 },
    ],
  },
  {
    category: "Tools",
    icon: Wrench,
    items: [
      { name: "Git", level: 85 },
      { name: "Postman", level: 80 },
      { name: "Figma", level: 70 },
    ],
  },
];

export default function Skills() {
  return (
    <section className="bg-white py-24" id="skills">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">Skills</h2>
          <p className="text-gray-500 mt-2">
            Tools and technologies I use to build scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {group.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-700 group-hover:bg-gray-800"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
