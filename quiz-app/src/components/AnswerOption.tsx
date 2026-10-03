interface Props {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function AnswerOption({ label, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={selected ? "answer selected" : "answer"}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}
