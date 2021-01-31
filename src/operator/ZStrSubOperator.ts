import ZStr from '../core/ZStr';
import ZStrOptions from '../core/ZStrOptions';
import ZStrOperator from '../core/ZStrOperator';

class ZStrSubOperator implements ZStrOperator {
  options?: ZStrOptions;

  constructor(options?: ZStrOptions) {
    this.options = options;
  }

  canApply(str: ZStr): boolean {
    return true;
  }

  apply(str: ZStr): ZStr {
    return new ZStr(str.toString(), { ...str.options, ...this.options });
  }
}

export default ZStrSubOperator;
