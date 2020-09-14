import { SortBy } from "./SortBy";

type ObjectLike = {[key:string]:any}

export module ArrayMethods{
    export function subtractArrays(big:Array<any>, small:Array<any>){
        return big.filter(n => !small.includes(n));
    }

    /**
     * Shuffles array in place
     * @param {Array} a items An array containing the items.
     */
    export function shuffleArrayInPlace(a: Array<any>) {
        // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    /**
     * Recursively flatten any array
     * @param a any array
     */
    export function flattenArray(a: Array<any>) {
        return Array.isArray(a) ? [].concat.apply([], a.map(flattenArray)) : a;
    }

    /**
     * Recursively flatten if array and converts to array if value
     * @param x array or value
     */
    export function getAsFlatArray(...x:any){
        if(Array.isArray(x)){
            return flattenArray(x)
        } else return [...x]
    }

    function sortBySimpleCompare<T>(array:Array<T>, sortBy:SortBy<T>){
        array.sort((a,b) => {
            if (a[sortBy.propertyName] === b[sortBy.propertyName]) {
                return 0;
            }
            
            if (a[sortBy.propertyName] === undefined || a[sortBy.propertyName] === null) {
                return 1;
            }
            if (b[sortBy.propertyName] === undefined || b[sortBy.propertyName] === null) {
                return -1;
            }
        
            if(a[sortBy.propertyName] < b[sortBy.propertyName]){
                return sortBy.asc ? -1: 1
            } else {
                return sortBy.asc ? 1: -1
            }
        })
    }

    function sortByCompareStringToDate<T extends ObjectLike>(array:Array<T>, sortBy:SortBy<T>){
        array.sort((a,b) => {
            if (a[sortBy.propertyName] === b[sortBy.propertyName]) {
                return 0;
            }
            
            if (a[sortBy.propertyName] === undefined || a[sortBy.propertyName] === null) {
                return 1;
            }
            if (b[sortBy.propertyName] === undefined || b[sortBy.propertyName] === null) {
                return -1;
            }

            let date1 = new Date(a[sortBy.propertyName])
            let date2 = new Date(b[sortBy.propertyName])

            if(date1 == date2) return 0
        
            if(date1 < date2){
                return sortBy.asc ? -1: 1
            } else {
                return sortBy.asc ? 1: -1
            }
        })
    }

    function sortByCollator<T extends ObjectLike>(array:Array<T>, sortBy:SortBy<T>){
        const collator = new Intl.Collator(sortBy.locale)
        array.sort((a,b) => {
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
                : collator.compare(b[sortBy.propertyName], a[sortBy.propertyName])
        })
    }




    /**
     * Sort array of object in place. Returns void.
     * @param array 
     * @param sortBy 
     */
    export function sortArrayOfObjectsInPlace<T extends {[key:string]:any}>(array:T[], sortBy:SortBy<T>){
        // arr.sort((a,b) => (a.a===undefined||a.a===null)-(b.a===undefined||b.a===null) || -(b.a>a.a)||+(b.a<a.a))
        // arr.sort((a,b) => (a.a===undefined||a.a===null)-(b.a===undefined||b.a===null) || -(a.a>b.a)||+(a.a<b.a))
        //console.log('sortArrayOfObjectsInPlace', 'array=', array, 'propertyName=', propertyName, 'asc=', asc, 'locale=', locale, 'parseStringToDate=', parseStringToDate)
        if(!array) throw new Error()
        const hasCollator = Intl && Intl.Collator && typeof Intl.Collator == 'function'
        if(array.length == 0) return

        if(!hasCollator){
            sortBySimpleCompare(array, sortBy)

        } else if(array[0] && array[0].hasOwnProperty(sortBy.propertyName)){ // we have some data
            if(typeof array[0][sortBy.propertyName] === 'number'){
                sortBySimpleCompare(array, sortBy) // sort numbers

            } else if(typeof array[0][sortBy.propertyName] === 'string' && sortBy.parseStringToDate){
                sortByCompareStringToDate(array, sortBy) // sort string dates

            } else {
                sortByCollator(array, sortBy) // sort by collator
            }

        } 
        
    }

    /**
     * Returns a new array sorted by few properties
     * @param array 
     * @param sortBy 
     */
    export function sortArrayOfObjectsByFewProperties<T extends {[key:string]:any}>(array:T[], sortBy:Array<SortBy<T>>){
        //console.log('')
        //console.log('begin ===== sortArrayOfObjectsInPlaceByFewProperties', 'array=', array, 'sortBy=', sortBy)
        
        if(!array) throw new Error()
        if(sortBy.length == 0) throw new Error()
        let sortByItem = sortBy[0]
        if(!sortByItem) throw new Error()

        //console.log('sortByItem=', sortByItem)
        let arrayNew = [...array]
        sortArrayOfObjectsInPlace(arrayNew, sortByItem)
        //console.log('arrayNew after sort=', arrayNew)
        let arrayOfArrays = splitArrayOfObjectsByPropertyValue(arrayNew, sortByItem.propertyName)
        //console.log('arrayOfArrays=', arrayOfArrays)

        // [0]=
        // {name:'one', ...}
        // {name:'one', ...}
        // [1]=
        // {name:'two', ...}
        // {name:'two', ...}

        
        let nextSortBy = [...sortBy]
        nextSortBy.shift()
        //console.log('nextSortBy=', nextSortBy)

        let result:T[] = []
        for(let group of arrayOfArrays){
            //console.log('group before =', group)
            if(nextSortBy.length>0){
                group = ArrayMethods.sortArrayOfObjectsByFewProperties(group, nextSortBy)
            }
            //console.log('group after = ', group)
            //result.push(group)
            result.push(...group)
        }
            
        
        
        //console.log('returning result=', result)
        //console.log('end ===== ')
        //array = result
        return result
    }

    function splitArrayOfObjectsByPropertyValue<T extends {[key:string]:any}>(array:T[], property:keyof T):Array<Array<T>>{
        let result:Array<Array<T>> = []
        let resultIndex = -1
        let prevPropertyValue:any = undefined
        
        for(let item of array){
            if(item[property] !== prevPropertyValue){
                resultIndex++
                result[resultIndex] = []
            }
            result[resultIndex].push(item)
            prevPropertyValue = item[property]
        }
        return result
    } 


    /**
     * Ыeturns a shallow copy of a portion of an array into a new array
     * @param array 
     * @param pageNumber starting from 1
     * @param count count of items per page
     */
    export function getOnePageFromArray(array:any[], pageNumber:number, count:number){
        let offset = (pageNumber-1)*count
        if(offset < 0) offset =0
        count = Number(count) || 100
        if(count < 1) count = 100

        return array.slice(offset, offset+count)

    }


    /**
     * Ыeturns new array without duplicates
     * @param array 
     * @param checkIfSame 
     */
    export function removeDuplicatesFromArray<T>(array:T[], checkIfSame?:(a:T, b:T) => boolean){
        return array.filter((item, index, self) => index === self.findIndex(x => checkIfSame ? checkIfSame(x, item) : x === item))
    }


}