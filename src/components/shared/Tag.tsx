export default function Tag({ tags }: { tags: string[] }) {
  return (
    <p className="tag">
      {tags.map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </p>
  );
}
