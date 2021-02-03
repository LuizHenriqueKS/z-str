# z-str
A lib to easily manipulate strings

# Installation

```
  npm i z-str
```

# Usage

## Javascript

```javascript
  const { ZStr } = require('z-str');

  const myString = 'aBcdefg dgf dxf';
  const str = new ZStr(myString, {caseSensitive: false});

  console.log(str.from('a').till('e').toString()); //Bcd
  console.log(str.fromLast('d').tillLast('f').toString()); //x
  console.log(str.startsWith('abc')); //true
  console.log(str.search('b').next());
  console.log(str.batch().from('d').till('f').split().list().asStringArray()); //['e', 'g', 'x']
```

## Typescript

```typescript
  import { ZStr } from 'z-str';

  const myString = 'aBcdefg dgf dxf';
  const str = new ZStr(myString, {caseSensitive: false});

  console.log(str.from('a').till('e').toString()); //Bcd
  console.log(str.fromLast('d').tillLast('f').toString()); //x
  console.log(str.startsWith('abc')); //true
  console.log(str.search('b').next());
  console.log(str.batch().from('d').till('f').split().list().asStringArray()); //['e', 'g', 'x']
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
[startsWith](#starts-with)
[endsWith](#ends-with)
[batch](#batch)
[fromIndex](#from-index)
[tillIndex](#till-index)
[split](#split)
[trim](#trim)
[trimStart](#trim-start)
[trimEnd](#trim-end)

# Constructor

```typescript
  new ZStr(string, options);
```

Default values of `options`:
```javascript
  {
    caseSensitive: true,
    inclusive: false,
    ignoreErrors: false
  }
```

# Is empty

```typescript
  str.isEmpty(): boolean;
```

```typescript
  console.log(new ZStr('').isEmpty()); //true
  console.log(new ZStr('abc').isEmpty()); //false
```

# Sub

Create a new ZStr with other options:

```typescript
  str.sub(options): ZStr;
```

```typescript
  const str = new ZStr('Abc');
  const sub = str.sub({caseSensitive: false});

  console.log(str.equals('abc')); //false
  console.log(sub.equals('abc')); //true
```

# Equals

Compare two strings


```typescript
  str.equals(otherString: string | ZStr): boolean;
```

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


```typescript
  str.search(patterns: string|string[], patternsToIgnore?: string[]): ZStrSearch;
```

## Example 1
```typescript

  const source = 'Name: Edward; Age:: 15';
  const search = new ZStr(source).search(':');
  const results = search.list();
  console.log(results);

```

### Output
```javascript
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
```javascript
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


```typescript
str.substr(start: number, length?: number): ZStr;
```

```typescript
  const str = new ZStr('abcdef');
  console.log(str.substr(3, 1).toString()); //d
```

# Substring

```typescript
str.substring(start: number, end?: number): ZStr;
```

```typescript
  const str = new ZStr('abcdef');
  console.log(str.substring(3, 5)).toString(); //de
```

# Contains any

```typescript
str.containsAny(patterns: string | string[], patternsToIgnore: string[]): boolean;
```

```typescript
  const str = new ZStr('abc');

  console.log(str.containsAny(['e','a'])); //true
  console.log(str.containsAny(['e','f'])); //false
```

# Contains all


```typescript
str.containsAll(patterns: string | string[], patternsToIgnore: string[]): boolean;
```

```typescript
  const str = new ZStr('abc');

  console.log(str.containsAll(['b','a'])); //true
  console.log(str.containsAll(['a','e'])); //false
```

# Find first

```typescript
str.findFirst(patterns: string|string[], patternsToIgnore: string[]): ZStrSearchResult;
```

```typescript
  const str = new ZStr('abc:def:ghi');

  console.log(str.findFirst([':'])); 
```

Output:
```javascript
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

  console.log(str.findFirst(['::'])); 
```

Output:
```javascript
  {
    start: 0,
    end: 0,
    pattern: '',
    valid: false,
    getFoundPattern: [Function: getFoundPattern]
  }
```

# Find last

```typescript
str.findLast(patterns: string|string[], patternsToIgnore: string[]): ZStrSearchResult;
```

```typescript
  const str = new ZStr('abc:def:ghi');

  console.log(str.findLast([':'])); 
