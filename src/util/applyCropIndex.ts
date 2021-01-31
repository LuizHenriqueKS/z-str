import ZStr from '../core/ZStr';
import ZStrFromIndexOperator from '../operator/ZStrFromIndexOperator';
import ZStrTillIndexOperator from '../operator/ZStrTillIndexOperator';
import ZStrDirection from '../core/ZStrDirection';
import UnsupportedOperationException from '../exception/UnsupportedOperationException';

function applyCropIndex(operator: ZStrFromIndexOperator | ZStrTillIndexOperator, str: ZStr, direction: ZStrDirection) {
  switch (direction) {
    case ZStrDirection.START:
      return new ZStrFromIndexOperator(operator.index).apply(str);
    case ZStrDirection.END:
      return new ZStrTillIndexOperator(operator.index).apply(str);
    default:
      throw new UnsupportedOperationException();
  }
}

export default applyCropIndex;
