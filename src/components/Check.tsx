import { ACHIEVEMENTS } from "@data";
import { BarChart, Code2, Users } from "lucide-react";

export default function Check() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {ACHIEVEMENTS.map((achievement, index) => (
        <div key={index} className="p-6 bg-white rounded-xl">
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
          <ul className="list">
            {achievement.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
