import ZStr from './ZStr';
import IZStrSearch from './IZStrSearch';
import ZStrDirection from './ZStrDirection';
import ZStrSearchResult from './ZStrSearchResult';
import ZStrSearchBuilder from './ZStrSearchBuilder';
import UnsupportedOperationException from '../exception/UnsupportedOperationException';
import firstNotNull from '../util/firstNotNull';

class ZStrSearch {
  #string: string;
  #source?: string;
  #caseSensitive: boolean;

  #patterns: string[];
  #patternsToIgnore: string[];
  #direction: ZStrDirection;

  #next: ZStrSearchResult;
  #hasNextLoad: boolean;

  #offset?: number;
  #finished: boolean;

  constructor() {
    this.#string = '';
    this.#caseSensitive = true;
    this.#patterns = [];
    this.#patternsToIgnore = [];
    this.#direction = ZStrDirection.START;
    this.#next = this.emptyResult();
    this.#hasNextLoad = false;
    this.#finished = false;
  }

  sub(options: IZStrSearch): ZStrSearch {
    const caseSensitive = firstNotNull(options.caseSensitive, this.#caseSensitive);
    const builder = new ZStrSearchBuilder(options.string || this.#string, { caseSensitive });
    builder.patterns = options.patterns || this.#patterns;
    builder.patternsToIgnore = options.patternsToIgnore || this.#patternsToIgnore;
    builder.offset = options.offset || this.#offset;
    return builder.build();
  }

  hasNext(): boolean {
    if (this.#hasNextLoad) {
      return this.#next.valid;
    } else if (this.#finished) {
      return false;
    } else {
      this.#next = this.next();
      this.#hasNextLoad = true;
      return this.#next.valid;
    }
  }

  next(): ZStrSearchResult {
    if (this.#hasNextLoad) {
      this.#hasNextLoad = false;
      return this.#next;
    } else if (this.#finished) {
      this.#hasNextLoad = false;
      return this.emptyResult();
    } else {
      return this.findNext();
    }
  }

  list(): ZStrSearchResult[] {
    const result = [];
    while (this.hasNext()) {
      result.push(this.next());
    }
    return result;
  }

  reset() {
    this.#hasNextLoad = false;
    this.#finished = false;
    this.#offset = undefined;
    this.#next = this.emptyResult();
  }

  reverseDirection(): ZStrSearch {
    switch (this.#direction) {
      case ZStrDirection.START:
        this.#direction = ZStrDirection.END;
        break;
      case ZStrDirection.END:
        this.#direction = ZStrDirection.START;
        break;
    }
    return this;
  }

  private findNext(): ZStrSearchResult {
    let results = this.findPatterns(this.#patterns);
    const resultsToIgnore = this.findPatterns(this.#patternsToIgnore);
    results = this.removeResultsToIgnore(results, resultsToIgnore);
    if (results.length === 0 && resultsToIgnore.length > 0) {
      const bestResult = this.getBestResult(resultsToIgnore);
      this.#offset = this.nextOffset(bestResult);
      return this.findNext();
    } else {
      const bestResult = this.getBestResult(results);
      if (bestResult.valid) {
        this.#offset = this.nextOffset(bestResult);
        this.refreshFinished();
      } else {
        this.#finished = true;
      }
      return bestResult;
    }
  }

  private refreshFinished() {
    switch (this.direction) {
      case ZStrDirection.START:
        this.#finished = this.#offset === this.string.length;
        break;
      case ZStrDirection.END:
        this.#finished = this.#offset === -1;
        break;
      default:
        throw new UnsupportedOperationException();
    }
  }

  private nextOffset(result: ZStrSearchResult): number {
    switch (this.#direction) {
      case ZStrDirection.START:
        return result.end;
      case ZStrDirection.END:
        return result.start - 1;
      default:
        throw new UnsupportedOperationException();
    }
  }

  private sortResults(results: ZStrSearchResult[]): ZStrSearchResult[] {
    return results.sort((a, b) => {
      switch (this.#direction) {
        case ZStrDirection.START:
          return a.start - b.start;
        case ZStrDirection.END:
          return b.start - a.start;
        default:
          throw new UnsupportedOperationException();
      }
    });
  }

  private getBestResult(results: ZStrSearchResult[]): ZStrSearchResult {
    const sortedResults = this.sortResults(results);
    if (sortedResults.length === 0) {
      return this.emptyResult();
    } else {
      return sortedResults[0];
    }
  }

  private removeResultsToIgnore(results: ZStrSearchResult[], resultsToIgnore: ZStrSearchResult[]) {
    if (results.length > 0 && resultsToIgnore.length > 0) {
      return results.filter(r => !this.checkIfIgnoreResult(r, resultsToIgnore));
    }
    return results;
  }

  private checkIfIgnoreResult(result: ZStrSearchResult, resultsToIgnore: ZStrSearchResult[]) {
    for (const ignore of resultsToIgnore) {
      if (ignore.start <= result.start && result.start <= ignore.end) {
        return true;
      } else if (ignore.start <= result.end && result.end <= ignore.end) {
        return true;
      }
    }
    return false;
  }

  private findPatterns(patterns: string[]): ZStrSearchResult[] {
    const results = [];
    if (patterns) {
      for (const pattern of patterns) {
        const result = this.findPattern(pattern);
        if (result.valid) {
          results.push(result);
        }
      }
    }
    return results;
  }

  private findPattern(pattern: string): ZStrSearchResult {
    let index;
    switch (this.direction) {
      case ZStrDirection.START:
        index = this.source().indexOf(pattern, this.offset);
        return this.createResult(pattern, index);
      case ZStrDirection.END:
        index = this.source().lastIndexOf(pattern, this.offset);
        return this.createResult(pattern, index);
      default:
        throw new UnsupportedOperationException();
    }
  }

  private emptyResult(): ZStrSearchResult {
    return {
      start: 0,
      end: 0,
      pattern: '',
      valid: false,
      getFoundPattern: () => ''
    };
  }

  private createResult(pattern: string, start: number): ZStrSearchResult {
    if (start === -1) return this.emptyResult();
    const end = start + pattern.length;
    return {
      start,
      end,
      pattern,
      valid: start !== -1,
      getFoundPattern: this.createGetFoundPattern(start, end)
    };
  }

  private createGetFoundPattern(start: number, end: number): (string: string | ZStr) => string {
    return (string: string | ZStr) => {
      if (string instanceof ZStr) {
        const localString = string.toString();
        return localString.substring(start, end);
      } else {
        const localString: string = string as string;
        return localString.substring(start, end);
      }
    };
  }

  private treatString(localString: string): string {
    if (this.#caseSensitive) {
      return localString;
    } else {
      return localString.toLowerCase();
    }
  }

  private source(): string {
    if (!this.#source) {
      this.#source = this.treatString(this.#string);
    }
    return this.#source || '';
  }

  get string(): string {
    return this.#string;
  }

  set string(string: string) {
    this.reset();
    this.#string = string;
  }

  get caseSensitive(): boolean {
    return this.#caseSensitive;
  }

  set caseSensitive(caseSensitive: boolean) {
    this.reset();
    this.#caseSensitive = caseSensitive;
  }

  get patterns(): string[] {
    return this.#patterns;
  }

  set patterns(patterns: string[]) {
    this.reset();
    this.#patterns = patterns;
  }

  get patternsToIgnore(): string[] {
    return this.#patternsToIgnore;
  }

  set patternsToIgnore(patternsToIgnore: string[]) {
    this.reset();
    this.#patternsToIgnore = patternsToIgnore;
  }

  get direction(): ZStrDirection {
    return this.#direction;
  }

  set direction(direction: ZStrDirection) {
    this.reset();
    this.#direction = direction;
  }

  get offset(): number | undefined {
    return this.#offset;
  }

  set offset(offset: number | undefined) {
    this.reset();
    this.#offset = offset;
  }
}

export default ZStrSearch;
