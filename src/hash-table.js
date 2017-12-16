/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax, LinkedList } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    const keys = [];
    for (let i = 0; i < oldStorage.length; i++) {
      if (oldStorage.storage[i] !== undefined) {
        let nowNode = oldStorage.storage[i].head;
        while (nowNode !== null) {
          keys.push([nowNode.value[0], nowNode.value[1]]);
          nowNode = nowNode.next;
        }
      }
    }
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index) || new LinkedList();
    const addBucket = new LinkedList();
    addBucket.insertNode(key, value);
    while (!bucket.head) {
      const removal = bucket.removalNode();
      if (removal in key) {
        addBucket.insertNode(Object.entries(removal)[0][0], Object.entries(removal)[0][1]);
      }
    }
    this.storage.set(index, addBucket);
  }

  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (!bucket) return this;
    const insertBucket = new LinkedList();
    while (!bucket.head === null) {
      const removeBucket = bucket.removalNode();
      if (key in removeBucket) {
        insertBucket.insertNode(Object.entries(removeBucket)[0][1], Object.entries(removeBucket)[0][1]);
      }
      this.storage.set(index, insertBucket);
    }
  }

  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (!bucket) return undefined;
    const insertBucket = new LinkedList();
    let retrieved;

    while (!bucket.head) {
      const removal = bucket.removalNode();
      if (key in removal) {
        retrieved = removal[key];
      }
      insertBucket.insertNode(Object.entries(removal)[0][0], Object.entries(removal)[0][1]);
    }
    this.storage.set(index, insertBucket);
    return retrieved;
  }
}


module.exports = HashTable;
