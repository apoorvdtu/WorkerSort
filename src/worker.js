self.onmessage = (e) => {
  const { array, comparator } = e.data;
  const compareFn = new Function("a", "b", `return ${comparator};`)();
  const sortedArray = array.sort((a, b) => compareFn(a, b));
  self.postMessage(sortedArray);
};
