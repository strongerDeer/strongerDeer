type MoreToggleBtnProps = {
  onClick: () => void;
  showAll: boolean;
  text: string;
  className?: string;
};

const MoreToggleBtn = ({
  onClick,
  showAll,
  text,
  className,
}: MoreToggleBtnProps) => {
  return (
    <button onClick={onClick} className={`moreToggleBtn ${className ?? ""}`}>
      {showAll ? "접기" : text}
    </button>
  );
};

export default MoreToggleBtn;
