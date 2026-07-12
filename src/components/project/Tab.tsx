import { SKILL, SkillType } from "@data/project";

type TabProps = {
  activeFilter: SkillType | "all";
  setActiveFilter: (filter: SkillType | "all") => void;
};

const Tab = ({ activeFilter, setActiveFilter }: TabProps) => {
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
};

export default Tab;
