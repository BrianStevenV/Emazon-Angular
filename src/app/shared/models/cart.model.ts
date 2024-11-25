
export interface AddProductToCartRequestDto {
    cartDetailsRequestDto: CartDetailsRequestDto;
    operationTypeRequestDto: OperationTypeRequestDto; 
}

export interface CartDetailsRequestDto {
    amount: number;
    productId: number;
}

export enum OperationTypeRequestDto{
    ADD = "ADD",
    SUBSTRACT = 'SUBSTRACT'
}


export interface CartDetailsResponseDto {
    id: number;
    name: string; 
    amountInStock: number;
    price: number;
    amountInCart: number;
    brandName: string;
    categoryNames: string[];
    nextSupplyDate: string;
    cartDetailsId: number;
}

export interface CartPagination<T> {
    content: T[];
    subtotal: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}