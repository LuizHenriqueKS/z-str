import ZStr from '../src/core/ZStr';

it('should convert ZStr to String', () => {
  const source = 'Abc';
  const str = new ZStr(source);
  expect(str.toString()).toBe(source);
});

it('should create a new instance of ZStr', () => {
  const source = 'aBc';
  const str = new ZStr(source);
  expect(str.containsAny('b')).toBeFalsy();
  expect(str.sub({ caseSensitive: false }).containsAny('b')).toBeTruthy();
});

it('should check if string is empty', () => {
  expect(new ZStr('').isEmpty()).toBeTruthy();
  expect(new ZStr('abc').isEmpty()).toBeFalsy();
});

it('should compare two strings', () => {
  const a = new ZStr('a');
  const b = new ZStr('A', { caseSensitive: false });

  expect(a.equals('a')).toBeTruthy();
  expect(a.equals('A')).toBeFalsy();

  expect(b.equals('a')).toBeTruthy();
  expect(b.equals('A')).toBeTruthy();

  expect(a.equals(b)).toBeFalsy();
  expect(b.equals(a)).toBeTruthy();
});

it('should substr string', () => {
  const str = new ZStr('abcdef');
  expect(str.substr(3, 1).toString()).toBe('d');
});

it('should substring string', () => {
  const str = new ZStr('abcdef');
  expect(str.substring(3, 5).toString()).toBe('de');
});

it('should test containsAny', () => {
  const str = new ZStr('abcdef');
  expect(str.containsAny(['e'])).toBeTruthy();
  expect(str.containsAny(['g'])).toBeFalsy();
});

it('should test containsAll', () => {
  const str = new ZStr('abcdef');
  expect(str.containsAll(['e', 'a'])).toBeTruthy();
  expect(str.containsAll(['e', 'g'])).toBeFalsy();
});

it('should find first', () => {
  const str = new ZStr('abc:def:ghi');
  expect(str.findFirst(':').start).toBe(3);
});

it('should find last', () => {
  const str = new ZStr('abc:def:ghi');
  expect(str.findLast(':').start).toBe(7);
});

it("shouldn't find first", () => {
  const str = new ZStr('abc:def:ghi');
  expect(str.findLast('::').valid).toBeFalsy();
});

it('should substring a string by start', () => {
  const str = new ZStr('abc->def<-ghi');
  expect(str.from('->').toString()).toBe('def<-ghi');
  expect(str.sub({ inclusive: true }).from('->').toString()).toBe('->def<-ghi');
  expect(str.sub({ ignoreErrors: true }).from('kkk').toString()).toBe(str.toString());
});

it('should substring a string by end', () => {
  const str = new ZStr('abc->->def<-ghi');
  expect(str.fromLast('->').toString()).toBe('def<-ghi');
});

it('should crop a string by start', () => {
  const str = new ZStr('abc->def<-<-ghi');
  expect(str.till('<-').toString()).toBe('abc->def');
  expect(str.sub({ inclusive: true }).till('<-').toString()).toBe('abc->def<-');
  expect(str.sub({ ignoreErrors: true }).till('kkk').toString()).toBe(str.toString());
});

it('should crop a string by end', () => {
  const str = new ZStr('abc->def<-<-ghi', { inclusive: true });
  expect(str.tillLast('<-').toString()).toBe('abc->def<-<-');
});

it('should test if a string startsWith', () => {
  const str = new ZStr('aBcdEf');
  expect(str.startsWith('aB')).toBeTruthy();
  expect(str.startsWith('ab')).toBeFalsy();

  const sub = str.sub({ caseSensitive: false });
  expect(sub.startsWith('aB')).toBeTruthy();
  expect(sub.startsWith('ab')).toBeTruthy();
});

it('should test if a string endsWith', () => {
  const str = new ZStr('aBcdEf');
  expect(str.endsWith('Ef')).toBeTruthy();
  expect(str.endsWith('ef')).toBeFalsy();

  const sub = str.sub({ caseSensitive: false });
  expect(sub.endsWith('Ef')).toBeTruthy();
  expect(sub.endsWith('ef')).toBeTruthy();
});

it('should substr a string from', () => {
  const str = new ZStr('123Abc');

  expect(str.fromIndex(3).toString()).toBe('Abc');
  expect(str.fromIndex(-2).toString()).toBe('bc');
});

it('should substr a string till', () => {
  const str = new ZStr('123Abc');

  expect(str.tillIndex(3).toString()).toBe('123');
  expect(str.tillIndex(-2).toString()).toBe('123A');
});
