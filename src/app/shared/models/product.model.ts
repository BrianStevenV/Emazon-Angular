export interface Product {
    name: string;
    description: string;
    amount: number;
    price: number;
    brandId: number | null;
    categoryId: number[];
}

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    amount: number;
    price: number;
    brandId: number;
    categoryId: number;
}