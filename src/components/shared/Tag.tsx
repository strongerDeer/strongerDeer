const Tag = ({ tags }: { tags: string[] }) => {
  return (
    <p className="tag">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-surface-subtle text-ink-soft rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </p>
  );
};

export default Tag;
