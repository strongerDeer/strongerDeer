import { SKILL, SkillType } from "@data/project";

export default function Tab({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: SkillType | "all";
  setActiveFilter: (filter: SkillType | "all") => void;
}) {
  return (
    <div className="projectTab">
      <button
        onClick={() => setActiveFilter("all")}
        className={` ${activeFilter === "all" ? "active" : ""}`}
      >
        All
      </button>
      {SKILL.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveFilter(tag)}
          className={` ${activeFilter === tag ? "active" : ""}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
