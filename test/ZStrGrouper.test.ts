import ZStr from '../src/core/ZStr';

it('should batch a string to group', () => {
  const source = 'Name: Edward; Age: 20; Name: Maria; Age: 25; Name: Sarah; Age: 30';
  const str = new ZStr(source, { ignoreErrors: true });

  const groups = str
    .batch()
    .caseSensitive(false)
    .exclusive()
    .from('name')
    .fromIndex(1)
    .inclusive()
    .till(';')
    .tillIndex(-1)
    .exclusive()
    .trim()
    .name('name')
    .from('age:')
    .exclusive()
    .till(';')
    .trim()
    .name('age')
    .group()
    .list();

  expect(groups).toStrictEqual([
    { name: 'Edward', age: '20' },
    { name: 'Maria', age: '25' },
    { name: 'Sarah', age: '30' }
  ]);
});

it('should batch a string to group by end', () => {
  const source = 'Name: Edward; Age: 20; Name: Maria; Age: 25; Name: Sarah; Age: 30;';
  const str = new ZStr(source, { caseSensitive: false, ignoreErrors: true });

  const groups = str
    .batch()
    .reverseDirection()
    .tillLast(';')
    .fromLast('age: ')
    .name('age')
    .tillLast(';')
    .fromLast('name: ')
    .name('name')
    .group()
    .list();

  expect(groups).toStrictEqual([
    { age: '30', name: 'Sarah' },
    { age: '25', name: 'Maria' },
    { age: '20', name: 'Edward' }
  ]);
});

it('should batch a string like split', () => {
  const source = 'Edward, Maria; Sarah';
  const str = new ZStr(source);

  const group = str
    .batch()
    .till([',', ';'])
    .trim()
    .group();

  const result = group.list();
  result.push({ default: group.rest.trim().toString() });

  expect(result).toStrictEqual([
    { default: 'Edward' },
    { default: 'Maria' },
    { default: 'Sarah' }
  ]);
});
