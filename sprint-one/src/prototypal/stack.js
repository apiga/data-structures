var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var stack = Object.create(stackMethods);
  stack.length = 0;
  stack.content = {};
  return stack;
};

var stackMethods = {
  size: function() { return this.length; },
  push: function(value) {
    this.length++;
    this.content[this.length] = value;
  },
  pop: function() {
    var result;
    if (this.length > 0) {
      result = this.content[this.length];
      delete this.content[this.length];
      this.length--;
    }
    return result;
  }
};
