type MoreToggleBtnProps = {
  onClick: () => void;
  showAll: boolean;
  text: string;
  className?: string;
  controls?: string;
};

const MoreToggleBtn = ({
  onClick,
  showAll,
  text,
  className,
  controls,
}: MoreToggleBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`moreToggleBtn ${className ?? ""}`}
      aria-expanded={showAll}
      aria-controls={controls}
    >
      {showAll ? "접기" : text}
    </button>
  );
};

export default MoreToggleBtn;
