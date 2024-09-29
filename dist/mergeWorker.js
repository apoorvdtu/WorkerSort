"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MinHeap = /*#__PURE__*/function () {
  function MinHeap() {
    _classCallCheck(this, MinHeap);
    this.heap = [];
  }
  return _createClass(MinHeap, [{
    key: "insert",
    value: function insert(node) {
      this.heap.push(node);
      this.bubbleUp();
    }
  }, {
    key: "bubbleUp",
    value: function bubbleUp() {
      var index = this.heap.length - 1;
      var element = this.heap[index];
      while (index > 0) {
        var parentIndex = Math.floor((index - 1) / 2);
        var parent = this.heap[parentIndex];
        if (element.element >= parent.element) break;
        this.heap[index] = parent;
        index = parentIndex;
      }
      this.heap[index] = element;
    }
  }, {
    key: "extractMin",
    value: function extractMin() {
      var min = this.heap[0];
      var end = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = end;
        this.bubbleDown();
      }
      return min;
    }
  }, {
    key: "bubbleDown",
    value: function bubbleDown() {
      var index = 0;
      var length = this.heap.length;
      var element = this.heap[0];
      while (true) {
        var leftChildIndex = 2 * index + 1;
        var rightChildIndex = 2 * index + 2;
        var swapIndex = null;
        if (leftChildIndex < length) {
          var leftChild = this.heap[leftChildIndex];
          if (leftChild.element < element.element) {
            swapIndex = leftChildIndex;
          }
        }
        if (rightChildIndex < length) {
          var rightChild = this.heap[rightChildIndex];
          if (swapIndex === null && rightChild.element < element.element || swapIndex !== null && rightChild.element < this.heap[swapIndex].element) {
            swapIndex = rightChildIndex;
          }
        }
        if (swapIndex === null) break;
        this.heap[index] = this.heap[swapIndex];
        index = swapIndex;
      }
      this.heap[index] = element;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.heap.length === 0;
    }
  }]);
}();
function mergeKSortedArrays(arrays) {
  var minHeap = new MinHeap();
  var mergedArray = [];
  arrays.forEach(function (array, index) {
    if (array.length > 0) {
      minHeap.insert({
        element: array[0],
        arrayIndex: index,
        elementIndex: 0
      });
    }
  });
  while (!minHeap.isEmpty()) {
    var minNode = minHeap.extractMin();
    mergedArray.push(minNode.element);
    var nextElementIndex = minNode.elementIndex + 1;
    var arrayIndex = minNode.arrayIndex;
    if (nextElementIndex < arrays[arrayIndex].length) {
      minHeap.insert({
        element: arrays[arrayIndex][nextElementIndex],
        arrayIndex: arrayIndex,
        elementIndex: nextElementIndex
      });
    }
  }
  return mergedArray;
}
self.onmessage = function (e) {
  var sortedParts = e.data;
  var mergedArray = mergeKSortedArrays(sortedParts);
  self.postMessage(mergedArray);
};