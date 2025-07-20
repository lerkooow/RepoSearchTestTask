import { useState, type FormEvent } from "react";

import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";

import s from "./SearchPanel.module.scss";

interface SearchPanelProps {
  setValue: (value: string) => void;
}

export const SearchPanel = ({ setValue }: SearchPanelProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue(searchValue);
  };

  return (
    <div className={s.searchPanel}>
      <form className={s.searchPanel__container} onSubmit={handleSubmit}>
        <OutlinedInput placeholder="Введите поисковый запрос" className={s.searchPanel__input} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <Button type="submit" variant="contained" className={s.searchPanel__button}>
          Искать
        </Button>
      </form>
    </div>
  );
};
