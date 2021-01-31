import ZStrOperator from '../core/ZStrOperator';

class PatternsNotFoundException {
  operator: ZStrOperator;
  constructor(operator: ZStrOperator) {
    this.operator = operator;
  }
}

export default PatternsNotFoundException;
