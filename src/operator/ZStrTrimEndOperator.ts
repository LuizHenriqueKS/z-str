import ZStr from '../core/ZStr';
import ZStrOperator from '../core/ZStrOperator';

class ZStrTrimEndOperator implements ZStrOperator {
  canApply(str: ZStr): boolean {
    return true;
  }

  apply(str: ZStr): ZStr {
    return new ZStr(str.toString().trimEnd(), str.options);
  }
}

export default ZStrTrimEndOperator;
