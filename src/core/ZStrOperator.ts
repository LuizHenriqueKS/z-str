import ZStr from './ZStr';

interface ZStrOperator {
  canApply(str: ZStr): boolean;
  apply(str: ZStr): ZStr;
};

export default ZStrOperator;
