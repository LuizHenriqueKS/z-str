import ZStr from './ZStr';

class ZStrList extends Array<ZStr> {
  trim(): ZStrList {
    for (let i = 0; i < this.length; i++) {
      const str = this[i];
      this[i] = str.trim();
    }
    return this;
  }

  asStringArray(): string[] {
    const result: string[] = [];
    for (const item of this) {
      result.push(item.toString());
    }
    return result;
  }
}

export default ZStrList;
