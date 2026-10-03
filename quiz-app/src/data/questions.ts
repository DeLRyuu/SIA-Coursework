import type { Question } from "../types";

export const questions: Question[] = [
  { id: 1, text: "When did JavaScript first appear?", choices: ["1998", "1997", "1995", "1999"], correctIndex: 2 },
  { id: 2, text: "Which hook stores state in a function component?", choices: ["useEffect", "useState", "useRef", "useMemo"], correctIndex: 1 },
  { id: 3, text: "What does CSS stand for?", choices: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], correctIndex: 2 },
  { id: 4, text: "Which HTML tag creates a hyperlink?", choices: ["<link>", "<a>", "<href>", "<url>"], correctIndex: 1 },
  { id: 5, text: "Which CSS property changes text color?", choices: ["font-color", "text-style", "color", "foreground"], correctIndex: 2 },
  { id: 6, text: "What does JSX stand for?", choices: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extra"], correctIndex: 0 },
  { id: 7, text: "Which keyword declares a block-scoped constant?", choices: ["var", "let", "const", "static"], correctIndex: 2 },
  { id: 8, text: "Which layout system arranges items in rows and columns?", choices: ["Grid", "Float", "Table-cell", "Inline"], correctIndex: 0 },
  { id: 9, text: "What do React props do?", choices: ["Store local state", "Pass data to child components", "Style components", "Fetch data"], correctIndex: 1 },
  { id: 10, text: "Which package provides routing for React apps?", choices: ["react-router-dom", "react-dom", "redux", "axios"], correctIndex: 0 },
];
