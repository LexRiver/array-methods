"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayMethods = void 0;
var ArrayMethods;
(function (ArrayMethods) {
    function subtractArrays(big, small) {
        return big.filter(function (n) { return !small.includes(n); });
    }
    ArrayMethods.subtractArrays = subtractArrays;
    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    function shuffleArrayInPlace(a) {
        var _a;
        // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = __read([a[j], a[i]], 2), a[i] = _a[0], a[j] = _a[1];
        }
        return a;
    }
    ArrayMethods.shuffleArrayInPlace = shuffleArrayInPlace;
    /**
     * recursively flatten any array
     * @param a any array
     */
    function flattenArray(a) {
        return Array.isArray(a) ? [].concat.apply([], a.map(flattenArray)) : a;
    }
    ArrayMethods.flattenArray = flattenArray;
    /**
     * recursively flatten if array and converts to array if value
     * @param x array or value
     */
    function getAsFlatArray() {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
        if (Array.isArray(x)) {
            return flattenArray(x);
        }
        else
            return __spread(x);
    }
    ArrayMethods.getAsFlatArray = getAsFlatArray;
    /**
     * Sort array of object in place. Returns void.
     * @param array
     * @param sortBy
     */
    function sortArrayOfObjectsInPlace(array, sortBy) {
        // arr.sort((a,b) => (a.a===undefined||a.a===null)-(b.a===undefined||b.a===null) || -(b.a>a.a)||+(b.a<a.a))
        // arr.sort((a,b) => (a.a===undefined||a.a===null)-(b.a===undefined||b.a===null) || -(a.a>b.a)||+(a.a<b.a))
        //console.log('sortArrayOfObjectsInPlace', 'array=', array, 'propertyName=', propertyName, 'asc=', asc, 'locale=', locale, 'parseStringToDate=', parseStringToDate)
        if (!array)
            throw new Error();
        var hasCollator = Intl && Intl.Collator && typeof Intl.Collator == 'function';
        if (array.length == 0)
            return;
        function sortBySimpleCompare() {
            array.sort(function (a, b) {
                if (a[sortBy.propertyName] === b[sortBy.propertyName]) {
                    return 0;
                }
                if (a[sortBy.propertyName] === undefined || a[sortBy.propertyName] === null) {
                    return 1;
                }
                if (b[sortBy.propertyName] === undefined || b[sortBy.propertyName] === null) {
                    return -1;
                }
                if (a[sortBy.propertyName] < b[sortBy.propertyName]) {
                    return sortBy.asc ? -1 : 1;
                }
                else {
                    return sortBy.asc ? 1 : -1;
                }
            });
        }
        function sortByCompareStringToDate() {
            array.sort(function (a, b) {
                if (a[sortBy.propertyName] === b[sortBy.propertyName]) {
                    return 0;
                }
                if (a[sortBy.propertyName] === undefined || a[sortBy.propertyName] === null) {
                    return 1;
                }
                if (b[sortBy.propertyName] === undefined || b[sortBy.propertyName] === null) {
                    return -1;
                }
                var date1 = new Date(a[sortBy.propertyName]);
                var date2 = new Date(b[sortBy.propertyName]);
                if (date1 == date2)
                    return 0;
                if (date1 < date2) {
                    return sortBy.asc ? -1 : 1;
                }
                else {
                    return sortBy.asc ? 1 : -1;
                }
            });
        }
        function sortByCollator() {
            var collator = new Intl.Collator(sortBy.locale);
            array.sort(function (a, b) {
                if (a[sortBy.propertyName] === b[sortBy.propertyName]) {
                    return 0;
                }
                if (a[sortBy.propertyName] === undefined || a[sortBy.propertyName] === null) {
                    return 1;
                }
                if (b[sortBy.propertyName] === undefined || b[sortBy.propertyName] === null) {
                    return -1;
                }
                return sortBy.asc
                    ? collator.compare(a[sortBy.propertyName], b[sortBy.propertyName])
                    : collator.compare(b[sortBy.propertyName], a[sortBy.propertyName]);
            });
        }
        if (!hasCollator) {
            sortBySimpleCompare();
        }
        else if (array[0] && array[0].hasOwnProperty(sortBy.propertyName)) { // we have some data
            if (typeof array[0][sortBy.propertyName] === 'number') {
                sortBySimpleCompare(); // sort numbers
            }
            else if (typeof array[0][sortBy.propertyName] === 'string' && sortBy.parseStringToDate) {
                sortByCompareStringToDate(); // sort string dates
            }
            else {
                sortByCollator(); // sort by collator
            }
        }
    }
    ArrayMethods.sortArrayOfObjectsInPlace = sortArrayOfObjectsInPlace;
    /**
     * Returns a new array sorted
     * @param array
     * @param sortBy
     */
    function sortArrayOfObjectsByFewProperties(array, sortBy) {
        //console.log('')
        //console.log('begin ===== sortArrayOfObjectsInPlaceByFewProperties', 'array=', array, 'sortBy=', sortBy)
        var e_1, _a;
        if (!array)
            throw new Error();
        if (sortBy.length == 0)
            throw new Error();
        var sortByItem = sortBy[0];
        if (!sortByItem)
            throw new Error();
        //console.log('sortByItem=', sortByItem)
        var arrayNew = __spread(array);
        sortArrayOfObjectsInPlace(arrayNew, sortByItem);
        //console.log('arrayNew after sort=', arrayNew)
        var arrayOfArrays = splitArrayOfObjectsByPropertyValue(arrayNew, sortByItem.propertyName);
        //console.log('arrayOfArrays=', arrayOfArrays)
        // [0]=
        // {name:'one', ...}
        // {name:'one', ...}
        // [1]=
        // {name:'two', ...}
        // {name:'two', ...}
        var nextSortBy = __spread(sortBy);
        nextSortBy.shift();
        //console.log('nextSortBy=', nextSortBy)
        var result = [];
        try {
            for (var arrayOfArrays_1 = __values(arrayOfArrays), arrayOfArrays_1_1 = arrayOfArrays_1.next(); !arrayOfArrays_1_1.done; arrayOfArrays_1_1 = arrayOfArrays_1.next()) {
                var group = arrayOfArrays_1_1.value;
                //console.log('group before =', group)
                if (nextSortBy.length > 0) {
                    group = ArrayMethods.sortArrayOfObjectsByFewProperties(group, nextSortBy);
                }
                //console.log('group after = ', group)
                //result.push(group)
                result.push.apply(result, __spread(group));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (arrayOfArrays_1_1 && !arrayOfArrays_1_1.done && (_a = arrayOfArrays_1.return)) _a.call(arrayOfArrays_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        //console.log('returning result=', result)
        //console.log('end ===== ')
        //array = result
        return result;
    }
    ArrayMethods.sortArrayOfObjectsByFewProperties = sortArrayOfObjectsByFewProperties;
    function splitArrayOfObjectsByPropertyValue(array, property) {
        var e_2, _a;
        var result = [];
        var resultIndex = -1;
        var prevPropertyValue = undefined;
        try {
            for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                var item = array_1_1.value;
                if (item[property] !== prevPropertyValue) {
                    resultIndex++;
                    result[resultIndex] = [];
                }
                result[resultIndex].push(item);
                prevPropertyValue = item[property];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    }
    /**
     * returns a shallow copy of a portion of an array into a new array
     * @param array
     * @param pageNumber starting from 1
     * @param count count of items per page
     */
    function getOnePageFromArray(array, pageNumber, count) {
        var offset = (pageNumber - 1) * count;
        if (offset < 0)
            offset = 0;
        count = Number(count) || 100;
        if (count < 1)
            count = 100;
        return array.slice(offset, offset + count);
    }
    ArrayMethods.getOnePageFromArray = getOnePageFromArray;
    /**
     * returns new array without duplicates
     * @param array
     * @param checkIfSame
     */
    function removeDuplicatesFromArray(array, checkIfSame) {
        return array.filter(function (item, index, self) { return index === self.findIndex(function (x) { return checkIfSame ? checkIfSame(x, item) : x === item; }); });
    }
    ArrayMethods.removeDuplicatesFromArray = removeDuplicatesFromArray;
})(ArrayMethods = exports.ArrayMethods || (exports.ArrayMethods = {}));
