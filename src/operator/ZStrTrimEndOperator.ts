import ZStr from '../core/ZStr';
import ZStrCropOperator from '../core/ZStrCropOperator';
import ZStrDirection from '../core/ZStrDirection';
import UnsupportedOperationException from '../exception/UnsupportedOperationException';

class ZStrTrimEndOperator implements ZStrCropOperator {
  crop(str: ZStr, direction: ZStrDirection): ZStr {
    switch (direction) {
      case ZStrDirection.START:
        return str;
      case ZStrDirection.END:
        return str.trimEnd();
      default:
        throw new UnsupportedOperationException();
    }
  }

  isFrom(): boolean {
    return false;
  }

  isTill(): boolean {
    return false;
  }

  canApply(str: ZStr): boolean {
    return true;
  }

  apply(str: ZStr): ZStr {
    return new ZStr(str.toString().trimEnd(), str.options);
  }
}

export default ZStrTrimEndOperator;
