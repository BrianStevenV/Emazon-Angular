export interface Category {
    name: string;
    description: string;
}

export interface CategoryResponse {
    id: number;
    name: string;
    description: string;
}

export interface Pagination<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}