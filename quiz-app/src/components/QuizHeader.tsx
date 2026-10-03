interface Props {
  current: number;
  total: number;
  score: number;
}

export default function QuizHeader({ current, total, score }: Props) {
  return (
    <header className="quiz-header">
      <h2>Frontend Quiz</h2>
      <span>Question {current} of {total}</span>
      <span>Score: {score}</span>
    </header>
  );
}
