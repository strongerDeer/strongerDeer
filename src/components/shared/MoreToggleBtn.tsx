export default function MoreToggleBtn({
  onClick,
  showAll,
  text,
  className,
}: {
  onClick: any;
  showAll: boolean;
  text: string;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={`moreToggleBtn ${className}`}>
      {showAll ? "접기" : text}
    </button>
  );
}
