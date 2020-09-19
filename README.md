# ArrayMethods

Methods for working with array:
* flatten
* shuffle
* sort array of object by different object properties
* get one page (slice) from array
* remove duplicates
* subtract arrays

## Installation

`npm install @lexriver/array-methods`

## Import

```typescript
import {ArrayMethods} from '@lexriver/array-methods'

```

## Methods


### ArrayMethods.shuffleArrayInPlace(array:any[])
```typescript
ArrayMethods.shuffleArrayInPlace(myArray)
```

---

### ArrayMethods.flattenArray(array:any[])
Recursively flatten any array. Returns new array.

```typescript
const myArray = [1, 2, [3, 4, [5, 6]]]
const result = ArrayMethods.flattenArray(myArray)
// result = [1, 2, 3, 4, 5, 6]
```

---

### ArrayMethods.getAsFlatArray(...x:any)
Convert all arguments to array and recursively flatten it

```typescript
const result = ArrayMethods.getAsFlatArray('x', ['a', 1])
// result = ['x', 'a', 1]
```

```typescript
const result = ArrayMethods.getAsFlatArray(1, 2, [3, 4, [5, 6]])
// result = [1, 2, 3, 4, 5, 6]
```

---

### ArrayMethods.sortArrayOfObjectsInPlace(array:T[], sortBy:SortBy)

Sort array of object in place.

__Parameters__
* `array: T[]` - any array
* `sortBy`: Object with following properties
    * `propertyName: keyof T` - property name as string to sort by
    * `asc: boolean` - true for ascending, else 
    * `locale?: string` - optional locale, ex: 'en-US', or 'en', see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
    * `parseStringToDate?: boolean` - if true, property value be parsed to date. Use this option for sort by date which is stored as a string.


__Example__
```typescript
let x = [
    {a:'aa'},
    {a:'ac'},
    {a:'ab', b:'bb'}
]

ArrayMethods.sortArrayOfObjectsInPlace(x, {propertyName: 'a', asc: true})    
/*
     x = [
        {a:'aa'},
        {a:'ab', b:'bb'},
        {a:'ac'},
    ]
*/

ArrayMethods.sortArrayOfObjectsInPlace(x, {propertyName: 'a', asc: false})
/*
     x = [
        {a:'ac'},
        {a:'ab', b:'bb'},
        {a:'aa'},
    ]
*/
```

---

### ArrayMethods.sortArrayOfObjectsByFewProperties(array:T[], sortBy:Array<SortBy<T>>)

Returns a new array sorted by few properties

```typescript
let x = [
    {a:1, b:1},
    {a:1, b:2},
    {a:2, b:1},
    {a:3, b:2},
    {a:1, b:1},
    {a:1, b:5}
]
const result = ArrayMethods.sortArrayOfObjectsByFewProperties(x, [
    {propertyName:'a', asc:true},
    {propertyName:'b', asc:true}
])
/* result =
[
    {a:1, b:1},
    {a:1, b:1},
    {a:1, b:2},
    {a:1, b:5},
    {a:2, b:1},
    {a:3, b:2},
]
*/
```

---

### ArrayMethods.getOnePageFromArray(array:any[], pageNumber:number, countOfItemsPerPage:number)

Returns a shallow copy of a portion of an array into a new array

__Parameters__
* `array: any[]` - any array
* `pageNumber: number` - page number starting from 1
* `countOfItemsPerPage: number` - count of items per page

__Example__
```typescript
let x = 'abcdefghijkl'.split('')
const result = ArrayMethods.getOnePageFromArray(x, 2, 3)
// result = ['d', 'e', 'f']

```

---

### ArrayMethods.getCountOfPages(array:any[], countOfItemsPerPage:number)

Returns total count of pages in array

__Parameters__
* `array: any[]` - any array
* `countOfItemsPerPage: number` - positive number

__Example__
```typescript
const x = [1,2,3,4,5,6,7,8,9]
const result = ArrayMethods.getCountOfPages(x, 3)
// result = 3
```

```typescript
const x = [1,2,3,4,5,6,7,8,9]
const result = ArrayMethods.getCountOfPages(x, 5)
// result = 2 
```

---

### ArrayMethods.removeDuplicatesFromArray(array:T[], checkIfSame?:(a:T, b:T) => boolean)

Returns new array without duplicates

__Parameters__
* `array: T[]` - any array
* `checkIfSame?:(a:T, b:T) => boolean` - function to check if two items are same

__Example__
```typescript
const result = ArrayMethods.removeDuplicatesFromArray([1,1,1,2,2,2,3,3,3])
// result = [1,2,3]
```
```typescript
let x = [
    {a:1, b:1},
    {a:2, b:2},
    {a:2, b:22},
    {a:3, b:3},
    {a:3, b:33},
    {a:3, b:333}
]

const result = ArrayMethods.removeDuplicatesFromArray(x, (a,b) => a.a === b.a)
/* 
result = [
        { a: 1, b: 1 }, 
        { a: 2, b: 2 }, 
        { a: 3, b: 3 }
    ]
*/
```

---

### ArrayMethods.subtractArrays<T>(big:T[], small:T[], checkIfSame?:(a:T, b:T)=>boolean)

Returns new array that equals bigArray without elements from smallArray

```typescript
const bigArray = [1,2,3,4,5]
const smallArray = [1,2]
const result = ArrayMethods.subtractArrays(bigArray, smallArray)
// result = [3,4,5]
```
```typescript
const big = [
    {a:1, b:1},
    {a:2, b:2},
    {a:3, b:3},
    {a:4, b:4}
]
const small = [
    {a:2, b:2},
    {a:4, b:44}
]
const result = ArrayMethods.subtractArrays(big, small, (a,b) => a.a === b.a)
/* result = 
[
    {a:1, b:1},
    {a:3, b:3}
]
*/
```
