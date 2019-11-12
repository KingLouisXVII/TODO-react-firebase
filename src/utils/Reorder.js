export const reorderTodos = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderLists = (list, startIndex, endIndex) => {
 const list2 = Object.assign({}, list);
  console.log(list2,startIndex, endIndex)
  const array = Object.entries(list);
  console.log('Array: ', array);

  const lowest = Math.min(startIndex, endIndex);
  const highest = Math.max(startIndex, endIndex);
  const plus = startIndex > endIndex;
  const newobj = array.reduce((acc, [key, value]) => {
    if (value.position < lowest || value.position > highest) {
      acc[key] = value;
      return acc;
    }

    if (value.position === startIndex) {
      value.position = endIndex;
      acc[key] = value;
      return acc;
    }

    value.position = plus ? value.position + 1 : value.position - 1;
    acc[key] = value;
    return acc;
  }, {});
  console.log("NEW: ", newobj);

  // console.log(array.slice(0, startIndex))
  // console.log(array.slice(startIndex, endIndex+1))
  // console.log(array.slice(endIndex+1, array[length]))

  // if(length === 2) {
  //   const first = array[0];
  //   const last = array[1];
  //     first[1].position = first[1].position + 1;
  //     last[1].position = last[1].position - 1;
  //   console.log(first, last)
  // }

  // const addOneList = array.reduce((acc, item)=>{
  //   if(startIndex < endIndex){
  //     console.log('up')
  //     acc[item[0]] = item[1];
  //     acc[item[0]].position = acc[item[0]].position - 1;
  //   }
  //   else if(startIndex > endIndex) {
  //     console.log('down')
  //     acc[item[0]] = item[1];
  //     acc[item[0]].position = acc[item[0]].position + 1;
  //   }
  //   return acc;
  // },{})

  // console.log(addOneList)



  const result = Object.entries(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  const reducedArray = result.reduce(function(acc, item){
    acc[item[0]] = item[1];

    return acc;
  }, {});

  return reducedArray;
};
