export interface IPage<T>{
    content: T[],
    totalPages: number,
    totalElements: number,
    size: number,
    number: number
}