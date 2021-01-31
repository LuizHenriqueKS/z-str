import ZStr from './ZStr';
import ZStrSearchOptions from './ZStrSearchOptions';
import ZStrSearch from './ZStrSearch';
import RequiredPropertyException from '../exception/RequiredPropertyException';
import EmptyPatternsException from '../exception/EmptyPatternsException';

class ZStrSearchBuilder {
  #string: string;
  #caseSensitive: boolean;

  patterns?: string[] | string;
  patternsToIgnore?: string[];

  offset: number | undefined;

  constructor(string: string | ZStr, options: ZStrSearchOptions = {}) {
    if (string instanceof ZStr) {
      this.#string = string.toString();
      this.#caseSensitive = options.caseSensitive || string.caseSensitive;
    } else {
      this.#string = string;
      this.#caseSensitive = options.caseSensitive || true;
    }
  }

  build(): ZStrSearch {
    this.requireProperty('patterns', this.patterns);
    this.requireProperty('string', this.#string);
    this.requireProperty('caseSensitive', this.#caseSensitive);
    if (this.patterns instanceof Array) {
      if (this.patterns.length === 0) throw new EmptyPatternsException();
    }
    return this.implement();
  }

  private implement(): ZStrSearch {
    const impl = new ZStrSearch();
    const localPatterns: string[] = (this.patterns instanceof Array) ? this.patterns as any : [this.patterns];
    impl.string = this.#string;
    impl.offset = this.offset;
    impl.caseSensitive = this.#caseSensitive;
    impl.patterns = localPatterns;
    impl.patternsToIgnore = this.patternsToIgnore ? this.patternsToIgnore : [];
    return impl;
  }

  private requireProperty(propertyName: string, propertyValue: any) {
    if (propertyValue == null) {
      throw new RequiredPropertyException(propertyName);
    }
  }
}

export default ZStrSearchBuilder;
