/*
Copyright (c) 2008 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http://en.literateprograms.org/Quicksort_(JavaScript)?action=history&offset=20070102180347
http://blog.bogojoker.com (Joseph Pecoraro)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http://en.literateprograms.org/Quicksort_(JavaScript)?oldid=8410

------
Modified by Joseph Pecoraro
Date: Tuesday June 10, 2008
Description:  Now allows a compareFunction to be passed in, which makes it much
              easier to sort arrays of (comparible) objects.  Also the
              quick_sort method is now a prototype of Array and the
              general purpose functions are hidden inside this prototype.
------

Example usage:

  // Defaults to (a<=b) sorting.  Great for numbers.
  var arr = [1234, 2346, 21234, 3456, 32134, 3456, 1234, 2345, 23, 42523, 1234, 345];
  arr.quick_sort();
  // arr => [23, 345, 1234, 1234, 1234, 2345, 2346, 3456, 3456, 21234, 32134, 42523]

  var obj_arr = [ { age: 21, name: "Larry" },
                  { age: 34, name: "Curly" },
                  { age: 10, name: "Moe" } ];

  obj_arr.quick_sort(function(a,b) { return a.name < b.name });
  // obj_arr => Curly, Larry, Moe

  obj_arr.quick_sort(function(a,b) { return a.age < b.age });
  // obj_arr => Moe (10), Larry (21), Curly (34)

*/

const swap = function swap(a, b) {
  const tmp = this[a];
  this[a] = this[b];
  this[b] = tmp;
};

const quickSort = function quickSort(compareFunction) {
  function partition(array, compareFunction, begin, end, pivot) {
    const piv = array[pivot];
    array.swap(pivot, end - 1);
    let store = begin;
    for (let ix = begin; ix < end - 1; ++ix) {
      if (compareFunction(array[ix], piv)) {
        array.swap(store, ix);
        ++store;
      }
    }
    array.swap(end - 1, store);
    return store;
  }

  function qsort(array, compareFunction, begin, end) {
    if (end - 1 > begin) {
      let pivot = begin + Math.floor(Math.random() * (end - begin));
      pivot = partition(array, compareFunction, begin, end, pivot);
      qsort(array, compareFunction, begin, pivot);
      qsort(array, compareFunction, pivot + 1, end);
    }
  }

  if (compareFunction == null) {
    compareFunction = function (a, b) {
      return a <= b;
    };
  }

  qsort(this, compareFunction, 0, this.length);
};

Array.prototype.qs = quickSort;
Array.prototype.swap = swap;

module.exports = {
  swap,
  quickSort,
};
