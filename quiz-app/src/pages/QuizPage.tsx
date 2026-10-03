import { useState } from "react";
import { Navigate } from "react-router-dom";
import { questions } from "../data/questions";
import QuizHeader from "../Components/QuizHeader";
import ProgressBar from "../Components/ProgressBar";
import QuestionCard from "../Components/QuestionCard";

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[current];
  const isLast = current === questions.length - 1;

  const handleNext = () => {
    const isCorrect = selected === question.correctIndex;
    setAnswers([...answers, isCorrect]);
    setScore(isCorrect ? score + 1 : score);
    isLast
      ? setIsFinished(true)
      : (setCurrent(current + 1), setSelected(null));
  };

  return isFinished ? (
    <Navigate to="/result" replace state={{ total: answers.length, correct: score }} />
  ) : (
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
