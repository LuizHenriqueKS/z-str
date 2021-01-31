import ZStrOptions from './ZStrOptions';
import ZStrSearch from './ZStrSearch';
import ZStrSearchBuilder from './ZStrSearchBuilder';
import buildValidOptions from '../util/buildValidOptions';
import ZStrSearchResult from './ZStrSearchResult';
import ZStrFromOperator from '../operator/ZStrFromOperator';
import ZStrTillOperator from '../operator/ZStrTillOperator';
import ZStrSubOperator from '../operator/ZStrSubOperator';
import ZStrFromIndexOperator from '../operator/ZStrFromIndexOperator';
import ZStrTillIndexOperator from '../operator/ZStrTillIndexOperator';
import ZStrTrimOperator from '../operator/ZStrTrimOperator';
import ZStrTrimStartOperator from '../operator/ZStrTrimStartOperator';
import ZStrTrimEndOperator from '../operator/ZStrTrimEndOperator';
import ZStrDirection from './ZStrDirection';
import ZStrBatch from './ZStrBatch';
import ZStrSplitter from './ZStrSplitter';
import IndexOutOfBoundsException from '../exception/IndexOutOfBoundsException';

class ZStr {
  #string: string;

  #caseSensitive: boolean;
  #ignoreErrors: boolean;
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
    this.#ignoreErrors = opt.ignoreErrors;
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
    return new ZStrSubOperator(options).apply(this);
  }

  substr(start: number, length?: number): ZStr {
    const end = length ? start + length : undefined;
    this.requireValidIndices(start, end);
    const sub = this.sub();
    sub.#string = this.#string.substr(start, length);
    return sub;
  }

  substring(start: number, end?: number): ZStr {
    this.requireValidIndices(start, end);
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

  fromIndex(index: number): ZStr {
    return new ZStrFromIndexOperator(index).apply(this);
  }

  till(patterns: string[] | string, patternsToIgnore?: string[]): ZStr {
    return new ZStrTillOperator(patterns, patternsToIgnore).apply(this);
  }

  tillLast(patterns: string[] | string, patternsToIgnore?: string[]): ZStr {
    const operator = new ZStrTillOperator(patterns, patternsToIgnore);
    operator.direction = ZStrDirection.END;
    return operator.apply(this);
  }

  tillIndex(index: number): ZStr {
    return new ZStrTillIndexOperator(index).apply(this);
  }

  startsWith(patterns: string[] | string, patternsToIgnore?: string[]): boolean {
    const result = this.findFirst(patterns, patternsToIgnore);
    return result.valid && result.start === 0;
  }

  endsWith(patterns: string[] | string, patternsToIgnore?: string[]): boolean {
    const result = this.findLast(patterns, patternsToIgnore);
    return result.valid && result.end === this.#string.length;
  }

  trim(): ZStr {
    return new ZStrTrimOperator().apply(this);
  }

  trimStart(): ZStr {
    return new ZStrTrimStartOperator().apply(this);
  }

  trimEnd(): ZStr {
    return new ZStrTrimEndOperator().apply(this);
  }

  batch(): ZStrBatch {
    return new ZStrBatch(this);
  }

  isEmpty() {
    return this.#string === '';
  }

  split(patterns: string | string[], patternsToIgnore?: string[]): ZStrSplitter {
    return this.batch().till(patterns, patternsToIgnore).split();
  }

  toString(): string {
    return this.#string;
  }

  private requireValidIndices(start: number, end?: number) {
    if (!this.ignoreErrors) {
      if (start < 0 || start > this.length) {
        throw new IndexOutOfBoundsException(start);
      }
      if (end && ((end < 0) || (end > this.length))) {
        throw new IndexOutOfBoundsException(end);
      }
    }
  }

  get options(): ZStrOptions {
    const options: ZStrOptions = {
      caseSensitive: this.#caseSensitive,
      ignoreErrors: this.#ignoreErrors,
      inclusive: this.#inclusive
    };
    return options;
  }

  get length() {
    return this.#string.length;
  }

  get caseSensitive() {
    return this.#caseSensitive;
  }

  get ignoreErrors() {
    return this.#ignoreErrors;
  }

  get inclusive() {
    return this.#inclusive;
  }
}

export default ZStr;
