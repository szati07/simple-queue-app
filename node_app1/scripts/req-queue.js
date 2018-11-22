function Queue() {
    this.data = [];
}

Queue.prototype.add = function(record) {
    this.data.push(record);
  }
  
Queue.prototype.remove = function() {
    this.data.shift();
}

Queue.prototype.first = function() {
    return this.data[0];
}
  
Queue.prototype.size = function() {
    return this.data.length;
}

module.exports = Queue