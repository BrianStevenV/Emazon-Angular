import { BrandResponse } from "./brand.model";
import { CategoryToUseInProduct } from "./category.model";

export interface Product {
    name: string;
    description: string;
    amount: number;
    price: number;
    brandId: number | null;
    categoryId: number[];
}

export interface ProductPaginator {
    id: number;
    name: string;
    description: string;
    amount: number;
    price: number;
    brand: BrandResponse;
    categories: CategoryToUseInProduct[];
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