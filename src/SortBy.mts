export interface SortBy<T extends {[key:string]:any}>{
    propertyName:keyof T
    asc:boolean
    locale?:string
    parseStringToDate?:boolean
}