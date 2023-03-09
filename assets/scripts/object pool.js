class ObjectPool {
    constructor(maxSize, objectFactory) {
      this.maxSize = maxSize;
      this.objectFactory = objectFactory;
      this.pool = [];
    }
  
    getObject(...args) {
      if (this.pool.length > 0) {
        return this.pool.pop();
      } else {
        if (this.maxSize === undefined || this.pool.length < this.maxSize) {
          return this.objectFactory(...args);
        } else {
          throw new Error("Pool limit reached");
        }
      }
    }
  
    releaseObject(object) {
      this.pool.push(object);
    }
}