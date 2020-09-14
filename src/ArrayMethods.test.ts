import { ArrayMethods } from "./ArrayMethods"

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

test('sort array by few properties', () => {
    let x = [
        {a:1, b:1},
        {a:1, b:2},
        {a:2, b:1},
        {a:3, b:2},
        {a:1, b:1},
        {a:1, b:5}
    ]
    ArrayMethods.sortArrayOfObjectsByFewProperties(x, [
        {propertyName:'a', asc:true},
        {propertyName:'b', asc:true}
    ])
    console.log('x=', x)

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
    expect(ArrayMethods.removeDuplicatesFromArray(x).length).toEqual(3)
})

test('subtract arrays', () => {
    expect(ArrayMethods.subtractArrays([1,2,3,4,5], [1,2])).toEqual([3,4,5])
    expect(ArrayMethods.subtractArrays([1,2,3], [1,2,3,4,5])).toEqual([])
})
