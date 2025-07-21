import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TSearchResponse } from "../types/types";

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("accept", "application/vnd.github+json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchRepositories: builder.query<TSearchResponse, string>({
      query: (searchQuery) => `search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=100`,
    }),
  }),
});

export const { useSearchRepositoriesQuery } = githubApi;
