export const reorderTodos = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderLists = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  const reducedArray = result.reduce(function(acc, item){
    acc[item[0]] = item[1];

    return acc;
  }, {});

  return reducedArray;
};
