import ZStr from '../src/core/ZStr';

it('should split string', () => {
  const str = new ZStr('a,b,c,d');
  const result = str.split(',').asStringArray();

  expect(result).toStrictEqual(['a', 'b', 'c', 'd']);
});

it('should split names', () => {
  const str = new ZStr('Name: Edward; Name: Maria; Name: Sarah', { ignoreErrors: true });
  const names = str
    .batch()
    .from('Name:')
    .till(';')
    .split()
    .list()
    .trim()
    .asStringArray();

  expect(names).toStrictEqual(['Edward', 'Maria', 'Sarah']);
});
