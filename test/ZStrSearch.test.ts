import ZStr from '../src/core/ZStr';

it('should search a text', () => {
  const source = 'a, b, c';
  const search = new ZStr(source).search(',');
  const result = search.list().map(r => r.start);
  expect(result).toStrictEqual([1, 4]);
});

it('should search a text with 2 patterns', () => {
  const source = 'a, b; c';
  const search = new ZStr(source).search([',', ';']);
  const result = search.list().map(r => r.start);
  expect(result).toStrictEqual([1, 4]);
});

it('should search a text with 2 patterns by end', () => {
  const source = 'a, b; c';
  const search = new ZStr(source).search([',', ';']);
  search.reverseDirection();
  const result = search.list().map(r => r.start);
  expect(result).toStrictEqual([4, 1]);
});

it('should check string of search', () => {
  const source = 'a, b, c';
  const search = new ZStr(source).search(',');
  expect(search.string).toBe(source);
});

it('should search 2 commas', () => {
  const source = '1,,2';
  const search = new ZStr(source).search(',');
  const result = search.list().map(r => r.start);
  expect(result).toStrictEqual([1, 2]);
});

it('should search 2 commas by end', () => {
  const source = '1,,2';
  const search = new ZStr(source).search(',');
  search.reverseDirection();
  const result = search.list().map(r => r.start);
  expect(result).toStrictEqual([2, 1]);
});

it('should search case sensitive', () => {
  const source = 'abc1Abc2aBc';
  const search = new ZStr(source).search('abc');
  const result = search.list().map(r => r.start);
  expect(result).toStrictEqual([0]);
});

it('should search case insensitive', () => {
  const source = 'abc1Abc2aBc';
  const search = new ZStr(source, { caseSensitive: false }).search('abc');
  const result = search.list().map(r => r.start);
  expect(result).toStrictEqual([0, 4, 8]);
});

it('should search case insensitive', () => {
  const source = 'abc1Abc2aBc';
  const search = new ZStr(source, { caseSensitive: false }).search('abc');
  const results = search.list();
  const result = results.map(r => r.getFoundPattern(source));
  expect(result).toStrictEqual(['abc', 'Abc', 'aBc']);
});

it('should search case insensitive by end', () => {
  const source = 'abc1Abc2aBc';
  const search = new ZStr(source, { caseSensitive: false }).search('abc');
  search.reverseDirection();
  const results = search.list();
  const result = results.map(r => r.getFoundPattern(source));
  expect(result).toStrictEqual(['aBc', 'Abc', 'abc']);
});

it('should search and ignore', () => {
  const source = 'abc, def;, ghi';
  const search = new ZStr(source).search([','], [';,']);
  const results = search.list();
  const result = results.map(r => r.start);
  expect(result).toStrictEqual([3]);
});

it('should search and ignore by end', () => {
  const source = 'abc, def;, ghi';
  const search = new ZStr(source).search([','], [';,']);
  search.reverseDirection();
  const results = search.list();
  const result = results.map(r => r.start);
  expect(result).toStrictEqual([3]);
});

it('should search a string', () => {
  const source = 'Name: Edward; Age:: 15';
  const search = new ZStr(source).search([':'], ['::']);
  const results = search.list();

  const indices = results.map(r => r.start);
  expect(indices).toStrictEqual([4]);
});
