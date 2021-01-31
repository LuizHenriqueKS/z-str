import ZStrOptions from './ZStrOptions';
import ZStrSearch from './ZStrSearch';
import ZStrSearchBuilder from './ZStrSearchBuilder';
import buildValidOptions from '../util/buildValidOptions';
import ZStrSearchResult from './ZStrSearchResult';
import ZStrFromOperator from '../operator/ZStrFromOperator';
import ZStrTillOperator from '../operator/ZStrTillOperator';
import ZStrDirection from './ZStrDirection';

class ZStr {
  #string: string;

  #caseSensitive: boolean;
  #ignoreNotFoundPatterns: boolean;
  #inclusive: boolean;

  /**
   *
   * @param string The string
   * @param options Optional, it is possible to inform whether this str will be case sensitive or not. The case sensitive by default is true.
   */
  constructor(string: string, options: ZStrOptions = {}) {
    const opt = buildValidOptions(options);
    this.#string = string;
    this.#caseSensitive = opt.caseSensitive;
    this.#ignoreNotFoundPatterns = opt.ignoreNotFoundPatterns;
    this.#inclusive = opt.inclusive;
  }

  equals(otherString: string | ZStr): boolean {
    if (otherString == null) {
      return false;
    }
    let localOtherString;
    if (otherString instanceof ZStr) {
      localOtherString = otherString.toString();
    } else {
      localOtherString = otherString;
    }
    if (this.#caseSensitive) {
      return this.#string === localOtherString;
    } else {
      return this.#string.toLowerCase() === localOtherString.toLowerCase();
    }
  }

  search(patterns: string[] | string, patternsToIgnore?: string[]): ZStrSearch {
    const builder = new ZStrSearchBuilder(this);
    builder.patterns = patterns;
    builder.patternsToIgnore = patternsToIgnore;
    return builder.build();
  }

  sub(options?: ZStrOptions) {
    const localOptions = {
      caseSensitive: this.#caseSensitive,
      ignoreNotFoundPatterns: this.#ignoreNotFoundPatterns,
      inclusive: this.#inclusive
    };
    return new ZStr(this.#string, { ...localOptions, ...options });
  }

  substr(start: number, length?: number): ZStr {
    const sub = this.sub();
    sub.#string = this.#string.substr(start, length);
    return sub;
  }

  substring(start: number, end?: number): ZStr {
    const sub = this.sub();
    sub.#string = this.#string.substring(start, end);
    return sub;
  }

  containsAny(patterns: string[] | string, patternsToIgnore?: string[]) {
    return this.search(patterns, patternsToIgnore).hasNext();
  }

  containsAll(patterns: string[] | string, patternsToIgnore?: string[]) {
    for (const pattern of patterns) {
      if (!this.search([pattern], patternsToIgnore).hasNext()) {
        return false;
      }
    }
    return true;
  }

  findFirst(patterns: string[] | string, patternsToIgnore?: string[]): ZStrSearchResult {
    return this.search(patterns, patternsToIgnore).next();
  }

  findLast(patterns: string[] | string, patternsToIgnore?: string[]): ZStrSearchResult {
    return this.search(patterns, patternsToIgnore).reverseDirection().next();
  }

  from(patterns: string[] | string, patternsToIgnore?: string[]): ZStr {
    return new ZStrFromOperator(patterns, patternsToIgnore).apply(this);
  }

  fromLast(patterns: string[] | string, patternsToIgnore?: string[]): ZStr {
    const operator = new ZStrFromOperator(patterns, patternsToIgnore);
    operator.direction = ZStrDirection.END;
    return operator.apply(this);
  }

  till(patterns: string[] | string, patternsToIgnore?: string[]): ZStr {
    return new ZStrTillOperator(patterns, patternsToIgnore).apply(this);
  }

  tillLast(patterns: string[] | string, patternsToIgnore?: string[]): ZStr {
    const operator = new ZStrTillOperator(patterns, patternsToIgnore);
    operator.direction = ZStrDirection.END;
    return operator.apply(this);
  }

  startsWith(patterns: string[] | string, patternsToIgnore?: string[]): boolean {
    const result = this.findFirst(patterns, patternsToIgnore);
    return result.valid && result.start === 0;
  }

  endsWith(patterns: string[] | string, patternsToIgnore?: string[]): boolean {
    const result = this.findLast(patterns, patternsToIgnore);
    return result.valid && result.end === this.#string.length;
  }

  isEmpty() {
    return this.#string === '';
  }

  toString(): string {
    return this.#string;
  }

  get caseSensitive() {
    return this.#caseSensitive;
  }

  get ignoreNotFoundPatterns() {
    return this.#ignoreNotFoundPatterns;
  }

  get inclusive() {
    return this.#inclusive;
  }
}

export default ZStr;
