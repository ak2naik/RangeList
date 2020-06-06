### Range List

1. Use array of arrays to store the intervals
2. Add:
   1. For each new range, use binary search to find the index where the inpur range starts.
   2. If the given range less than input range, add in front
   3. If given range greater than all intervals from that point, add at the end
   4. If partially covered, create new intervals
3. Remove:
   1. For each input, find the start index similar to add using binary search.
   2. If the input range partially covers, create new intervals.
   3. If the input range covers at least one end of an interval, delete and create a new interval if applies.
