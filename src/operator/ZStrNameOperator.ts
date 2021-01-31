import ZStr from '../core/ZStr';
import ZStrOperator from '../core/ZStrOperator';

class ZStrNameOperator implements ZStrOperator {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  canApply(str: ZStr): boolean {
    return true;
  }

  apply(str: ZStr): ZStr {
    return str;
  }
}

export default ZStrNameOperator;
