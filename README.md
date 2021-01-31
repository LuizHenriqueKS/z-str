# z-str
A lib to easily manipulate strings

# Installation

```
  npm i z-str
```

# Usage

## Javascript

```javascript
  const ZStr = require('z-str');

  const myString = 'aBcdefg dgf dxf';
  const str = new ZStr(myString, {caseSensitive: false});

  console.log('Bcd', str.from('a').till('e').toString());
  console.log('x', str.fromLast('d').tillLast('f').toString());
  console.log(true, str.startsWith('abc'));
  console.log(str.search('b'));
  console.log(['e', 'g','x'], str.batch().from('d').till('f').split().asArray());
```

## Typescript

```typescript
  import ZStr from 'z-str';

  const str = new ZStr('aBcdefg', {caseSensitive: false});

  console.log('Bcd', str.from('a').till('e').toString());
  console.log('x', str.fromLast('d').tillLast('f').toString());
  console.log(true, str.startsWith('abc'));
  console.log(str.search('b'));
  console.log(['e', 'g','x'], str.batch().from('d').till('f').split().asArray());
```

# Summary 

[Constructor](#constructor)
[isEmpty](#is-empty)
[sub](#sub)
[equals](#equals)
[substr](#substr)
[substring](#substring)
[containsAny](#contains-any)
[containsAll](#contains-all)
[findFirst](#find-first)
[findLast](#find-last)
[from](#from)
[fromLast](#from-last)
[till](#till)
[tillLast](#till-last)

# Constructor

```typescript
  new ZStr(string, options);
```

Default values of `options`:
```json
  {
    caseSensitive: true,
    inclusive: false,
    ignoreNotFoundPatterns: false
  }
```

# Is empty

```typescript
  console.log(new ZStr('').isEmpty()); //true
  console.log(new ZStr('abc').isEmpty()); //false
```

# Sub

Create a new ZStr with other options:

`str.sub(options)`

```typescript
  const str = new ZStr('Abc');
  const sub = str.sub({caseSensitive: false});

  console.log(str.equals('abc')); //false
  console.log(sub.equals('abc')); //true
```

# Equals

Compare two strings

`str.equals(otherString: string | ZStr)`

```typescript
  const a = new ZStr('a');
  const b = new ZStr('A', {caseSensitive: false});

  console.log(a.equals('a')); //true
  console.log(a.equals('A')); //false

  console.log(b.equals('a')); //true
  console.log(b.equals('A')); //true
  
  console.log(a.equals(b)); //false
  console.log(b.equals(a)); //true
```

# Search

`str.search(patterns: string|string[], patternsToIgnore?: string[])` 

## Example 1
```typescript

  const source = 'Name: Edward; Age:: 15';
  const search = new ZStr(source).search(':');
  const results = search.list();
  console.log(results);

```

### Output
```json
  [
    {
      start: 4,
      end: 5,
      pattern: ':',
      valid: true,
      getFoundPattern: [Function]
    },
    {
      start: 17,
      end: 18,
      pattern: ':',
      valid: true,
      getFoundPattern: [Function]
    },
    {
      start: 18,
      end: 19,
      pattern: ':',
      valid: true,
      getFoundPattern: [Function]
    }
  ]
```

## Example 2
```typescript

  const source = 'Name: Edward; Age:: 15';
  const search = new ZStr(source).search([':'], ['::']);
  const results = search.list();
  console.log(results);

```

### Output
```json
  [
    {
      start: 4,
      end: 5,
      pattern: ':',
      valid: true,
      getFoundPattern: [Function]
    }
  ]
```

## Example 3
```typescript

  const source = 'Name: Edward; Age:: 15';
  const search = new ZStr(source).search([':'], ['::']);
  while (search.hasNext()){
    console.log(search.next().start);
  }

```

### Output
```
  4
  17
  18
```

## Example 4 - com reverseDirection()
```typescript

  const source = 'Name: Edward; Age:: 15';
  const search = new ZStr(source).search([':'], ['::']);
  search.reverseDirection();
  while (search.hasNext()){
    console.log(search.next().start);
  }

```

### Output
```
  18
  17
  4
```

# Substr

`str.substr(start: number, length?: number)`

```typescript
  const str = new ZStr('abcdef');
  console.log(str.substr(3, 1).toString()); //d
```

# Substring

`str.substring(start: number, end?: number)`

```typescript
  const str = new ZStr('abcdef');
  console.log(str.substring(3, 5)).toString(); //de
```

# Contains any

`str.containsAny(patterns: string|string[], patternsToIgnore: string[])`

```typescript
  const str = new ZStr('abc');

  coonsole.log(str.containsAny(['e','a'])); //true
  coonsole.log(str.containsAny(['e','f'])); //false
```

# Contains all

`str.containsAll(patterns: string|string[], patternsToIgnore: string[])`

```typescript
  const str = new ZStr('abc');

  coonsole.log(str.containsAll(['b','a'])); //true
  coonsole.log(str.containsAll(['a','e'])); //false
```

# Find first

`str.findFirst(patterns: string|string[], patternsToIgnore: string[])`

```typescript
  const str = new ZStr('abc:def:ghi');

  coonsole.log(str.findFirst([':'])); 
```

Output:
```json
  {
    start: 3,
    end: 4,
    pattern: ':',
    valid: true,
    getFoundPattern: [Function]
  }
```

## Don't found

Example:
```typescript
  const str = new ZStr('abc:def:ghi');

  coonsole.log(str.findFirst(['::'])); 
```

Output:
```json
  {
    start: 0,
    end: 0,
    pattern: '',
    valid: false,
    getFoundPattern: [Function: getFoundPattern]
  }
```

# Find last

`str.findLast(patterns: string|string[], patternsToIgnore: string[])`

```typescript
  const str = new ZStr('abc:def:ghi');

  coonsole.log(str.findLast([':'])); 
```

Output:
```json
  {
    start: 7,
    end: 8,
    pattern: ':',
    valid: true,
    getFoundPattern: [Function]
  }
```

# From

`str.from(patterns: string|string[], patternsToIgnore: string[])`

Example 1
```typescript
  const str = new ZStr('abc->def<-ghi');

  coonsole.log(str.from('->').toString())); //def<-ghi
```

Example 2
```typescript
  const str = new ZStr('abc->def<-ghi', {inclusive: true});

  coonsole.log(str.from('->').toString())); //->def<-ghi
```

# From last

`str.fromLast(patterns: string|string[], patternsToIgnore: string[])`

```typescript
  const str = new ZStr('abc->->def<-ghi');

  coonsole.log(str.fromLast('->').toString())); //def<-ghi
```

# Till

`str.till(patterns: string|string[], patternsToIgnore: string[])`

Example 1
```typescript
  const str = new ZStr('abc->def<-<-ghi');

  coonsole.log(str.till('<-').toString())); //abc->def
```

Example 2
```typescript
  const str = new ZStr('abc->def<-<-ghi', {inclusive: true});

  coonsole.log(str.till('<-').toString())); //abc->def<-
```

# Till last

`str.tillLast(patterns: string|string[], patternsToIgnore: string[])`

```typescript
  const str = new ZStr('abc->def<-<-ghi', {inclusive: true});

  coonsole.log(str.tillLast('<-').toString())); //abc->def<-<-
```