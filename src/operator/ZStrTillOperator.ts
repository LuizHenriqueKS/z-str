import ZStr from '../core/ZStr';
import ZStrDirection from '../core/ZStrDirection';
import ZStrPatternsOperator from '../core/ZStrPatternsOperator';
import PatternsNotFoundException from '../exception/PatternsNotFoundException';

class ZStrTillOperator implements ZStrPatternsOperator {
  patterns: string | string[];
  patternsToIgnore?: string[];
  direction: ZStrDirection;

  constructor(patterns: string | string[], patternsToIgnore?: string[]) {
    this.patterns = patterns;
    this.patternsToIgnore = patternsToIgnore;
    this.direction = ZStrDirection.START;
  }

  canApply(str: ZStr): boolean {
    return str.search(this.patterns, this.patternsToIgnore).hasNext();
  }

  apply(str: ZStr): ZStr {
    const search = str.search(this.patterns, this.patternsToIgnore);
    search.direction = this.direction;
    const foundPattern = search.next();
    if (foundPattern.valid) {
      const index = str.inclusive ? foundPattern.end : foundPattern.start;
      return str.substring(0, index);
    } else if (!str.ignoreNotFoundPatterns) {
      throw new PatternsNotFoundException(this);
    } else {
      return str;
    }
  }
}

export default ZStrTillOperator;
