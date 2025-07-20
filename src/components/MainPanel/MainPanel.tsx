import { useState } from "react";

import { RepositoryPanel } from "../RepositoryPanel";
import { BasicTable } from "../Table";

import { useSearchRepositoriesQuery } from "../../api/githubApi";

import type { TReposData } from "../../types/types";

import s from "./MainPanel.module.scss";

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

  if (isLoading)
    return (
      <div className={s.mainPanel__loading}>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={s.mainPanel__error}>
        <p>Ошибка загрузки</p>
      </div>
    );

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
