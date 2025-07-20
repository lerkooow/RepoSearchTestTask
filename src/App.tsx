import { useState } from "react";

import { SearchPanel } from "./components/SearchPanel/SearchPanel";
import { MainPanel } from "./components/MainPanel/MainPanel";

export const App = () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <SearchPanel setValue={setValue} />
      <MainPanel searchValue={value} />
    </>
  );
};
