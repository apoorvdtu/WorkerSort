// Function to create chunks from an array
function createChunks(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to sort an array using Web Workers
export function sortArrayWithWorkers(array, comparator) {
  return new Promise((resolve, reject) => {
    const comparatorString = comparator.toString();
    const numWorkers = navigator.hardwareConcurrency || 4;
    const chunkSize = Math.ceil(array.length / numWorkers);
    const sortedChunks = [];
    let completedWorkers = 0;

    const chunks = createChunks(array, chunkSize);

    chunks.forEach((chunk, index) => {
      const worker = new Worker(new URL("./worker.js", import.meta.url));
      worker.postMessage({ array: chunk, comparator: comparatorString });

      worker.onmessage = (e) => {
        sortedChunks[index] = e.data;
        completedWorkers++;
        worker.terminate();

        if (completedWorkers === chunks.length) {
          mergeSortedChunks(sortedChunks, resolve, reject);
        }
      };

      worker.onerror = (error) => {
        worker.terminate();
        reject(new Error(`Sorting Worker error: ${error.message}`));
      };
    });
  });
}

// Function to merge sorted chunks using a separate worker
function mergeSortedChunks(sortedChunks, resolve, reject) {
  const mergeWorker = new Worker(new URL("./mergeWorker.js", import.meta.url));
  mergeWorker.postMessage(sortedChunks);

  mergeWorker.onmessage = (e) => {
    resolve(e.data);
    mergeWorker.terminate();
  };

  mergeWorker.onerror = (error) => {
    mergeWorker.terminate();
    reject(new Error(`Merge Worker error: ${error.message}`));
  };
}
