import ZStr from '../core/ZStr';
import ZStrCropOperator from '../core/ZStrCropOperator';
import ZStrDirection from '../core/ZStrDirection';
import applyCropIndex from '../util/applyCropIndex';

class ZStrTillIndexOperator implements ZStrCropOperator {
  index: number;

  constructor(index: number) {
    this.index = index;
  }

  crop(str: ZStr, direction: ZStrDirection): ZStr {
    return applyCropIndex(this, str, direction);
  }

  canApply(str: ZStr): boolean {
    return Math.abs(this.index) <= str.length;
  }

  apply(str: ZStr): ZStr {
    if (this.index < 0) {
      return str.substr(0, str.length + this.index);
    } else {
      return str.substr(0, this.index);
    }
  }

  isFrom(): boolean {
    return false;
  }

  isTill(): boolean {
    return true;
  }
}

export default ZStrTillIndexOperator;
