import type { Column } from "../types/types";

export const columns: Column[] = [
  { id: "name", label: "Название", minWidth: 200 },
  { id: "language", label: "Язык", minWidth: 182 },
  { id: "forks", label: "Число форков", minWidth: 182 },
  { id: "stargazers_count", label: "Число звезд", minWidth: 182 },
  {
    id: "updated_at",
    label: "Дата обновления",
    minWidth: 182,
    format: (value: unknown) => {
      const date = new Date(String(value));
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
];
