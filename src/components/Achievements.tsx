import { BarChart, Code2, Users } from "lucide-react";
import { ACHIEVEMENTS } from "@data";

export default function Achievements() {
  return (
    <section className="wrap">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
          주요 성과
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((achievement, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4 text-blue-600">
                {achievement.icon === "BarChart" ? (
                  <BarChart />
                ) : achievement.icon === "Code2" ? (
                  <Code2 />
                ) : (
                  <Users />
                )}
                <h3 className="text-xl font-bold ml-2">{achievement.title}</h3>
              </div>
              <ul className="space-y-3">
                {achievement.items.map((item, idx) => (
                  <li key={idx} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
