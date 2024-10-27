import { Language } from "@/types/language";

export type Task = {
  id: string;
  language: Language;
  technique: string;
  title: string;
  description: string;
  user_id: string;
  difficulty: 1 | 2 | 3;
  is_done: boolean;
  limit_at: Date;
  example: string;
  answer: string;
};
