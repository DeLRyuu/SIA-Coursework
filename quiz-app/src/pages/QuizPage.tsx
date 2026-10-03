import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import QuizHeader from "../components/QuizHeader";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import type { ResultState } from "../types";

export default function QuizPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[current];
  const isLast = current === questions.length - 1;

  const handleNext = () => {
    const isCorrect = selected === question.correctIndex;
    const newScore = isCorrect ? score + 1 : score;
    const result: ResultState = { total: questions.length, correct: newScore };

    isLast
      ? navigate("/result", { state: result })
      : (setScore(newScore), setCurrent(current + 1), setSelected(null));
  };

  return (
    <main className="page">
      <QuizHeader current={current + 1} total={questions.length} score={score} />
      <ProgressBar current={current + 1} total={questions.length} />
      <QuestionCard
        question={question}
        number={current + 1}
        selected={selected}
        isLast={isLast}
        onSelect={setSelected}
        onNext={handleNext}
      />
    </main>
  );
}
