"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayMethods_1 = require("./ArrayMethods");
test('sort array', function () {
    //TODO:
    var x = [
        { a: 'aa' },
        { a: 'ac' },
        { a: 'ab', b: 'bb' }
    ];
    ArrayMethods_1.ArrayMethods.sortArrayOfObjectsInPlace(x, { propertyName: 'a', asc: true });
    expect(x[0]['a']).toEqual('aa');
    expect(x[1]['a']).toEqual('ab');
    expect(x[2]['a']).toEqual('ac');
    ArrayMethods_1.ArrayMethods.sortArrayOfObjectsInPlace(x, { propertyName: 'a', asc: false });
    expect(x[0]['a']).toEqual('ac');
    expect(x[1]['a']).toEqual('ab');
    expect(x[2]['a']).toEqual('aa');
});
test('sort array of number values', function () {
    var x = [
        { a: 1 },
        { a: 9 },
        { a: 90 },
        { a: 100 },
        { a: 8 },
        { a: 90 }
    ];
    ArrayMethods_1.ArrayMethods.sortArrayOfObjectsInPlace(x, { propertyName: 'a', asc: true });
    expect(x).toEqual([{ a: 1 }, { a: 8 }, { a: 9 }, { a: 90 }, { a: 90 }, { a: 100 }]);
    ArrayMethods_1.ArrayMethods.sortArrayOfObjectsInPlace(x, { propertyName: 'a', asc: false });
    expect(x).toEqual([{ a: 100 }, { a: 90 }, { a: 90 }, { a: 9 }, { a: 8 }, { a: 1 }]);
});
test('one page from array', function () {
    var x = 'abcdefghijklmnopqrstuvwxyz'.split('');
    expect(ArrayMethods_1.ArrayMethods.getOnePageFromArray(x, 1, 3)).toEqual(['a', 'b', 'c']);
    expect(ArrayMethods_1.ArrayMethods.getOnePageFromArray(x, 2, 3)).toEqual(['d', 'e', 'f']);
    expect(ArrayMethods_1.ArrayMethods.getOnePageFromArray(x, 0, 3)).toEqual(['a', 'b', 'c']);
    expect(ArrayMethods_1.ArrayMethods.getOnePageFromArray(x, 3, 10)).toEqual('uvwxyz'.split(''));
    expect(ArrayMethods_1.ArrayMethods.getOnePageFromArray(x, 30, 3)).toEqual([]);
});
test('sort array by few properties', function () {
    var x = [
        { a: 1, b: 1 },
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 3, b: 2 },
        { a: 1, b: 1 },
        { a: 1, b: 5 }
    ];
    ArrayMethods_1.ArrayMethods.sortArrayOfObjectsByFewProperties(x, [
        { propertyName: 'a', asc: true },
        { propertyName: 'b', asc: true }
    ]);
    console.log('x=', x);
});
test('remove duplicates from array of objects', function () {
    var x = [
        { a: 1, b: 1 },
        { a: 2, b: 2 },
        { a: 2, b: 22 },
        { a: 3, b: 3 },
        { a: 3, b: 33 },
        { a: 3, b: 333 }
    ];
    var resultArray = ArrayMethods_1.ArrayMethods.removeDuplicatesFromArray(x, function (a, b) { return a.a === b.a; });
    console.log('resultArray=', resultArray);
    expect(resultArray.length).toEqual(3);
});
test('remove duplicates from array', function () {
    var x = [1, 1, 1, 2, 2, 2, 3, 3, 3];
    expect(ArrayMethods_1.ArrayMethods.removeDuplicatesFromArray(x).length).toEqual(3);
});
test('subtract arrays', function () {
    expect(ArrayMethods_1.ArrayMethods.subtractArrays([1, 2, 3, 4, 5], [1, 2])).toEqual([3, 4, 5]);
    expect(ArrayMethods_1.ArrayMethods.subtractArrays([1, 2, 3], [1, 2, 3, 4, 5])).toEqual([]);
});
