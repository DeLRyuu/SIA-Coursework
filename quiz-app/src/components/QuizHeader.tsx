interface Props {
  current: number;
  total: number;
  score: number;
  onHome: () => void;
}

export default function QuizHeader({ current, total, score, onHome }: Props) {
  return (
    <header className="quiz-header">
      <h2>Frontend Quiz</h2>
      <button type="button" className="nav-link" onClick={onHome}>Home</button>
      <span>Question {current} of {total}</span>
      <span>Score: {score}</span>
    </header>
  );
}
