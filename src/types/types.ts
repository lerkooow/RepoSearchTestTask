export type TReposData = {
  id: number;
  name: string;
  language: string;
  forks: number;
  stargazers_count: number;
  updated_at: string;
  description: string;
  license?: {
    key: string;
    name: string;
  };
};

export type TSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: TReposData[];
};

export type Column = {
  id: keyof TReposData;
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: unknown) => string;
};

export type Order = "asc" | "desc";
