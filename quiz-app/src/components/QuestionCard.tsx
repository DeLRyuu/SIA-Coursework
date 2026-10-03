import type { Question } from "../types";
import AnswerOption from "./AnswerOption";

interface Props {
  question: Question;
  number: number;
  selected: number | null;
  isLast: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
}

export default function QuestionCard({ question, number, selected, isLast, onSelect, onNext }: Props) {
  return (
    <section className="card">
      <p className="q-number">Question {number}</p>
      <h3 className="q-text">{question.text}</h3>
      <div className="answers">
        {question.choices.map((choice, i) => (
          <AnswerOption key={choice} label={choice} selected={selected === i} onSelect={() => onSelect(i)} />
        ))}
      </div>
      <button className="btn" disabled={selected === null} onClick={onNext}>
        {isLast ? "Finish quiz" : "Next"}
      </button>
    </section>
  );
}
