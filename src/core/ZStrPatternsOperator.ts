import ZStrOperator from './ZStrOperator';

interface ZStrPatternsOperator extends ZStrOperator {
  patterns: string | string[];
  patternsToIgnore?: string[];
};

export default ZStrPatternsOperator;
