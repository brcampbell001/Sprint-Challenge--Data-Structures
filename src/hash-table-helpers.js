// A special array class that can only store the number of items specified by the `limit` argument
class LimitedArray {
  constructor(limit) {
    this.storage = [];
    this.limit = limit;
  }

  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
  }

  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }

  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }

  get length() {
    return this.storage.length;
  }

  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}
/* eslint-disable no-bitwise, operator-assignment */

const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

class linkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertNode(key, value) {
    const newNode = {};
    newNode[key] = value;
    newNode.next = null;

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return;
  }

  removalNode() {
    if (!this.head) return null;
    if (!this.head.next) {
      const removal = this.head;
      this.head = null;
      this.tail = null;
      return removal.value;
    }

    const removal = this.head;
    this.head = this.head.next;
    return removal.value;
  }

  contains(value) {
    if (!this.head) return false;
    const searchLinkedList = (node) => {
      if (node.value === value) return true;
      if (node.next === null) return false;
      return searchLinkedList(node.next);
    };
    return searchLinkedList(this.head);
  }
}

module.exports = {
  LimitedArray,
  getIndexBelowMax,
};
