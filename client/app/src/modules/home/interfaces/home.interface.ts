export interface SurveyQuestions {
  questions: Array<Question>
}
export interface Question {
  description: string;
  name: string;
  disabled: boolean;
  input?: string;
}
