
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