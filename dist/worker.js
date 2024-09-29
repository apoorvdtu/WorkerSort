"use strict";

self.onmessage = function (e) {
  var _e$data = e.data,
    array = _e$data.array,
    comparator = _e$data.comparator;
  var compareFn = new Function("a", "b", "return ".concat(comparator, ";"))();
  var sortedArray = array.sort(function (a, b) {
    return compareFn(a, b);
  });
  self.postMessage(sortedArray);
};