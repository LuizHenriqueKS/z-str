import ZStr from '../core/ZStr';
import ZStrTillOperator from '../operator/ZStrTillOperator';
import ZStrFromOperator from '../operator/ZStrFromOperator';
import ZStrDirection from '../core/ZStrDirection';
import UnsupportedOperationException from '../exception/UnsupportedOperationException';

function applyCrop(operator: ZStrFromOperator | ZStrTillOperator, str: ZStr, direction: ZStrDirection) {
  switch (direction) {
    case ZStrDirection.START:
      return crop(str, operator.direction, new ZStrFromOperator(operator.patterns, operator.patternsToIgnore));
    case ZStrDirection.END:
      return crop(str, operator.direction, new ZStrTillOperator(operator.patterns, operator.patternsToIgnore));
    default:
      throw new UnsupportedOperationException();
  }
}

function crop(str: ZStr, direction: ZStrDirection, operator: ZStrFromOperator | ZStrTillOperator): ZStr {
  operator.direction = direction;
  return operator.apply(str);
}

export default applyCrop;
