import type { TReposData } from "../../types/types";

import s from "./RepositoryPanel.module.scss";

export const RepositoryPanel = ({ selectedRepo }: { selectedRepo: TReposData }) => {
  return (
    <div className={s.repositoryPanel__details}>
      <p className={s.repositoryPanel__name}>{selectedRepo.name}</p>
      {selectedRepo.description && <p className={s.repositoryPanel__description}>{selectedRepo.description}</p>}
      {selectedRepo.license?.name && (
        <div className={s.repositoryPanel__license}>
          <p>{selectedRepo.license.name}</p>
        </div>
      )}
    </div>
  );
};
