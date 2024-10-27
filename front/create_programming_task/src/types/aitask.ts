import { Language } from "@/types/language";

export type AiTask = {
    title: string;
    description: string;
    difficulty: 1 | 2 | 3;
    example: string;
    answer: string;
    language: Language;
    technique: string;
};
