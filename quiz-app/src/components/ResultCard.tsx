interface Props {
  total: number;
  correct: number;
  onRetake: () => void;
  onHome: () => void;
}

export default function ResultCard({ total, correct, onRetake, onHome }: Props) {
  const percentage = Math.round((correct / total) * 100);
  const message = percentage >= 80 ? "Great work!" : percentage >= 50 ? "Good effort. Try again to improve." : "Keep practicing and retake the quiz.";

  return (
    <section className="card">
      <p className="q-number">Quiz Completed</p>
      <h2>Your score:</h2>
      <div className="score">{correct} / {total}</div>
      <ul className="stats">
        <li><span>Total questions</span><strong>{total}</strong></li>
        <li><span>Correct answers</span><strong>{correct}</strong></li>
        <li><span>Incorrect answers</span><strong>{total - correct}</strong></li>
        <li><span>Final score</span><strong>{correct} / {total}</strong></li>
        <li><span>Percentage</span><strong>{percentage}%</strong></li>
      </ul>
      <p>{message}</p>
      <div className="actions">
        <button className="btn" onClick={onRetake}>Retake quiz</button>
        <button className="btn ghost" onClick={onHome}>Return home</button>
      </div>
    </section>
  );
}
