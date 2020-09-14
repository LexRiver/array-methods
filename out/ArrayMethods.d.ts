import { SortBy } from "./SortBy";
export declare module ArrayMethods {
    function subtractArrays(big: Array<any>, small: Array<any>): any[];
    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    function shuffleArrayInPlace(a: Array<any>): any[];
    /**
     * recursively flatten any array
     * @param a any array
     */
    function flattenArray(a: Array<any>): any;
    /**
     * recursively flatten if array and converts to array if value
     * @param x array or value
     */
    function getAsFlatArray(...x: any): any;
    /**
     * Sort array of object in place. Returns void.
     * @param array
     * @param sortBy
     */
    function sortArrayOfObjectsInPlace<T extends {
        [key: string]: any;
    }>(array: T[], sortBy: SortBy<T>): void;
    /**
     * Returns a new array sorted
     * @param array
     * @param sortBy
     */
    function sortArrayOfObjectsByFewProperties<T extends {
        [key: string]: any;
    }>(array: T[], sortBy: Array<SortBy<T>>): T[];
    /**
     * returns a shallow copy of a portion of an array into a new array
     * @param array
     * @param pageNumber starting from 1
     * @param count count of items per page
     */
    function getOnePageFromArray(array: any[], pageNumber: number, count: number): any[];
    /**
     * returns new array without duplicates
     * @param array
     * @param checkIfSame
     */
    function removeDuplicatesFromArray<T>(array: T[], checkIfSame?: (a: T, b: T) => boolean): T[];
}
