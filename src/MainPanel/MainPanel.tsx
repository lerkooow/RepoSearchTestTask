import { useState } from "react";

import { BasicTable } from "../Table/Table";

import type { TReposData } from "../types";

import RepositoryPanel from "../RepositoryPanel/RepositoryPanel";

import s from "./MainPanel.module.scss";
import { useSearchRepositoriesQuery } from "../services/githubApi";

interface MainPanelProps {
  searchValue: string;
}

export const MainPanel = ({ searchValue }: MainPanelProps) => {
  const [selectedRepo, setSelectedRepo] = useState<TReposData | null>(null);

  const {
    data: repos,
    isLoading,
    error,
  } = useSearchRepositoriesQuery(searchValue, {
    skip: !searchValue,
  });

  console.log("🚀 ~ MainPanel ~ repos:", repos?.items);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

  return (
    <div className={s.mainPanel}>
      {repos?.items && repos.items.length > 0 && searchValue ? (
        <div className={s.mainPanel__wrapper}>
          <div className={s.mainPanel__container}>
            <div className={s.mainPanel__table}>
              <h3>Результаты поиска</h3>
              <BasicTable onSelect={setSelectedRepo} repos={repos?.items} searchValue={searchValue} />
            </div>
            <div className={s.mainPanel__repository}>
              {selectedRepo ? (
                <RepositoryPanel selectedRepo={selectedRepo} />
              ) : (
                <div className={s.mainPanel__text}>
                  <p>Выберите репозитарий</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={s.mainPanel__empty}>
          <p>Добро пожаловать</p>
        </div>
      )}
    </div>
  );
};
