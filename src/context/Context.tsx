import React, { createContext, useCallback, useState } from "react";
import { categories } from "../data";
import {
  getAllTopLevelObjects,
  handleTestToggle,
  getCheckboxParent,
  getAllToggled,
} from "../utils";
import { TCategory } from "../App";

type TContextProps = {
  menu: TCategory[];
  onCheckboxToggle: (entry: TCategory) => void;
};

const CheckboxContext = createContext<TContextProps | null>(null);

const CheckboxContextProvider = ({ children }: any) => {
  const [menu, setMenu] = useState<TCategory[]>(
    getAllTopLevelObjects(categories as TCategory[]),
  );

  console.log("menu", menu);

  const onCheckboxToggle = useCallback(
    (entry: TCategory) => {
      const { id, parentId } = entry;
      const updatedMenu = [...handleTestToggle(id, menu, entry.checked)];
      setMenu(updatedMenu);
      const parent = getCheckboxParent(parentId, menu);
      const updatedMenuWithParent = [...getAllToggled(parent, entry, menu)];
      setMenu(updatedMenuWithParent);
    },
    [menu],
  );

  return (
    <CheckboxContext.Provider value={{ menu, onCheckboxToggle }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export { CheckboxContextProvider, CheckboxContext };
