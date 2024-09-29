"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortArrayWithWorkers = sortArrayWithWorkers;
// Function to create chunks from an array
function createChunks(array, chunkSize) {
  var chunks = [];
  for (var i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to sort an array using Web Workers
function sortArrayWithWorkers(array, comparator) {
  return new Promise(function (resolve, reject) {
    var comparatorString = comparator.toString();
    var numWorkers = navigator.hardwareConcurrency || 4;
    var chunkSize = Math.ceil(array.length / numWorkers);
    var sortedChunks = [];
    var completedWorkers = 0;
    var chunks = createChunks(array, chunkSize);
    chunks.forEach(function (chunk, index) {
      var worker = new Worker(new URL("./worker.js", import.meta.url));
      worker.postMessage({
        array: chunk,
        comparator: comparatorString
      });
      worker.onmessage = function (e) {
        sortedChunks[index] = e.data;
        completedWorkers++;
        worker.terminate();
        if (completedWorkers === chunks.length) {
          mergeSortedChunks(sortedChunks, resolve, reject);
        }
      };
      worker.onerror = function (error) {
        worker.terminate();
        reject(new Error("Sorting Worker error: ".concat(error.message)));
      };
    });
  });
}

// Function to merge sorted chunks using a separate worker
function mergeSortedChunks(sortedChunks, resolve, reject) {
  var mergeWorker = new Worker(new URL("./mergeWorker.js", import.meta.url));
  mergeWorker.postMessage(sortedChunks);
  mergeWorker.onmessage = function (e) {
    resolve(e.data);
    mergeWorker.terminate();
  };
  mergeWorker.onerror = function (error) {
    mergeWorker.terminate();
    reject(new Error("Merge Worker error: ".concat(error.message)));
  };
}