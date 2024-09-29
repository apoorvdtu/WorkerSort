class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element.element >= parent.element) break;

      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = null;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (leftChild.element < element.element) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && rightChild.element < element.element) ||
          (swapIndex !== null &&
            rightChild.element < this.heap[swapIndex].element)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;

      this.heap[index] = this.heap[swapIndex];
      index = swapIndex;
    }

    this.heap[index] = element;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function mergeKSortedArrays(arrays) {
  const minHeap = new MinHeap();
  const mergedArray = [];

  arrays.forEach((array, index) => {
    if (array.length > 0) {
      minHeap.insert({ element: array[0], arrayIndex: index, elementIndex: 0 });
    }
  });

  while (!minHeap.isEmpty()) {
    const minNode = minHeap.extractMin();
    mergedArray.push(minNode.element);

    const nextElementIndex = minNode.elementIndex + 1;
    const arrayIndex = minNode.arrayIndex;

    if (nextElementIndex < arrays[arrayIndex].length) {
      minHeap.insert({
        element: arrays[arrayIndex][nextElementIndex],
        arrayIndex,
        elementIndex: nextElementIndex,
      });
    }
  }

  return mergedArray;
}

self.onmessage = (e) => {
  const sortedParts = e.data;
  const mergedArray = mergeKSortedArrays(sortedParts);

  self.postMessage(mergedArray);
};
