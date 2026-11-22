export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className='flex flex-wrap gap-1.5'>
      {tags.map((tag) => (
        <li
          key={tag}
          className='rounded-lg bg-background-soft px-2 py-0.5 text-[13px] text-foreground-muted'
        >
          #{tag}
        </li>
      ))}
    </ul>
  );
}
