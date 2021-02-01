import ZStr from '../core/ZStr';
import ZStrDirection from '../core/ZStrDirection';
import UnsupportedOperationException from '../exception/UnsupportedOperationException';
import ZStrCropOperator from '../core/ZStrCropOperator';

class ZStrTrimStartOperator implements ZStrCropOperator {
  crop(str: ZStr, direction: ZStrDirection): ZStr {
    switch (direction) {
      case ZStrDirection.START:
        return str.trimStart();
      case ZStrDirection.END:
        return str;
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
    return new ZStr(str.toString().trimStart(), str.options);
  }
}

export default ZStrTrimStartOperator;
