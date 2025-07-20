import { SearchPanel } from "./SearchPanel/SearchPanel";
import { MainPanel } from "./MainPanel/MainPanel";
import { useState } from "react";

export const App = () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <SearchPanel setValue={setValue} />
      <MainPanel searchValue={value} />
    </>
  );
};
