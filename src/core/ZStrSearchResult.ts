import ZStr from './ZStr';

abstract class ZStrSearchResult {
  valid!: boolean;
  pattern!: string;
  start!: number;
  end!: number;
  abstract getFoundPattern(string: string | ZStr): string;
}

export default ZStrSearchResult;
