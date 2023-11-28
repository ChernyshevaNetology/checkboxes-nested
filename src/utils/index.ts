import { TCategory } from "../App";
export function buildHierarchy(categories: TCategory[], parentId = 1) {
  const result: TCategory[] = [];

  for (const item of categories) {
    if (item.parentId === parentId) {
      const children = buildHierarchy(categories, item.id);

      if (children.length) {
        item.items = children;
        item.checked = false;
      }

      result.push({
        ...item,
        checked: false,
      });
    }
  }
  return result;
}

export function getAllTopLevelObjects(arr: TCategory[]) {
  const topLevelObjects = arr.filter((item) => !item.parentId);
  const res = topLevelObjects.map((topObject) => {
    const children = buildHierarchy(arr, topObject.id);
    if (children.length) {
      topObject.items = children;
      topObject.checked = false;
    }
    return {
      ...topObject,
      checked: false,
    };
  });
  return res;
}
const handleToggleChecked = (
  item: TCategory,
  toggleState: boolean,
  categories: TCategory[],
) => {
  if (item.items) {
    item.items.forEach((subCategory) =>
      handleToggleChecked(subCategory, toggleState, categories),
    );
  }

  item.checked = !toggleState;
};

export const handleTestToggle = (
  id: number,
  categories: TCategory[],
  toggleState: boolean,
): TCategory[] => {
  for (const category of categories) {
    if (category.id === id) {
      handleToggleChecked(category, toggleState, categories);
    }

    if (category.items) {
      handleTestToggle(id, category.items, toggleState);
    }
  }

  return categories;
};

const handleToggleParent = (
  id: number,
  isChecked: boolean,
  menu: TCategory[],
): TCategory[] => {
  for (const item of menu) {
    if (item.id === id) {
      item.checked = isChecked;
    }

    if (item.items) {
      handleToggleParent(id, isChecked, item.items);
    }
  }
  console.log("menu", menu);
  return menu;
};

export const getAllToggled = (
  parent: TCategory | undefined,
  child: TCategory,
  menu: TCategory[],
): TCategory[] => {
  if (child.items) {
    return menu;
  }

  if (parent && parent.items) {
    const res = parent.items.every((p) => child.checked === p.checked);
    if (res) {
      for (const item of menu) {
        handleToggleParent(parent.id, child.checked, menu);
      }
    }
  }

  return menu;
};

export const getCheckboxParent = (
  parentId: number | undefined,
  categories: TCategory[],
): TCategory | undefined => {
  for (const category of categories) {
    if (category.id === parentId) {
      return category;
    }

    if (category.items) {
      const result = getCheckboxParent(parentId, category.items);
      if (result) {
        return result;
      }
    }
  }
};
