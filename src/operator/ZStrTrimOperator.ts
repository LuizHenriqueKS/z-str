import ZStr from '../core/ZStr';
import ZStrOperator from '../core/ZStrOperator';

class ZStrTrimOperator implements ZStrOperator {
  canApply(str: ZStr): boolean {
    return true;
  }

  apply(str: ZStr): ZStr {
    return new ZStr(str.toString().trim(), str.options);
  }
}

export default ZStrTrimOperator;
