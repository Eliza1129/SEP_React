const arr = [2, 4, 6, 8]

// 1. mapPlus
arr.__proto__.mapPlus = function (cb) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
      output.push(cb(this[i], i, this));
    }
    return output;
};
console.log(arr.mapPlus(x => x * 2));  // [4, 8, 12, 16]

// 2. filterPlus
arr.__proto__.filterPlus = function (cb) {
    const output = [];
    for (let i = 0; i < this.length; i++) {
      const value = this[i];
      if (cb(value, i, this)) {
        output.push(value);
      }
    }
    return output;
};
console.log(arr.filterPlus(x => x > 6)); 

  
// 3. reducePlus
arr.__proto__.reducePlus = function (cb, initial) {
    let total = initial;
    let i = 0;
  
    if (total === undefined) {
      total = this[0];
      i = 1;
    }
  
    for (; i < this.length; i++) {
      total = cb(total, this[i], i, this);
    }
  
    return total;
};
console.log(arr.reducePlus((a, b) => a + b, 0));

  
// 4. hasValue
arr.__proto__.hasValue = function (target) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === target) {
        return true;
      }
    }
    return false;
};

console.log(arr.hasValue(4)); //true

// 5. findOne
arr.__proto__.findOne = function (cb) {
    for (let i = 0; i < this.length; i++) {
      const value = this[i];
      if (cb(value, i, this)) {
        return value;
      }
    }
    return undefined;
};

console.log(arr.findOne(x => x > 3));     
  
// 6. mySlice
arr.__proto__.mySlice = function (start = 0, end = this.length) {
    const output = [];
  
    if (start < 0) start = this.length + start;
    if (end < 0) end = this.length + end;
  
    for (let i = start; i < end && i < this.length; i++) {
      output.push(this[i]);
    }
  
    return output;
};
console.log(arr.mySlice(1, 4));        
