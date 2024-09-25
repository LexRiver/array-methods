import { expect, test } from 'vitest'
import { ArrayMethods } from "./ArrayMethods.mjs"

test('sort array', () => {
    //TODO:
    let x = [
        {a:'aa'},
        {a:'ac'},
        {a:'ab', b:'bb'}
    ]
    ArrayMethods.sortArrayOfObjectsInPlace(x, {propertyName: 'a', asc: true})
    expect(x[0]['a']).toEqual('aa')
    expect(x[1]['a']).toEqual('ab')
    expect(x[2]['a']).toEqual('ac')

    ArrayMethods.sortArrayOfObjectsInPlace(x, {propertyName: 'a', asc: false})
    expect(x[0]['a']).toEqual('ac')
    expect(x[1]['a']).toEqual('ab')
    expect(x[2]['a']).toEqual('aa')

})

test('sort array of number values', () => {
    let x = [
        {a:1},
        {a:9},
        {a:90},
        {a:100},
        {a:8},
        {a:90}
    ]
    ArrayMethods.sortArrayOfObjectsInPlace(x, {propertyName: 'a', asc: true})
    expect(x).toEqual([{a:1},{a:8},{a:9},{a:90},{a:90},{a:100}])

    ArrayMethods.sortArrayOfObjectsInPlace(x, {propertyName: 'a', asc: false})
    expect(x).toEqual([{a:100},{a:90},{a:90},{a:9},{a:8},{a:1}])


})


test('one page from array', () => {
    let x = 'abcdefghijklmnopqrstuvwxyz'.split('')
    expect(ArrayMethods.getOnePageFromArray(x, 1, 3)).toEqual(['a', 'b', 'c'])
    expect(ArrayMethods.getOnePageFromArray(x, 2, 3)).toEqual(['d', 'e', 'f'])
    expect(ArrayMethods.getOnePageFromArray(x, 0, 3)).toEqual(['a', 'b', 'c'])
    expect(ArrayMethods.getOnePageFromArray(x, 3, 10)).toEqual('uvwxyz'.split(''))
    expect(ArrayMethods.getOnePageFromArray(x,30,3)).toEqual([])
})

test('countOfPages', () => {
    let x = [1,2,3,4,5,6,7,8,9]
    expect(ArrayMethods.getCountOfPages(x, 3)).toEqual(3)
    expect(ArrayMethods.getCountOfPages(x, 5)).toEqual(2)
    //expect(ArrayMethods.getCountOfPages(x, 5.5)).toEqual(2)
    expect(ArrayMethods.getCountOfPages(x, 9)).toEqual(1)
    expect(ArrayMethods.getCountOfPages(x, 10)).toEqual(1)
})

test('sort array by few properties', () => {
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
    console.log('x=', x)
    expect(result).toEqual([
        {a:1, b:1},
        {a:1, b:1},
        {a:1, b:2},
        {a:1, b:5},
        {a:2, b:1},
        {a:3, b:2},
    ])
    

})

test('remove duplicates from array of objects', () => {
    let x = [
        {a:1, b:1},
        {a:2, b:2},
        {a:2, b:22},
        {a:3, b:3},
        {a:3, b:33},
        {a:3, b:333}
    ]
    let resultArray = ArrayMethods.removeDuplicatesFromArray(x, (a,b) => a.a === b.a)
    console.log('resultArray=', resultArray)

    expect(resultArray.length).toEqual(3)
})

test('remove duplicates from array', () => {
    let x = [1,1,1,2,2,2,3,3,3]
    expect(ArrayMethods.removeDuplicatesFromArray(x)).toEqual([1,2,3])
})

test('subtract arrays', () => {
    expect(ArrayMethods.subtractArrays([1,2,3,4,5], [1,2])).toEqual([3,4,5])
    expect(ArrayMethods.subtractArrays([1,2,3], [1,2,3,4,5])).toEqual([])
})

test('subtract array of objects', () => {
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
    expect(ArrayMethods.subtractArrays(big, small, (a,b) => a.a === b.a)).toEqual([
        {a:1, b:1},
        {a:3, b:3}
    ])
})

test('flatten', () => {
    const myArray = [1,2,[3,4,[5,6]]]
    const result = ArrayMethods.flattenArray(myArray)
    expect(result).toEqual([1,2,3,4,5,6])
})

test('getAsFlatArray', () => {
    const result = ArrayMethods.getAsFlatArray(1,2,[3,4,[5,6]])
    expect(result).toEqual([1,2,3,4,5,6])
})