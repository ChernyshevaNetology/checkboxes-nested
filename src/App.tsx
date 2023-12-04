import React, { useContext } from "react";
import { CheckboxComponent } from "./components/Checkbox";
import { CheckboxContext } from "./context/Context";

export type TCategory = {
  id: number;
  parentId?: number;
  name: string;
  url: string;
  items?: TCategory[];
  checked: boolean;
};

export const App = () => {
  const checkboxes = useContext(CheckboxContext);

  return (
    <div className={"container"}>
      <div className={"checkboxes-group"}>
        {checkboxes &&
          checkboxes.menu.map((category: TCategory) => (
            <CheckboxComponent key={category.id} entry={category} />
          ))}
      </div>
    </div>
  );
};

export default App;
