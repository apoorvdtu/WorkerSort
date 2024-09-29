"use strict";

self.onmessage = function (e) {
  var _e$data = e.data,
    array = _e$data.array,
    comparator = _e$data.comparator;
  var sortedArray = array.sort(comparator);
  self.postMessage(sortedArray);
};