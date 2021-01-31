import ZStrNameOperator from '../operator/ZStrNameOperator';
import ZStr from './ZStr';
import ZStrIterator from './ZStrIterator';
import ZStrIteratorResult from './ZStrIteratorResult';
import ZStrOperator from './ZStrOperator';
import ZStrCropOperator from './ZStrCropOperator';
import ZStrDirection from './ZStrDirection';

class ZStrGrouper extends ZStrIterator<any> {
  #str: ZStr;
  #rest: ZStr;
  #operators: ZStrOperator[];
  #from: boolean;
  #till: boolean;
  #direction: ZStrDirection;

  constructor(str: ZStr, direction: ZStrDirection, operators: ZStrOperator[]) {
    super();
    this.#str = str;
    this.#rest = str;
    this.#operators = operators;
    this.#from = false;
    this.#till = false;
    this.#direction = direction;
  }

  tryGetNext(): ZStrIteratorResult<any> {
    this.#from = false;
    this.#till = false;
    let localStr = this.#rest;
    let hasRest = true;
    const valid = true;
    const value: any = {};
    for (const operator of this.#operators) {
      if (!this.canApply(operator, value)) {
        return { valid: false, value: this.emptyResult() };
      } else if (operator instanceof ZStrNameOperator) {
        value[operator.name] = localStr.toString();
        localStr = this.#rest;
        hasRest = false;
        this.#from = false;
        this.#till = false;
      } else {
        this.crop(operator);
        localStr = operator.apply(localStr);
        hasRest = true;
      }
    }
    if (!localStr.isEmpty() && hasRest) {
      value.default = localStr.toString();
    }
    return { valid, value };
  }

  emptyResult() {
    return {};
  }

  reset() {
    super.reset();
    this.#rest = this.#str;
    this.#from = false;
    this.#till = false;
  }

  private canApply(operator: ZStrOperator, value: any): boolean {
    if (operator.canApply(this.#rest)) {
      return true;
    }
    return this.#str.ignoreErrors && !this.isValueEmpty(value);
  }

  private isValueEmpty(value: any): boolean {
    return Object.keys(value).length === 0;
  }

  private crop(operator: ZStrOperator) {
    if ('crop' in operator) {
      const op: ZStrCropOperator = operator;
      if ((op.isFrom() && !this.#from) || (op.isTill() && !this.#till)) {
        this.#rest = op.crop(this.#rest, this.#direction);
        /* this.#till = this.#till || op.isTill();
        this.#from = this.#from || op.isFrom(); */
        switch (this.#direction) {
          case ZStrDirection.START:
            this.#till = this.#till || op.isTill();
            break;
          case ZStrDirection.END:
            this.#from = this.#from || op.isFrom();
            break;
        }
      }
    } else {
      this.#rest = operator.apply(this.#rest);
    }
  }

  get rest(): ZStr {
    return this.#rest;
  }
}

export default ZStrGrouper;
