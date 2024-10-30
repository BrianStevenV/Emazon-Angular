export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface Pagination<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}