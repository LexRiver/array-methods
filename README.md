# ArrayMethods

Methods for working with array

## Installation

`npm install @lex/array-methods`

## Import

```typescript
import {ArrayMethods} from '@lex/array-methods'

```

### ArrayMethods.subtractArrays 
This methods subtracts one array from another

```typescript
const bigArray = [1,2,3,4,5]
const smallArray = [1,2]
const result = ArrayMethods.subtractArrays(bigArray, smallArray)
// result is [3,4,5]
```