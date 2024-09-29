self.onmessage = (e) => {
  const { array, comparator } = e.data;
  const sortedArray = array.sort(comparator);
  self.postMessage(sortedArray);
};
