import ZStr from './ZStr';

interface ZStrSearchResult {
  pattern: string;
  start: number;
  end: number;
  valid: boolean;
  getFoundPattern(string: string | ZStr): string;
}

export default ZStrSearchResult;
