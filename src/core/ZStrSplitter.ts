import ZStrIterator from './ZStrIterator';
import ZStr from './ZStr';
import ZStrDirection from './ZStrDirection';
import ZStrOperator from './ZStrOperator';
import ZStrGrouper from './ZStrGrouper';
import ZStrList from './ZStrList';

class ZStrSplitter extends ZStrIterator<ZStr> {
  #str: ZStr;
  #grouper: ZStrGrouper;

  constructor(str: ZStr, direction: ZStrDirection, operators: ZStrOperator[]) {
    super();
    this.#str = str;
    this.#grouper = new ZStrGrouper(str, direction, operators);
  }

  tryGetNext(): { valid: boolean; value: ZStr; } {
    if (this.#grouper.hasNext()) {
      const value = new ZStr(this.#grouper.next().default, this.#str.options);
      return { valid: true, value };
    } else if (!this._finished) {
      const value = this.#grouper.rest;
      this._finished = true;
      if (value.isEmpty()) {
        return { valid: false, value };
      } else {
        return { valid: true, value };
      }
    } else {
      return { valid: false, value: this.emptyResult() };
    }
  }

  list(): ZStrList {
    const list = new ZStrList();
    while (this.hasNext()) {
      list.push(this.next());
    }
    return list;
  }

  asStringArray(): string[] {
    return this.list().asStringArray();
  }

  emptyResult(): ZStr {
    return new ZStr('', this.#str.options);
  }

  reset(): void {
    super.reset();
    this.#grouper.reset();
  }
}

export default ZStrSplitter;
