class RangeList {
  constructor() {
    // will hold all the ranges
    this.ranges = new Array();
  }
  // binary seach to find the interval from which the range starts
  binary_search(range) {
    var left = 0;
    var right = this.ranges.length - 1;
    var mid = Math.floor((left + right) / 2);
    while (right - left > 1) {
      mid = Math.floor((left + right) / 2);
      // console.log(left, right, mid)
      if (range[0] < this.ranges[mid][0]) {
        left = mid + 1;
        continue;
      }
      if (range[0] > this.ranges[mid][1]) {
        right = mid - 1;
        continue;
      }
      break;
    }
    return mid;
  }
  merge_intervals(i, range) {
    // range[1] is now outside the ith interval
    // loop to find where range[1] should be included
    ++i;
    var j = i - 1;
    while (i < this.ranges.length) {
      if (range[1] < this.ranges[i][0]) {
        // create a new interval by deleted the previous included intervals
        this.ranges.splice(j, i - j, [this.ranges[j][0], range[1]]);
        return;
      }
      if (range[1] <= this.ranges[i][1]) {
        // create a new interval by deleted the previous included intervals
        this.ranges.splice(j, i - j + 1, [
          this.ranges[j][0],
          Math.max(range[1], this.ranges[i][1]),
        ]);
        return;
      }
      ++i;
    }
    // create a new interval by deleting intervals till end
    this.ranges.splice(j, this.ranges.length - j, [
      Math.min(this.ranges[j][0], range[0]),
      Math.max(range[1], this.ranges[i - 1][1]),
    ]);
    return;
  }
  /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
  add(range) {
    // Add range to ranges
    if (!this.ranges.length) {
      this.ranges.push(range);
      return;
    }
    if (range[0] == range[1]) return;
    // Do binary search to find the location where the interval starts
    var startIndex = this.binary_search(range);
    // to handle the case where the input range can be before the start index
    startIndex > 0 ? (startIndex = startIndex - 1) : (startIndex = startIndex);
    var i = startIndex;
    for (var i = startIndex; i < this.ranges.length; ++i) {
      if (range[0] >= this.ranges[i][0]) {
        if (range[1] <= this.ranges[i][1]) {
          // input range included in an already present interval
          return;
        } else {
          // check if this range should be included
          if (range[0] > this.ranges[i][1]) continue;
          else {
            // merge and return
            this.merge_intervals(i, range);
            return;
          }
        }
      } else {
        if (range[1] < this.ranges[i][0]) {
          // new intervel and return
          this.ranges.splice(i, 0, [range[0], range[1]]);
          return;
        } else {
          // merge and return
          this.merge_intervals(i, range);
          return;
        }
      }
    }
    this.ranges.push(range);
  }
  /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
  remove(range) {
    if (!this.ranges.length) {
      console.log("No ranges available");
      return;
    }
    if (range[0] == range[1]) return;
    var startIndex = this.binary_search(range);
    startIndex > 0 ? (startIndex = startIndex - 1) : (startIndex = startIndex);
    for (var i = startIndex; i < this.ranges.length; ++i) {
      if (range[0] > this.ranges[i][0]) {
        if (range[0] > this.ranges[i][1]) continue;
        else {
          // divide and return
          // the input ranges falls in the middel of an existing interval
          if (range[1] <= this.ranges[i][1]) {
            // divide into two
            var temp = this.ranges[i][1];
            this.ranges.splice(i, 1, [this.ranges[i][0], range[0]]);
            this.ranges.splice(i + 1, 0, [range[1], temp]);
            return;
          } else {
            // find the next interval where range[1] exists
            var j = i;
            ++i;
            while (i < this.ranges.length) {
              if (range[1] <= this.ranges[i][0]) {
                // delete intervals till this point
                // and change the existing interval range
                this.ranges.splice(j, i - j, [this.ranges[j][0], range[0]]);
                return;
              } else {
                // if input lies in the middle of interval
                // the the intervals in middle and the two existing intervals range
                if (range[1] <= this.ranges[i][1]) {
                  this.ranges.splice(j, i - j, [this.ranges[j][0], range[0]]);
                  if (range[1] != this.ranges[i][1])
                    this.ranges.splice(j + 1, 1, [range[1], this.ranges[i][1]]);
                  return;
                }
              }
              ++i;
            }
            // if reached end, delete till the last
            this.ranges.splice(j, this.ranges.length - j, [
              this.ranges[j][0],
              range[0],
            ]);
          }
          return;
        }
      } else {
        // if not in range
        if (this.ranges[i][0] >= range[1]) continue;
        else {
          // if given input range starts from before the cureent interval
          // and ends in that interval range
          if (range[1] <= this.ranges[i][1]) {
            this.ranges.splice(i, 1, [range[1], this.ranges[i][1]]);
            return;
          } else {
            // if not in current interval range
            //find the merge interval
            var j = i;
            ++i;
            while (i < this.ranges.length) {
              if (range[1] <= this.ranges[i][0]) {
                // delete intervals till this i
                this.ranges.splice(j, i - j);
                return;
              }
              if (range[1] <= this.ranges[i][1]) {
                this.ranges.splice(j, i - j);
                if (range[1] == this.ranges[i][1]) {
                  this.ranges.splice(i, 1);
                  return;
                } else {
                  this.ranges.splice(i, 0, [range[1], this.ranges[i][1]]);
                  return;
                }
              }
              ++i;
            }
            this.ranges.splice(j, this.ranges.length - j);
            return;
          }
        }
      }
    }
    return;
  }
  /**
   * Prints out the list of ranges in the range list
   * */
  print() {
    // print all the ranges according to format
    var rangesPrint = "";
    this.ranges.forEach((element) => {
      rangesPrint += "[" + element[0] + "," + element[1] + ") ";
    });
    console.log(rangesPrint);
  }
}
// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)

rl.add([9, 10]);
rl.print();

rl.add([19, 20]);
rl.print();

rl.add([19, 19]);
rl.print();

rl.add([3, 9]);
rl.print();

rl.add([1, 2]);
rl.print();

rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([14, 18]);
rl.print();

rl.add([30, 31]);
rl.print();
rl.add([25, 28]);
rl.print();

rl.remove([19, 26]);
rl.print();

rl.add([25, 38]);
rl.print();

rl.remove([99, 100]);
rl.print();
