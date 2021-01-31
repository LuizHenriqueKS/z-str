import ZStr from '../core/ZStr';
import ZStrCropOperator from '../core/ZStrCropOperator';
import ZStrDirection from '../core/ZStrDirection';
import applyCropIndex from '../util/applyCropIndex';

class ZStrFromIndexOperator implements ZStrCropOperator {
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
      return str.substr(str.length + this.index);
    } else {
      return str.substr(this.index);
    }
  }

  isFrom(): boolean {
    return true;
  }

  isTill(): boolean {
    return false;
  }
}

export default ZStrFromIndexOperator;
