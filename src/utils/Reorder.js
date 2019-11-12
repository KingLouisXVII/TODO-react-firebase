export const reorderTodos = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderLists = (list, startIndex, endIndex) => {
  const array = Object.entries(list);
  const lowestIndex = Math.min(startIndex, endIndex);
  const highestIndex = Math.max(startIndex, endIndex);
  const operator = startIndex > endIndex;

  const newobj = array.reduce((acc, [key, value]) => {
    if (value.position < lowestIndex || value.position > highestIndex) {
      acc[key] = value;
      return acc;
    }

    if (value.position === startIndex) {
      value.position = endIndex;
      acc[key] = value;
      return acc;
    }

    value.position = operator ? value.position + 1 : value.position - 1;
    acc[key] = value;
    return acc;
  }, {});

  return newobj;
};

export const reposition = (allLists, list) => {
  const lists = {...allLists};
  const position = lists[list].position;
  const array = Object.entries(allLists);

  const newObj = array.reduce((acc, [key, value]) => {
    if(value.position <= position) {
      acc[key] = value;
      return acc;
    }  

    value.position = value.position - 1;
    acc[key] = value;
    return acc;
  }, {});

  return newObj;
};
