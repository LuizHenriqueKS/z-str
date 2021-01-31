import ZStr from '../core/ZStr';
import ZStrDirection from '../core/ZStrDirection';
import ZStrCropOperator from '../core/ZStrCropOperator';
import PatternsNotFoundException from '../exception/PatternsNotFoundException';
import applyCrop from '../util/applyCrop';

class ZStrFromOperator implements ZStrCropOperator {
  patterns: string | string[];
  patternsToIgnore?: string[];
  direction: ZStrDirection;

  constructor(patterns: string | string[], patternsToIgnore?: string[]) {
    this.patterns = patterns;
    this.patternsToIgnore = patternsToIgnore;
    this.direction = ZStrDirection.START;
  }

  crop(str: ZStr, direction: ZStrDirection): ZStr {
    return applyCrop(this, str, direction);
  }

  canApply(str: ZStr): boolean {
    return str.search(this.patterns, this.patternsToIgnore).hasNext();
  }

  apply(str: ZStr): ZStr {
    const search = str.search(this.patterns, this.patternsToIgnore);
    search.direction = this.direction;
    const foundPattern = search.next();
    if (foundPattern.valid) {
      const index = str.inclusive ? foundPattern.start : foundPattern.end;
      return str.substring(index);
    } else if (!str.ignoreErrors) {
      throw new PatternsNotFoundException(this);
    } else {
      return str;
    }
  }

  isFrom(): boolean {
    return true;
  }

  isTill(): boolean {
    return false;
  }
}

export default ZStrFromOperator;
