import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    language: "Python3",
    technique: "Django",
    title: "Task 1",
    description: "Task 1 description",
    user_id: "1",
    difficulty: 1,
    is_done: false,
    limit_at: new Date(),
  },
  {
    id: "2",
    language: "Ruby",
    technique: "Ruby on Rails",
    title: "Task 2",
    description: "Task 2 description",
    user_id: "1",
    difficulty: 2,
    is_done: false,
    limit_at: new Date(),
  },
  {
    id: "3",
    language: "Python3",
    technique: "Django",
    title: "Task 3",
    description: "Task 3 description",
    user_id: "1",
    difficulty: 3,
    is_done: false,
    limit_at: new Date(),
  },
];
