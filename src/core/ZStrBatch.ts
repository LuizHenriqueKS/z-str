import ZStrFromOperator from '../operator/ZStrFromOperator';
import ZStrTillOperator from '../operator/ZStrTillOperator';
import ZStrFromIndexOperator from '../operator/ZStrFromIndexOperator';
import ZStrTillIndexOperator from '../operator/ZStrTillIndexOperator';
import ZStrSubOperator from '../operator/ZStrSubOperator';
import ZStrTrimOperator from '../operator/ZStrTrimOperator';
import ZStrTrimStartOperator from '../operator/ZStrTrimStartOperator';
import ZStrTrimEndOperator from '../operator/ZStrTrimEndOperator';
import ZStrNameOperator from '../operator/ZStrNameOperator';
import ZStr from './ZStr';
import ZStrOperator from './ZStrOperator';
import ZStrDirection from './ZStrDirection';
import ZStrGrouper from './ZStrGrouper';
import ZStrSplitter from './ZStrSplitter';

class ZStrBatch {
  #str: ZStr;
  #operators: ZStrOperator[];
  #direction: ZStrDirection;

  constructor(str: ZStr) {
    this.#str = str;
    this.#operators = [];
    this.#direction = ZStrDirection.START;
  }

  caseSensitive(caseSensitive: boolean): ZStrBatch {
    this.#operators.push(new ZStrSubOperator({ caseSensitive }));
    return this;
  }

  inclusive(): ZStrBatch {
    this.#operators.push(new ZStrSubOperator({ inclusive: true }));
    return this;
  }

  exclusive(): ZStrBatch {
    this.#operators.push(new ZStrSubOperator({ inclusive: false }));
    return this;
  }

  direction(direction: ZStrDirection) {
    this.#direction = direction;
    return this;
  }

  reverseDirection() {
    switch (this.#direction) {
      case ZStrDirection.START:
        this.direction(ZStrDirection.END);
        break;
      case ZStrDirection.END:
        this.direction(ZStrDirection.START);
        break;
    }
    return this;
  }

  from(patterns: string | string[], patternsToIgnore?: string[]): ZStrBatch {
    this.#operators.push(new ZStrFromOperator(patterns, patternsToIgnore));
    return this;
  }

  fromLast(patterns: string | string[], patternsToIgnore?: string[]): ZStrBatch {
    const operator = new ZStrFromOperator(patterns, patternsToIgnore);
    operator.direction = ZStrDirection.END;
    this.#operators.push(operator);
    return this;
  }

  fromIndex(index: number): ZStrBatch {
    this.#operators.push(new ZStrFromIndexOperator(index));
    return this;
  }

  till(patterns: string | string[], patternsToIgnore?: string[]): ZStrBatch {
    this.#operators.push(new ZStrTillOperator(patterns, patternsToIgnore));
    return this;
  }

  tillLast(patterns: string | string[], patternsToIgnore?: string[]): ZStrBatch {
    const operator = new ZStrTillOperator(patterns, patternsToIgnore);
    operator.direction = ZStrDirection.END;
    this.#operators.push(operator);
    return this;
  }

  tillIndex(index: number): ZStrBatch {
    this.#operators.push(new ZStrTillIndexOperator(index));
    return this;
  }

  trim(): ZStrBatch {
    this.#operators.push(new ZStrTrimOperator());
    return this;
  }

  trimStart(): ZStrBatch {
    this.#operators.push(new ZStrTrimStartOperator());
    return this;
  }

  trimEnd(): ZStrBatch {
    this.#operators.push(new ZStrTrimEndOperator());
    return this;
  }

  name(name: string): ZStrBatch {
    this.#operators.push(new ZStrNameOperator(name));
    return this;
  }

  group(): ZStrGrouper {
    return new ZStrGrouper(this.#str, this.#direction, this.#operators);
  }

  split(): ZStrSplitter {
    return new ZStrSplitter(this.#str, this.#direction, this.#operators);
  }
}

export default ZStrBatch;
