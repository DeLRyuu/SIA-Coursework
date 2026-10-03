interface Props {
  label: string;
  name: string;
  selected: boolean;
  onSelect: () => void;
}

export default function AnswerOption({ label, name, selected, onSelect }: Props) {
  return (
    <label className={selected ? "answer selected" : "answer"}>
      <input type="radio" name={name} checked={selected} onChange={onSelect} />
      {label}
    </label>
  );
}
