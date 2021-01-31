import ZStr from './ZStr';
import ZStrDirection from './ZStrDirection';
import ZStrOperator from './ZStrOperator';

interface ZStrCropOperator extends ZStrOperator {
  crop(str: ZStr, direction: ZStrDirection): ZStr;

  isFrom(): boolean;
  isTill(): boolean;
};

export default ZStrCropOperator;
