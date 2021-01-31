import ZStr from './ZStr';

interface ZStrSearchResult {
  valid: boolean;
  pattern: string;
  start: number;
  end: number;
  getFoundPattern(string: string | ZStr): string;
}

export default ZStrSearchResult;
