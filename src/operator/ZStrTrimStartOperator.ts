import ZStr from '../core/ZStr';
import ZStrOperator from '../core/ZStrOperator';

class ZStrTrimStartOperator implements ZStrOperator {
  canApply(str: ZStr): boolean {
    return true;
  }

  apply(str: ZStr): ZStr {
    return new ZStr(str.toString().trimStart(), str.options);
  }
}

export default ZStrTrimStartOperator;
