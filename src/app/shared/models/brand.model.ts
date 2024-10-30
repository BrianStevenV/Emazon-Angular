export interface Brand {
    name: string;
    description: string;
}

export interface BrandResponse {
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