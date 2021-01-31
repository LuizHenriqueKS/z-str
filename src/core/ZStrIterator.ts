abstract class ZStrIterator<T> {
  protected _hasNextLoad: boolean;
  protected _finished: boolean;
  protected _hasNext: boolean;
  protected _next?: T;

  constructor() {
    this._hasNextLoad = false;
    this._finished = false;
    this._hasNext = false;
  }

  abstract tryGetNext(): { valid: boolean, value: T };
  abstract emptyResult(): T;

  hasNext(): boolean {
    if (this._hasNextLoad) {
      return this._hasNext;
    } else if (this._finished) {
      return false;
    } else {
      this._next = this.next();
      this._hasNextLoad = true;
      return this._hasNext;
    }
  }

  next(): T {
    if (this._hasNextLoad) {
      this._hasNextLoad = false;
      return this._next || this.emptyResult();
    } else if (this._finished) {
      return this.emptyResult();
    } else {
      const result = this.tryGetNext();
      this._hasNextLoad = false;
      this._hasNext = result.valid;
      this._next = result.value;
      this._finished = this._finished || !result.valid;
      return this._next;
    }
  }

  list(): T[] {
    const result = [];
    while (this.hasNext()) {
      result.push(this.next());
    }
    return result;
  }

  reset() {
    this._hasNextLoad = false;
    this._finished = false;
    this._next = undefined;
  }
}

export default ZStrIterator;
