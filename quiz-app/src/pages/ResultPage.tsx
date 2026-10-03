import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import type { ResultState } from "../types";

export default function ResultPage() {
  const navigate = useNavigate();
  const result = useLocation().state as ResultState | null;

  return result ? (
    <main className="page">
      <ResultCard
        total={result.total}
        correct={result.correct}
        onRetake={() => navigate("/quiz")}
        onHome={() => navigate("/")}
      />
    </main>
  ) : (
    <Navigate to="/" replace />
  );
}
