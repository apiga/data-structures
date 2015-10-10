

var HashTable = function() {
  this._limit = 2;
  this._storage = LimitedArray(this._limit);
  this._tuples = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var that = this;
  this._tuples += this.addToStorage(this._storage, index, [k, v]);

  if (this._limit * 0.75 < this._tuples) {
  // double limit
  this._limit *= 2;
  // recreate storage
  var newStorage = LimitedArray(this._limit);
  this._storage.each(function(bucket) {
    _.each(bucket, function(tuple) {
      var index = getIndexBelowMaxForKey(tuple[0], this._limit);
      that.addToStorage(newStorage, index, tuple);
    });
  });
   newStorage.each(function(i) {
   });
  this._storage = newStorage;
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var result;
  if (this._storage.get(index) !== undefined) {
    var bucket = this._storage.get(index);
    var i = 0;
    while (result === undefined && i < bucket.length) {
      if(bucket[i][0] === k) {
        result = bucket[i][1];
      }
      i++;
    }
  }
  return (result || null);
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(index) !== undefined) {
    var bucket = this._storage.get(index).splice();
    var removed = false;
    var i = 0;
    while (!removed && i < bucket.length) {
      if(bucket[i][0] === k) {
        bucket = bucket.splice(i, 1);
        removed = true;
      }
      i++;
    }
    if (bucket.length === 0) {
      bucket = undefined;
    }
    this._storage.set(index, bucket);
  }
};

HashTable.prototype.addToStorage = function(storage, ind, valueToAdd) {
  var tupleIncrement = 0;
  if (storage.get(ind) === undefined) {
    storage.set(ind, [valueToAdd]);
    tupleIncrement++;
  } else {
    var bucket = storage.get(ind).slice();
    var isInBucket = false;
    var i = 0;
    while (!isInBucket && i < bucket.length) {
      if (bucket[i][0] === valueToAdd[0]) {
        bucket[i][1] = valueToAdd[1];
        isInBucket = true;
      }
      i++;
    }
    if (!isInBucket) {
      bucket.push(valueToAdd);
      tupleIncrement++;
    }
    storage.set(ind, bucket);
  }
  return tupleIncrement;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
