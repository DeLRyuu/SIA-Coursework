export interface Question {
  id: number;
  text: string;
  choices: string[];
  correctIndex: number;
}

export interface ResultState {
  total: number;
  correct: number;
}