```

Output:
```javascript
  {
    start: 7,
    end: 8,
    pattern: ':',
    valid: true,
    getFoundPattern: [Function]
  }
```

# From

```typescript
str.from(patterns: string|string[], patternsToIgnore: string[]): ZStr;
```

Example 1
```typescript
  const str = new ZStr('abc->def<-ghi');

  console.log(str.from('->').toString())); //def<-ghi
```

Example 2
```typescript
  const str = new ZStr('abc->def<-ghi', {inclusive: true});

  console.log(str.from('->').toString())); //->def<-ghi
```

# From last

```typescript
str.fromLast(patterns: string|string[], patternsToIgnore: string[]): ZStr;
```

```typescript
  const str = new ZStr('abc->->def<-ghi');

  console.log(str.fromLast('->').toString())); //def<-ghi
```

# Till

```typescript
str.till(patterns: string|string[], patternsToIgnore: string[]): ZStr;
```

Example 1
```typescript
  const str = new ZStr('abc->def<-<-ghi');

  console.log(str.till('<-').toString())); //abc->def
```

Example 2
```typescript
  const str = new ZStr('abc->def<-<-ghi', {inclusive: true});

  console.log(str.till('<-').toString())); //abc->def<-
```

# Till last

```typescript
tr.tillLast(patterns: string|string[], patternsToIgnore: string[]): ZStr;
```

```typescript
  const str = new ZStr('abc->def<-<-ghi', {inclusive: true});

  console.log(str.tillLast('<-').toString())); //abc->def<-<-
```

# Starts with

```typescript
tr.startsWith(patterns: string|string[], patternsToIgnore: string[]): ZStr;
```

```typescript
  const str = new ZStr('aBcdEf');

  console.log(str.startsWith('aBc')); //true
  console.log(str.startsWith(['eFg','aBc'])); //true
  console.log(str.startsWith('abc')); //false
  console.log(str.sub({caseSensitive: false}).startsWith('abc')); //true
```

# Ends with

```typescript
str.endsWith(patterns: string|string[], patternsToIgnore: string[]): ZStr;
```

```typescript
  const str = new ZStr('aBcdEf');

  console.log(str.endsWith('Ef')); //true
  console.log(str.endsWith(['zzz','dEf'])); //true
  console.log(str.endsWith('def')); //false
  console.log(str.sub({caseSensitive: false}).endsWith('def')); //true
```

# Batch

```typescript
  str.batch(): ZStrBatch;
```

```typescript
  const str = new ZStr('Name: Edward; Age: 20; Name: Maria; Age: 25');

  const names1 = str.batch().from("Name: ").till(";").split().asStringArray();

  const names2 = str.batch().caseSensitive(false).from("name:").inclusive().till(";").split().list().trim().asStringArray();

  console.log(names1); //['Edward', 'Maria']
  console.log(names2); //['Edward;', 'Maria;']
)
```

```typescript
  const str = new ZStr('Name: Edward; Age: 20; Name: Maria; Age: 25');

  const persons = str.batch().from('Name:').till(';').trim().name('name').from('Age:').till(';').trim().name('age').group().list();

  console.log(persons); //[{name: 'Edward', age: '20'}, {name: 'Maria', age: '25'}]
```

# From index
```typescript
  str.fromIndex(index: number): ZStr;
```

```typescript
  const str = new ZStr('123Abc');

  console.log(str.fromIndex(3).toString()); //Abc
  console.log(str.fromIndex(-2).toString()); //bc
```

# Till index

```typescript
  str.tillIndex(index: number): ZStr;
```

```typescript
  const str = new ZStr('123Abc');

  console.log(str.tillIndex(3).toString()); //123
  console.log(str.tllIndex(-2).toString()); //123A
```

# Split

```typescript
  str.split(patterns: string | string[], pattersToIgnore?: string[]): ZStrSplitter;
```

```typescript
  const str = new ZStr('Edward,Maria;Sarah');

  console.log(str.split([',',';']).asStringArray())); //['Edward', 'Maria', 'Sarah']

```

# Trim

```typescript
  str.trim(): ZStr;
```

# Trim start

```typescript
  str.trimStart(): ZStr;
```

# Trim end

```typescript
  str.trimEnd(): ZStr;
```