import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="page home">
      <p className="lead">Welcome to the</p>
      <h1>Frontend Quiz!</h1>
      <p className="desc">Answer {questions.length} multiple-choice questions on HTML, CSS, JavaScript and React.</p>
      <button className="btn" onClick={() => navigate("/quiz")}>Start Quiz</button>
    </main>
  );
}
